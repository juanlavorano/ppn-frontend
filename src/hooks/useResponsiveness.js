import { useEffect, useState } from "react";
import { MOBILE, TABLET, DESKTOP } from "@constants/devices";
import { breakpoints } from "@styles/devices";

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

  useEffect(() => {
    if (dimensions.width >= breakpoints.laptop) setCurrentDevice(DESKTOP);
    else if (
      dimensions.width >= breakpoints.tablet &&
      dimensions.width < breakpoints.laptop
    )
      setCurrentDevice(TABLET);
    else if (dimensions.width <= breakpoints.tablet) setCurrentDevice(MOBILE);
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
