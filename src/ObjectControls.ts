import * as THREE from "three";
import { TransformControls } from "three/addons/controls/TransformControls.js";
import { type ObjectControlsEventMap } from "./types";

export class ObjectControls extends THREE.Controls<ObjectControlsEventMap> {
  _getPointer: (event: PointerEvent) => void;
  _onPointerDown: (event: PointerEvent) => void;
  _onPointerHover: (event: PointerEvent) => void;
  _onPointerMove: (event: PointerEvent) => void;
  _onPointerUp: (event: PointerEvent) => void;

  constructor(object: THREE.Object3D, domElement?: HTMLElement | null) {
    super(object, domElement);

    const getPointer = (event: PointerEvent) => {};
    const onPointerDown = (event: PointerEvent) => {};
    const onPointerHover = (event: PointerEvent) => {};
    const onPointerMove = (event: PointerEvent) => {};
    const onPointerUp = (event: PointerEvent) => {};

    this._getPointer = getPointer.bind(this);
    this._onPointerDown = onPointerDown.bind(this);
    this._onPointerHover = onPointerHover.bind(this);
    this._onPointerMove = onPointerMove.bind(this);
    this._onPointerUp = onPointerUp.bind(this);
  }

  connect() {
    if (this.domElement === null) return;
    this.domElement.addEventListener("pointerdown", this._onPointerDown);
    this.domElement.addEventListener("pointermove", this._onPointerHover);
    this.domElement.addEventListener("pointerup", this._onPointerUp);

    this.domElement.style.touchAction = "none"; // disable touch scroll
  }

  disconnect() {
    if (this.domElement === null) return;

    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this.domElement.removeEventListener("pointermove", this._onPointerHover);
    this.domElement.removeEventListener("pointermove", this._onPointerMove);
    this.domElement.removeEventListener("pointerup", this._onPointerUp);

    this.domElement.style.touchAction = "auto";
  }
}
