export const random = (min: number, max: number) =>
  Math.random() * (max - min) + min;
export const randomInt = (min: number, max: number) =>
  Math.floor(random(min, max));
