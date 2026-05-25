export function attachNonPassiveWheelListener(
  element: HTMLElement,
  listener: (event: WheelEvent) => void
): () => void {
  const nativeListener: EventListener = (event) => {
    listener(event as WheelEvent);
  };

  element.addEventListener("wheel", nativeListener, { passive: false });

  return () => {
    element.removeEventListener("wheel", nativeListener);
  };
}
