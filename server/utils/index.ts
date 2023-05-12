/* eslint-disable @typescript-eslint/no-explicit-any */
export type CSSVars = Record<string, any>;

type RGBA = {
  a: number;
  b: number;
  g: number;
  r: number;
};

export const convertObjectToRgbOrRgbaString = (colorObject: RGBA): string => {
  const { a, b, g, r } = colorObject;

  if (a && a !== 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
};

export const buildCSSVars = (cssVars: CSSVars) => {
  return Object.keys(cssVars).reduce((accum, key) => {
    const item = cssVars[key];

    if (item.widget === 'colorPicker') {
      accum[key] = convertObjectToRgbOrRgbaString(item.value);
    } else if (item.widget === 'slider') {
      accum[key] = `${item.value}${item.label}`;
    } else {
      accum[key] = item.value;
    }

    return accum;
  }, {} as Record<string, string>);
};
