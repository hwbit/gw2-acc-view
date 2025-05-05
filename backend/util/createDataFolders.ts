import fs from "fs";

export const createDataFolders = async () => {
    const base = "./data";
    const folders = ['characters', 'items'].map(name => `${base}/${name}`);

    try {
        await Promise.all(folders.map(path => fs.mkdir(path, { recursive: true }, (err) => {
            if (err) console.error(`Failed to create ${path}:`, err);
            else console.log(`${path} created`);
        })));
        console.log('All folders created!');
    } catch (err) {
        console.error('Error creating folders:', err);
    }
}
