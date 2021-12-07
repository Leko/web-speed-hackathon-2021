import { AudioContext } from 'web-audio-api';

const chunk = (arr, chunkSize = 1, cache = []) => {
  const tmp = [...arr];
  if (chunkSize <= 0) return cache;
  while (tmp.length) cache.push(tmp.splice(0, chunkSize));
  return cache;
};

/**
 * @param {ArrayBuffer} data
 * @returns {Promise<{ max: number, peaks: number[] }}
 */
export async function calculate(data) {
  const audioCtx = new AudioContext();

  // 音声をデコードする
  /** @type {AudioBuffer} */
  const buffer = await new Promise((resolve, reject) => {
    audioCtx.decodeAudioData(data, resolve, reject);
  });
  // 左の音声データの絶対値を取る
  const leftData = buffer.getChannelData(0).map(Math.abs);
  // 右の音声データの絶対値を取る
  const rightData = buffer.getChannelData(1).map(Math.abs);

  // 左右の音声データの平均を取る
  const normalized = leftData.map((l, i) => (l + rightData[i]) / 2);
  // 100 個の chunk に分ける
  const chunks = chunk(normalized, Math.ceil(normalized.length / 100));
  // chunk ごとに平均を取る
  const peaks = chunks.map((c) => c.reduce((a, b) => a + b) / c.length);
  // chunk の平均の中から最大値を取る
  const max = Math.max(...peaks);

  return { max, peaks };
}

export async function generateSoundWaveSVG(buffer) {
  const { peaks, max } = await calculate(buffer);
  return `
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 1">
      ${peaks.map((peak, idx) => {
        const ratio = peak / max;
        return `<rect key="${idx}" fill="#2563EB" height="${ratio}" width="1" x="${idx}" y="${1 - ratio}" />`;
      })}
    </svg>
  `.trim();
}
