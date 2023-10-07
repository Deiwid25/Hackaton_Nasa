import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

function convertVwVhToPixels(vw: number, vh: number): { x: number; y: number } {
  const x = Math.round(window.innerWidth * (vw / 100));
  const y = Math.round(window.innerHeight * (vh / 100));
  return { x, y };
}

//Remember that startPosition and wrappedDimensions are in VW and VH units to allow to adapt to any screen
function HOCDraggable<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  startPosition: Position,
  wrappedDimensions: Position
) {
  return (props: T) => {
    const initialPosition = convertVwVhToPixels(
      startPosition.x,
      startPosition.y
    );
    console.log('initial Position', initialPosition);

    const [dragging, setDragging] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({
      x: initialPosition.x,
      y: initialPosition.y,
    });
    const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });

    const divRef = useRef<HTMLDivElement>(null);

    const handleDragStart = useCallback(
      (
        event:
          | React.MouseEvent<HTMLDivElement>
          | React.TouchEvent<HTMLDivElement>
      ): void => {
        event.preventDefault();
        setDragging(true);

        const div = divRef.current;
        if (div) {
          const divRect = div.getBoundingClientRect();
          setOffset({
            x:
              'clientX' in event
                ? event.clientX - divRect.left
                : event.touches[0].clientX - divRect.left,
            y:
              'clientY' in event
                ? event.clientY - divRect.top
                : event.touches[0].clientY - divRect.top,
          });
        }
      },
      []
    );

    const handleDragEnd = (): void => {
      setDragging(false);
    };

    const handleMouseMove = useCallback(
      (event: MouseEvent | TouchEvent): void => {
        if (dragging && divRef.current) {
          const divSize = convertVwVhToPixels(
            wrappedDimensions.x,
            wrappedDimensions.y
          );
          const divWidth = divSize.x;
          const divHeight = divSize.y;
          const viewportWidth =
            window.innerWidth || document.documentElement.clientWidth;
          const viewportHeight =
            window.innerHeight || document.documentElement.clientHeight;

          let x =
            ('clientX' in event ? event.clientX : event.touches[0].clientX) -
            offset.x;
          let y =
            ('clientY' in event ? event.clientY : event.touches[0].clientY) -
            offset.y;

          if (x < 0) x = 0;
          if (y < 0) y = 0;
          if (x + divWidth > viewportWidth) x = viewportWidth - divWidth;
          if (y + divHeight > viewportHeight) y = viewportHeight - divHeight;

          setPosition({ x, y });
        }
      },
      [dragging, offset]
    );

    useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleDragEnd);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleDragEnd);
        window.removeEventListener('touchmove', handleMouseMove);
        window.removeEventListener('touchend', handleDragEnd);
      };
      console.log('new Position', position);
    }, [handleMouseMove, handleDragEnd]);

    return (
      <div
        ref={divRef}
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: dragging ? 'grabbing' : 'grab',
        }}
        draggable
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}>
        <WrappedComponent {...props} />
      </div>
    );
  };
}

export { HOCDraggable };
