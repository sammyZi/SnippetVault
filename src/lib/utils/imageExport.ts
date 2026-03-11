import { toPng } from 'html-to-image';

/**
 * Generates a PNG image from a DOM element
 * @param element - The DOM element to convert to PNG
 * @param filename - The filename for the downloaded image
 * @returns Promise that resolves when the image is generated and download is triggered
 */
export async function exportElementToPng(
  element: HTMLElement,
  filename: string
): Promise<void> {
  try {
    // Generate PNG data URL from the element
    // Call toPng twice — first pass warms up font/style resolution, second produces clean output
    await toPng(element, { cacheBust: true, pixelRatio: 2 });
    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 2,
    });

    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Failed to export image:', error);
    throw new Error('Failed to generate image. Please try again.');
  }
}

/**
 * Sanitizes a string to be used as a filename
 * @param text - The text to sanitize
 * @returns A safe filename string
 */
export function sanitizeFilename(text: string): string {
  return text
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}
