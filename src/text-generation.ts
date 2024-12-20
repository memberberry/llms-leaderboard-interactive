import { CanvasTexture, Scene } from 'three';
import { SpriteMaterial } from 'three';
import { Sprite } from 'three';
import { Vector3 } from 'three';
import { Color } from 'three';
import { MeshBasicMaterial } from 'three';
import { DoubleSide } from 'three';
import { ShapeGeometry } from 'three';
import { Mesh } from 'three';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader';



/**
 * Creates a text sprite that always faces the camera.
 * 
 * @param text - The text to display on the sprite.
 * @param color - The color of the text.
 * @param position - The position of the sprite in the 3D scene.
 * @returns A THREE.Sprite containing the text.
 */
export function createTextSprite(text: string, color: string, position: Vector3, size: number): Sprite {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error("Failed to get 2D context for canvas");
  }

  // Set canvas size

  canvas.width = 64 * size * text.length;
  canvas.height =  64 * size;

  const fontSize = Math.floor(canvas.height);  // Adjust 5 based on your needs
  console.log("fontsize:", fontSize);
  context.font = `Bold ${fontSize}px Arial`; // Use calculated font size

  context.fillStyle = color;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  // Create a texture from the canvas
  const texture = new CanvasTexture(canvas);

  texture.needsUpdate = true;

  console.log("texture", texture);
  texture.needsUpdate = true;

  // Create a sprite material using the texture
  const spriteMaterial = new SpriteMaterial({ map: texture, transparent: true });

  // Create the sprite
  const sprite = new Sprite(spriteMaterial);

  // Set sprite scale (adjust based on scene requirements)
  const aspectRatio = canvas.width / canvas.height;
  sprite.scale.set( size * aspectRatio,  size * 1, 0);

  // Set the position of the sprite
  sprite.position.copy(position);

  return sprite;
}


let cachedFont: Font | null = null;

export function loadFont(): Promise<Font> {
    if (cachedFont) {
        return Promise.resolve(cachedFont);
    }

    const loader = new FontLoader();
    return new Promise((resolve, reject) => {
        loader.load(
            './node_modules/three/examples/fonts/helvetiker_regular.typeface.json',
            (font) => {
                cachedFont = font; // Cache the font for reuse
                resolve(font);
            },
            undefined, // onProgress callback (optional)
            (error) => {
                reject(error); // Handle loading errors
            }
        );
    });
}

export async function createTextMesh(str: string, size, c: Color, opacity: number): Promise<Mesh> {
    const font = await loadFont(); // Ensure the font is loaded
    const color = c;

    const matLite = new MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity,
        side: DoubleSide,
    });

    const shapes = font.generateShapes(str, size);
    const geometry = new ShapeGeometry(shapes);

    geometry.computeBoundingBox();

    const xMid = -0.5 * (geometry.boundingBox!.max.x - geometry.boundingBox!.min.x);

    geometry.translate(xMid, 0, 0);

    const textMesh = new Mesh(geometry, matLite);

    return textMesh;
}