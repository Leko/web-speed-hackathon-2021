import sharp from 'sharp';

/**
 * @param {Buffer} buffer
 * @param {object} options
 * @param {number} [options.extension]
 * @param {number} [options.height]
 * @param {number} [options.width]
 * @returns {Promise<Uint8Array>}
 */
async function convertImage(buffer, options) {
  return sharp(buffer)
    .resize({
      fit: 'cover',
      quality: 40,
      reductionEffort: 6,
      height: options.height,
      width: options.width ?? 575,
    })
    .toFormat(options.extension ?? 'jpeg')
    .toBuffer();
}

export { convertImage };
