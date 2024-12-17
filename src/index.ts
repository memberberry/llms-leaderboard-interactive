import { Vector3 } from 'three';
import { LineBasicMaterial, MeshBasicMaterial } from 'three';
import { BufferGeometry, BoxGeometry} from 'three';
import { Line } from 'three';
import { Mesh } from 'three';
import { Scene } from 'three';
import { PerspectiveCamera } from 'three';
import { WebGLRenderer } from 'three';
import { plane } from './reference-plane';
import { GridHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AxesHelper } from 'three';
import { createTextSprite } from './text-generation';
import { initControls } from './keyboard-controls';
import { SpriteMaterial } from 'three';

const SCALEFACTOR = 0.1; 
const AXESLENGTH = 15;
var axesVisible = true;

const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// point camera at the origin
camera.position.z = 50;
camera.position.y = -50;
camera.lookAt(new Vector3(0, 0, 0));

const renderer = new WebGLRenderer();
const axesHelper = new AxesHelper( AXESLENGTH );

// Add text sprites for axis labels
const labelX = createTextSprite('X', 'red', new Vector3(AXESLENGTH + 1, 0, 0));
const labelY = createTextSprite('Y', 'green', new Vector3(0, AXESLENGTH + 1, 0));
const labelZ = createTextSprite('Z', 'blue', new Vector3(0, 0, AXESLENGTH + 1));

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );



const geometry = new BoxGeometry( 10, 20, 10 ); 
const material = new MeshBasicMaterial( {color: 0x00ff00} ); 
const cube = new Mesh( geometry, material ); 

var grid = new GridHelper(100, 10);
var controls = new OrbitControls(camera, renderer.domElement);

// make sure axes are always visible when turned on
// - depthTest = false makes it always be visible in before any object
// - renderOrder = 999 will make it appear in front of objects that 
axesHelper.renderOrder = 999;
(axesHelper.material as MeshBasicMaterial).depthTest = false;
labelX.renderOrder = 999;
(labelX.material as SpriteMaterial).depthTest = false;
labelY.renderOrder = 999;
(labelY.material as SpriteMaterial).depthTest = false;
labelZ.renderOrder = 999;
(labelZ.material as SpriteMaterial).depthTest = false;


scene.add(grid);
scene.add( cube );
scene.add( plane );
scene.add( axesHelper );
scene.add(labelX, labelY, labelZ);

function animate() {

    renderer.render( scene, camera );
    controls.update();

    labelX.lookAt(camera.position);
    labelY.lookAt(camera.position);
    labelZ.lookAt(camera.position);

    const distanceX = camera.position.distanceTo(labelX.position);
    const distanceY = camera.position.distanceTo(labelY.position);
    const distanceZ = camera.position.distanceTo(labelZ.position);

    labelX.scale.setScalar(distanceX * SCALEFACTOR);
    labelY.scale.setScalar(distanceY * SCALEFACTOR);
    labelZ.scale.setScalar(distanceZ * SCALEFACTOR);

    axesHelper.visible  = axesVisible;
    labelX.visible      = axesVisible;
    labelY.visible      = axesVisible;
    labelZ.visible      = axesVisible;

}

initControls(() => {
    console.log("pressed z!")
    axesVisible = !axesVisible;
});
