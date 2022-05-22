export const breakpoints = {
  mobile: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
};

export const up = (breakpoint) =>
  `@media (min-width: calc(${breakpoint}px + 0.02px))`;

export const down = (breakpoint) => `@media (max-width: ${breakpoint}px)`;
