import * as THREE from "three";
import { Example } from "../../src/Example";
import { COLORS } from "../../src/constants";
import { randomInt } from "../../src/utils";

const example = new Example();

const x = 1;
const y = 1;
const z = 1;

const NO_CUBES = 3;
const cubes: THREE.Mesh[] = [];

const geometry = new THREE.BoxGeometry(x, y, z);
geometry.computeBoundsTree();

geometry.translate(0, y / 2, 0);
const material = new THREE.MeshBasicMaterial({ color: COLORS.object });
const cube = new THREE.Mesh(geometry, material);

for (let i = 0; i < NO_CUBES; i++) {
  const clone = cube.clone();
  const position = new THREE.Vector3(randomInt(-5, 5), 0, randomInt(-5, 5));
  clone.position.copy(position);

  cubes.push(clone);
  example.group.add(clone);
}

cubes.forEach((cube) => {
  console.log(cube.position.x);
});
