export interface ObjectControlsEventMap {
  /**
   * Fires if any type of change (object or property change) is performed. Property changes are separate events you
   * can add event listeners to. The event type is "propertyname-changed".
   */
  change: {};

  /**
   * Fires if a pointer (mouse/touch) becomes active.
   */
  mouseDown: {};

  /**
   * Fires if a pointer (mouse/touch) is no longer active.
   */
  mouseUp: {};

  /**
   * Fires if the controlled 3D object is changed.
   */
  objectChange: {};

  "camera-changed": { value: unknown };
  "object-changed": { value: unknown };
  "enabled-changed": { value: unknown };
  "axis-changed": { value: unknown };
  "mode-changed": { value: unknown };
  "translationSnap-changed": { value: unknown };
  "rotationSnap-changed": { value: unknown };
  "scaleSnap-changed": { value: unknown };
  "space-changed": { value: unknown };
  "size-changed": { value: unknown };
  "dragging-changed": { value: unknown };
  "showX-changed": { value: unknown };
  "showY-changed": { value: unknown };
  "showZ-changed": { value: unknown };
  "worldPosition-changed": { value: unknown };
  "worldPositionStart-changed": { value: unknown };
  "worldQuaternion-changed": { value: unknown };
  "worldQuaternionStart-changed": { value: unknown };
  "cameraPosition-changed": { value: unknown };
  "cameraQuaternion-changed": { value: unknown };
  "pointStart-changed": { value: unknown };
  "pointEnd-changed": { value: unknown };
  "rotationAxis-changed": { value: unknown };
  "rotationAngle-changed": { value: unknown };
  "eye-changed": { value: unknown };
}
