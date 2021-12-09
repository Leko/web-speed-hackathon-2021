import path from 'path';
import * as glob from 'glob';
import { PUBLIC_PATH } from './src/paths';
import { generateSoundWaveSVG } from './src/utils/soundWave';
import { storeFile } from './src/utils/file';

Promise.all(
  glob.sync(`${PUBLIC_PATH}/sounds/*.mp3`, { nodir: true }).map(async (p) => {
    const soundId = path.basename(p, '.mp3');
    const svg = await generateSoundWaveSVG(await fs.readFile(p));
    return storeFile(path.resolve(PUBLIC_PATH, `./sounds/waves/${soundId}.svg`), svg);
  }),
);
