import * as React from 'react'

interface IScrollPosition {
  x: number;
  y: number;
}

function getScrollPosition(): IScrollPosition {
  return { x: window.pageXOffset, y: window.pageYOffset };
}

export function useScrollPosition(): IScrollPosition {
  const [position, setScrollPosition] = React.useState<IScrollPosition>(getScrollPosition());
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