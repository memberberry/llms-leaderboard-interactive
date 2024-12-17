import { Vector3 } from 'three';
import { LineBasicMaterial, MeshBasicMaterial } from 'three';
import { BufferGeometry, BoxGeometry} from 'three';
import { Line } from 'three';
import { Mesh } from 'three';
import { Scene } from 'three';
import { PerspectiveCamera } from 'three';
import { WebGLRenderer } from 'three';
import { plane } from './reference-plane';

const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

camera.position.z = 100;

const geometry = new BoxGeometry( 10, 20, 10 ); 
const material = new MeshBasicMaterial( {color: 0x00ff00} ); 
const cube = new Mesh( geometry, material ); 
scene.add( cube );
scene.add( plane );


function animate() {
    renderer.render( scene, camera );
}
