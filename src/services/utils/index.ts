// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const arrayShuffle = (array: any[]) =>
  array
    .map((el) => ({ sort: Math.random(), value: el }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
