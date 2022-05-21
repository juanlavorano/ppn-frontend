import { useEffect, useState } from "react";
import { MOBILE, TABLET, DESKTOP } from "@constants/devices";

function debounce(fn, ms) {
  let timer;

  return (_) => {
    clearTimeout(timer);

    timer = setTimeout((_) => {
      timer = null;

      fn.apply(this, arguments);
    }, ms);
  };
}

export function useResponsiveness() {
  const [currentDevice, setCurrentDevice] = useState();
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const breakpoints = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  };

  useEffect(() => {
    if (dimensions.width >= 1024) setCurrentDevice(DESKTOP);
    else if (dimensions.width >= 601 && dimensions.width < 1024)
      setCurrentDevice(TABLET);
    else if (dimensions.width <= 600) setCurrentDevice(MOBILE);
  }, [dimensions.width]);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 500);

    window.addEventListener("resize", debouncedHandleResize);

    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  return { dimensions, breakpoints, currentDevice };
}

export default useResponsiveness;
