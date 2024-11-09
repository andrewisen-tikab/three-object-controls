import * as THREE from "three";

import { AbstractObjectControls } from "./AbstractObjectControls";

export class ObjectControls extends AbstractObjectControls {
  constructor(object: THREE.Object3D, domElement?: HTMLElement | null) {
    super(object, domElement);
  }
}
