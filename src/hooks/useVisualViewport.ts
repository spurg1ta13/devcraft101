import { useEffect, useState } from "react";

type VisualViewportState = {
  height: number | null;
  width: number | null;
  offsetTop: number;
  offsetLeft: number;
};

const DEFAULT_VIEWPORT: VisualViewportState = {
  height: null,
  width: null,
  offsetTop: 0,
  offsetLeft: 0,
};

function readViewport(): VisualViewportState {
  if (typeof window === "undefined" || !window.visualViewport) {
    return DEFAULT_VIEWPORT;
  }

  const { height, width, offsetTop, offsetLeft } = window.visualViewport;

  return {
    height,
    width,
    offsetTop,
    offsetLeft,
  };
}

export function useVisualViewport(enabled: boolean) {
  const [viewport, setViewport] = useState<VisualViewportState>(DEFAULT_VIEWPORT);

  useEffect(() => {
    if (!enabled || typeof window === "undefined" || !window.visualViewport) {
      setViewport(DEFAULT_VIEWPORT);
      return;
    }

    const visualViewport = window.visualViewport;
    const updateViewport = () => setViewport(readViewport());

    updateViewport();
    visualViewport.addEventListener("resize", updateViewport);
    visualViewport.addEventListener("scroll", updateViewport);

    return () => {
      visualViewport.removeEventListener("resize", updateViewport);
      visualViewport.removeEventListener("scroll", updateViewport);
      setViewport(DEFAULT_VIEWPORT);
    };
  }, [enabled]);

  return viewport;
}