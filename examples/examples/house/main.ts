import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import { Example } from "../../src/Example";
import { COLORS } from "../../src/constants";

const example = new Example();

const material = new THREE.MeshBasicMaterial({
  color: COLORS.object,
  side: THREE.DoubleSide,
});

// Create the house base
const baseGeometry = new THREE.BoxGeometry(1, 1, 1);

const roofGeometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  // Front triangle
  -0.5,
  0.5,
  -0.5, // Bottom-left
  0.5,
  0.5,
  -0.5, // Bottom-right
  0.0,
  1.5,
  0.0, // Top-center

  // Back triangle
  -0.5,
  0.5,
  0.5, // Bottom-left back
  0.5,
  0.5,
  0.5, // Bottom-right back
  0.0,
  1.5,
  0.0, // Top-center

  // Left triangle
  -0.5,
  0.5,
  0.5, // Front-left
  -0.5,
  0.5,
  -0.5, // Back-left
  0.0,
  1.5,
  0.0, // Top-center

  // Right triangle
  0.5,
  0.5,
  0.5, // Front-right
  0.5,
  0.5,
  -0.5, // Back-right
  0.0,
  1.5,
  0.0, // Top-center
]);
roofGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices, 3)
);
roofGeometry.computeVertexNormals();
roofGeometry.setAttribute("normal", roofGeometry.attributes.position);

baseGeometry.deleteAttribute("uv");
baseGeometry.deleteAttribute("normal");
roofGeometry.deleteAttribute("normal");
const geometry = BufferGeometryUtils.mergeGeometries([
  baseGeometry.toNonIndexed(),
  roofGeometry.toNonIndexed(),
]);
geometry.translate(0, 0.5, 0);
geometry.computeVertexNormals();
geometry.computeBoundsTree();

const house = new THREE.Mesh(geometry, material);
example.group.add(house);
