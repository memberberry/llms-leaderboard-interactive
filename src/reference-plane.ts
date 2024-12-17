import { MeshPhongMaterial, MeshBasicMaterial } from "three";
import { PlaneGeometry } from "three";
import { Mesh } from "three";
import { DoubleSide } from "three";

const planeGeo = new PlaneGeometry( 60, 60 );
const planeMat = new MeshBasicMaterial( {color: 0x0000ff, side: DoubleSide} );

export const plane = new Mesh( planeGeo, planeMat );
