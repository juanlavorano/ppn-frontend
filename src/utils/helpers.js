export const elemContains = (rect, x, y) => {
  return rect
    ? rect.x <= x &&
        x <= rect.x + rect.width &&
        rect.y <= y &&
        y <= rect.y + rect.height
    : false;
};
