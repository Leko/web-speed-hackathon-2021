import fs from 'fs/promises';

export function storeFile(path, content) {
  return fs.writeFile(path, content);
}
