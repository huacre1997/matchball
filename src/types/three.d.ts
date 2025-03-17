import * as THREE from "three";
console.log(THREE.Mesh);
declare module "three" {
  export class TruncatedIcosahedronGeometry extends PolyhedronGeometry {
    constructor(radius?: number, detail?: number);
  }
}
