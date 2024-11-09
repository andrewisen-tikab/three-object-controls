import CameraControls from "camera-controls";
import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import Stats from "three/addons/libs/stats.module.js";
import "./styles.css";
CameraControls.install({ THREE });

export type Params = {};

export class Example {
  public gui: GUI;
  public object: THREE.Object3D | null;
  public scene: THREE.Scene;
  public group: THREE.Group<THREE.Object3DEventMap>;
  public camera: THREE.PerspectiveCamera;
  public cameraControls: CameraControls;
  public renderer: THREE.WebGLRenderer;

  public params: Params = {};

  constructor() {
    this.gui = new GUI();

    const stats = new Stats();
    document.body.appendChild(stats.dom);

    this.object = new THREE.Object3D();

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xaaaaaa);
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
