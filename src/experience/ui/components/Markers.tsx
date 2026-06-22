import { IconMapPinFilled } from '@tabler/icons-react';
import React, { useImperativeHandle, useRef } from 'react';
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

export class _Marker {
  constructor() {
    this.dom = this._initDOM();
    document.body.append(this.dom);
  }
  public dom: HTMLDivElement;

  public position = new Vector3(3, 3, 3);

  private _initDOM() {
    const div = document.createElement('div');
    div.style.width = '48px';
    div.style.height = '48px';
    div.style.position = 'absolute';
    div.style.top = '-24px';
    div.style.left = '-24px';
    div.style.background = 'rgb(0, 0, 0, 0)';

    const img = new Image(64, 64);
    img.src = '/assets/img/map-pin-fill.svg';
    img.draggable = false;

    div.append(img);

    return div;
  }

  public updatePosition(x: number, y: number) {
    this.dom.style.transform = `translate(${x}px, ${y}px)`;
  }
}
