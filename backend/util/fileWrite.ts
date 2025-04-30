import { mkdir, writeFile, readFile } from 'fs/promises';
import { join } from 'path';

/**
 * Write file locally.
 * 
 * @param folder 
 * @param filename 
 * @param content 
 */
export const writeToFile = async (folder: string, filename: string, content: string): Promise<void> => {
  try {
    // Make sure the folder exists
    await mkdir(folder, { recursive: true });

    // Create the full path to the file
    const filePath = join(folder, filename);

    // Write to the file
    await writeFile(filePath, content);

    console.log(`File written to ${filePath}`);
  } catch (err) {
    console.error('Error writing file:', err);
  }
}

/**
 * Load files locally.
 * 
 * @param folder 
 * @param filename 
 * @returns 
 */
export const loadFile = async (folder: string, filename: string) => {
  try {
    const filePath = join(folder, filename);
    const content = await readFile(filePath, 'utf-8'); // specify encoding for string
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading file:', err);
    throw err;
  }
}