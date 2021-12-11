import path from 'path';
import fs from 'fs/promises';
import * as glob from 'glob';
import { UPLOAD_PATH } from './src/paths';
import { generateSoundWaveSVG } from './src/utils/soundWave';
import { storeFile } from './src/utils/file';

Promise.all(
  glob.sync(`${UPLOAD_PATH}/sounds/*.mp3`, { nodir: true }).map(async (p) => {
    const soundId = path.basename(p, '.mp3');
    const svg = await generateSoundWaveSVG(await fs.readFile(p));
    return storeFile(path.resolve(UPLOAD_PATH, `./sounds/waves/${soundId}.svg`), svg);
  }),
);
