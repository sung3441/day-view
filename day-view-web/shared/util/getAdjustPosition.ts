/**
 *
 * @param clientX
 * @param clientY
 * @param componentRef 위치조정할 컴포넌트의 ref
 * @returns 위치조정 된 값 배열 반환 [x: number, y: number]
 */
export const getAdjustPosition = (
  clientX: number,
  clientY: number,
  componentRef: React.RefObject<HTMLDivElement>
): [number, number] => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let adjustedX = clientX;
  let adjustedY = clientY;

  if (componentRef.current) {
    const { offsetWidth, offsetHeight } = componentRef.current;
    if (clientX + offsetWidth > viewportWidth) {
      adjustedX = viewportWidth - offsetWidth;
    }
    if (clientY + offsetHeight > viewportHeight) {
      adjustedY = viewportHeight - offsetHeight;
    }
  }

  return [adjustedX, adjustedY];
};
