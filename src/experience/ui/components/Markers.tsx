import type React from 'react';
import { useImperativeHandle, useRef } from 'react';

export type MarkersRef = React.RefObject<{}>;

export type MarkersProps = {
  ref: MarkersRef;
};

export default function Markers({ ref }: MarkersProps) {
  const _ref = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => {
    return {};
  }, []);

  return (
    <div ref={_ref}>
      <div className="absolute top-0 left-0 w-20 h-20 bg-amber-200"></div>
    </div>
  );
}
