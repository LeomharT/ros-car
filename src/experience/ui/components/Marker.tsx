import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { IconMapPinFilled } from '@tabler/icons-react';
import clsx from 'clsx';
import {
  useImperativeHandle,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from 'react';

export type MarkerRef = {
  setVisiable: Dispatch<SetStateAction<boolean>>;
};

type MarkerProps = {
  ref: RefObject<MarkerRef | null>;
};

export default function Marker({ ref }: MarkerProps) {
  const [isVisiable, setVisiable] = useState(true);

  const className = clsx('transition-transform', 'origin-bottom', {
    'scale-0': !isVisiable,
  });

  useImperativeHandle(ref, () => ({
    setVisiable,
  }));

  return (
    <div className={className}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <IconMapPinFilled className="w-[0.8px] h-[0.8px] fill-red-500" />
          </TooltipTrigger>
          <TooltipContent>Destination</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
