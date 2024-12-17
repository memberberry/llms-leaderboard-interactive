import { CanvasTexture } from 'three';
import { SpriteMaterial } from 'three';
import { Sprite } from 'three';
import { Vector3 } from 'three';

/**
 * Creates a text sprite that always faces the camera.
 * 
 * @param text - The text to display on the sprite.
 * @param color - The color of the text.
 * @param position - The position of the sprite in the 3D scene.
 * @returns A THREE.Sprite containing the text.
 */
export function createTextSprite(text: string, color: string, position: Vector3): Sprite {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error("Failed to get 2D context for canvas");
  }

  // Set canvas size
  canvas.width = 64;
  canvas.height = 64;

  // Draw the text on the canvas
  context.font = 'Bold 30px Arial';
  context.fillStyle = color;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  // Create a texture from the canvas
  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;

  // Create a sprite material using the texture
  const spriteMaterial = new SpriteMaterial({ map: texture, transparent: true });

  // Create the sprite
  const sprite = new Sprite(spriteMaterial);

  // Set sprite scale (adjust based on scene requirements)
  sprite.scale.set(1, 0.25, 1);

  // Set the position of the sprite
  sprite.position.copy(position);

  return sprite;
}