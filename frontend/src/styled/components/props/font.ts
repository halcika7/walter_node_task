export const fontSizes = {
  copyright: '0.7em', // 12px
  helper: '0.8em', // 14px
  paragraph: '1em', // 16px
  h5: '1.1em', // 18px
  h4: '1.2em', // 20px
  h3: '1.4em', // 22px
  h2: '1.6em', // 25px
  h1: '1.8em', // 28px
};

export const fontWeights = {
  light: 300,
  body: 400,
  subheading: 500,
  link: 600,
  bold: 700,
  heading: 800,
  bolder: 900,
};

type Size = keyof typeof fontSizes;
type Weight = keyof typeof fontWeights;

export const setFontOptions = (size: Size, weight: Weight = 'body') => ({
  'font-size': fontSizes[size],
  'font-weight': fontWeights[weight],
});

export const textProps = (align: string, transform = 'none') => ({
  'text-align': align,
  'text-transform': transform,
});
