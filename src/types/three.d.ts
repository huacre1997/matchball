import * as THREE from "three";

declare module "three" {
  export class TruncatedIcosahedronGeometry extends PolyhedronGeometry {
    constructor(radius?: number, detail?: number);
  }
}
