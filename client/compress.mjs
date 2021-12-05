import fs from 'fs';
import imagemin from 'imagemin';
import glob from 'glob';
import imageminJpegtran from 'imagemin-jpegtran';

Promise.all(
  glob.sync('../public/images/**/*.jpg').map(async (f) => {
    return fs.writeFileSync(f, await imagemin.buffer(fs.readFileSync(f), { plugins: [imageminJpegtran()] }));
  }),
);
