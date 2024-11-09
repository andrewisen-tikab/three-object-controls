import CameraControls from "camera-controls";
import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import Stats from "three/addons/libs/stats.module.js";
import { ConvexGeometry } from "three/addons/geometries/ConvexGeometry.js";
import "./styles.css";
import { COLORS } from "./constants";
CameraControls.install({ THREE });
import { Line2 } from "three/addons/lines/Line2.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";

import { ObjectControls } from "../../src";

THREE.ColorManagement.enabled = true;
export type Params = {};

import {
  computeBoundsTree,
  disposeBoundsTree,
  computeBatchedBoundsTree,
  disposeBatchedBoundsTree,
  acceleratedRaycast,
} from "three-mesh-bvh";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

THREE.BatchedMesh.prototype.computeBoundsTree = computeBatchedBoundsTree;
THREE.BatchedMesh.prototype.disposeBoundsTree = disposeBatchedBoundsTree;
THREE.BatchedMesh.prototype.raycast = acceleratedRaycast;

const lineMaterial = new LineMaterial({
  color: 0xffffff,
  linewidth: 4, // Adjust for line thickness (normalized to screen size)
  resolution: new THREE.Vector2(window.innerWidth, window.innerHeight), // Required for LineMaterial
});

/**
 * Example class that sets up a basic Three.js scene with camera controls,
 * a grid helper, and an axes helper. It also includes a GUI for parameter
 * adjustments and stats for performance monitoring.
 */
export class Example {
  public gui: GUI;
  public object: THREE.Object3D | null;
  public scene: THREE.Scene;
  public group: THREE.Group<THREE.Object3DEventMap>;
  public camera: THREE.PerspectiveCamera;
  public cameraControls: CameraControls;
  public renderer: THREE.WebGLRenderer;
  public objectControls: ObjectControls;
  public pointer: THREE.Vector2;
  public raycaster: THREE.Raycaster;

  public params: Params = {};

  private _hoverObject: THREE.Mesh | null = null;
  private _hoverLine: Line2 | null = null;

  constructor() {
    this.gui = new GUI();

    const stats = new Stats();
    document.body.appendChild(stats.dom);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(COLORS.background);
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    document.body.appendChild(this.renderer.domElement);

    const gridHelper = new THREE.GridHelper(10, 10);
    this.scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);

    const clock = new THREE.Clock();
    this.cameraControls = new CameraControls(
      this.camera,
      this.renderer.domElement
    );

    this.cameraControls.setPosition(0, 5, 5, true);

    this.objectControls = new ObjectControls(
      this.camera,
      this.renderer.domElement
    );

    this.pointer = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.raycaster.firstHitOnly = true;

    const updatePointer = (event: PointerEvent) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const resetHover = () => {
      this._hoverObject = null;
      if (this._hoverLine) {
        this.scene.remove(this._hoverLine);
        this._hoverLine.geometry.dispose();
        this._hoverLine = null;
      }
    };

    const onHover = (object: THREE.Mesh) => {
      if (this._hoverObject === object) return;
      if (object.isMesh == null) return;

      this._hoverObject = object;
      if (this._hoverLine) this.scene.remove(this._hoverLine);

      // Get vertices of the object
      const vertices = object.geometry.attributes.position.array;
      const points: THREE.Vector3[] = [];

      for (let i = 0; i < vertices.length; i += 3) {
        points.push(
          new THREE.Vector3(vertices[i], vertices[i + 1], vertices[i + 2])
        );
      }

      const geometry = new ConvexGeometry(points);

      const edges = new THREE.EdgesGeometry(geometry);
      edges.scale(1.01, 1.01, 1.01);
      edges.translate(object.position.x, object.position.y, object.position.z);

      const lineSegmentsGeometry = new LineSegmentsGeometry();
      lineSegmentsGeometry.fromEdgesGeometry(edges);

      this._hoverLine = new Line2(
        // @ts-ignore
        lineSegmentsGeometry,
        lineMaterial
      );
      this._hoverLine.computeLineDistances();
      this.scene.add(this._hoverLine);
    };

    const onPointerMove = (event: PointerEvent) => {
      updatePointer(event);

      this.raycaster.setFromCamera(this.pointer, this.camera);

      const intersects = this.raycaster.intersectObjects(
        this.group.children,
        true
      );

      if (intersects.length === 0) {
        resetHover();
        return;
      }
      // const object = intersects[0].object;
      // console.log(object);
      onHover(intersects[0].object as THREE.Mesh);

      // this.objectControls.attach(object);
    };

    this.renderer.domElement.addEventListener("pointermove", onPointerMove);

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      this.cameraControls.update(delta);
      stats.update();

      this.renderer.render(this.scene, this.camera);
    };

    animate();

    document.body.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
