import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  Dialog as DialogShadcn,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import React, { useImperativeHandle, useState } from 'react';

export type DialogConfig = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  title?: string;
  description?: React.ReactNode;
  content?: React.ReactNode;
  footer?: boolean;
  showCloseButton?: boolean;
  okText?: string;
  cancelText?: string;
  okButtonProps?: React.ComponentProps<'button'>;
  cancelButtonProps?: React.ComponentProps<'button'>;
  onOk?: () => Promise<unknown> | void;
};

export type DialogRef = React.RefObject<{
  open: (params?: DialogConfig) => void;
  close: () => void;
}>;

export type DialogProps = {
  ref: DialogRef;
};

const sizeMap = {
  sm: 'sm:max-w-sm',
  md: 'md:max-w-md',
  lg: 'lg:max-w-lg',
  xl: 'xl:max-w-xl',
};

export function Dialog({ ref }: DialogProps) {
  const [open, setOpen] = useState(false);

  const [props, setProps] = useState<DialogConfig>({
    size: 'sm',
    okText: 'Ok',
    cancelText: 'Cancel',
  });

  const [loading, setLoading] = useState(false);

  function handleOnOpen(props?: DialogConfig) {
    setOpen(true);
    setProps(() => ({ size: 'sm', okText: 'Ok', cancelText: 'Cancel', ...props }));
  }

  function handleOnOk() {
    const p = props?.onOk?.();

    if (p) {
      setLoading(true);
      p.then(() => {
        setOpen(false);
        setLoading(false);
      });
    }
  }

  useImperativeHandle(ref, () => {
    return {
      open: handleOnOpen,
      close: () => setOpen(false),
    };
  }, []);

  return (
    <DialogShadcn open={open} onOpenChange={(open) => !open && setOpen(false)}>
      <DialogContent
        showCloseButton={props?.showCloseButton}
        className={sizeMap[props.size || 'sm']}
      >
        <DialogHeader>
          <DialogTitle>{props?.title}</DialogTitle>
          <DialogDescription>{props?.description}</DialogDescription>
        </DialogHeader>
        {props.content}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" {...props?.cancelButtonProps}>
              {props?.cancelText}
            </Button>
          </DialogClose>
          <Button type="submit" disabled={loading} onClick={handleOnOk} {...props?.okButtonProps}>
            {loading && <Spinner />}
            {props?.okText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogShadcn>
  );
}
