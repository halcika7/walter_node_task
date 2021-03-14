export const setHeightWidth = (height: string | number, width = height) => ({
  height,
  width,
});

export const setMarginPadding = (
  margin: string | number,
  padding: string | number
) => ({ margin, padding });
