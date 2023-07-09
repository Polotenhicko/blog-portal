export const isProd = process.env.NODE_ENV === 'production';
export const baseOrigin = isProd
  ? 'https://maximumjavascript.github.io'
  : 'http://localhost:3000';
export const baseMyOrigin = 'https://polotenhicko.github.io';
