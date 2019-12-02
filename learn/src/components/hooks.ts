import * as React from 'react'
/*

export const useScroll = () => {
  const [scrollPos, setScrollPos] = React.useState(0);
  const handleScroll = () => {
      setScrollPos(window.scrollY);
  };

  // add event listener to window when component mounts
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPos;
};*/

interface ScrollPosition {
  x: number;
  y: number;
}

const windowGlobal = typeof window !== 'undefined' && window

function getScrollPosition(): ScrollPosition {
  return { x: windowGlobal.pageXOffset, y: windowGlobal.pageYOffset };
}

export function useScrollPosition(): ScrollPosition {
  const [position, setScrollPosition] = React.useState<ScrollPosition>(getScrollPosition());
  React.useEffect(() => {
    let requestRunning: number | null = null;
    function handleScroll() {
      if (requestRunning === null) {
        requestRunning = window.requestAnimationFrame(() => {
          setScrollPosition(getScrollPosition());
          requestRunning = null;
        });
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return position;
}

export function useScrollXPosition(): number {
  const { x } = useScrollPosition();
  return x;
}

export function useScroll(): number {
  const { y } = useScrollPosition();
  return y;
}