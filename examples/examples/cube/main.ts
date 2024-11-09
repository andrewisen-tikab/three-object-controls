import * as THREE from "three";
import { Example } from "../../src/Example";
import { COLORS } from "../../src/constants";

const example = new Example();

const x = 1;
const y = 1;
const z = 1;

const geometry = new THREE.BoxGeometry(x, y, z);
geometry.translate(0, y / 2, 0);
const material = new THREE.MeshBasicMaterial({ color: COLORS.object });
const cube = new THREE.Mesh(geometry, material);

example.addObject(cube);
