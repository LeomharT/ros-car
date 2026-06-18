import { IconMapPinFilled } from '@tabler/icons-react';
import { useImperativeHandle, useRef } from 'react';
import { Vector3 } from 'three';

export type MarkersRef = React.RefObject<{
  updateTranslate: (x: number, y: number) => void;
  positions: Vector3;
}>;

export type MarkersProps = {
  ref: MarkersRef;
};

export default function Markers({ ref }: MarkersProps) {
  const _ref = useRef<HTMLDivElement>(null);

  const positions = useRef(new Vector3(3, 3, 3));

  function updateTranslate(x: number, y: number) {
    if (_ref.current) {
      _ref.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }

  useImperativeHandle(ref, () => {
    return {
      updateTranslate,
      positions: positions.current,
    };
  });

  return (
    <div ref={_ref} className="w-16 h-16 absolute -top-8 -left-8 flex justify-center items-center">
      <IconMapPinFilled className="fill-red-500 w-14 h-14" />
    </div>
  );
}
