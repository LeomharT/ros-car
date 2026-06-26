import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import React, { useImperativeHandle, useState, type MouseEvent, type ReactNode } from 'react';

export type AlertRef = React.RefObject<{
  open: (props: AlertParams) => void;
}>;

export type AlertProps = {
  ref: AlertRef;
};

export type AlertParams = {
  title?: React.ReactNode;
  size?: 'sm' | 'default' | undefined;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: ReactNode;
  onOk?: (e: MouseEvent) => void;
  onCancel?: (e: MouseEvent) => void;
};

export function Alert({ ref }: AlertProps) {
  const [open, setOpen] = useState(false);
  const [props, setProps] = useState<AlertParams>();

  useImperativeHandle(ref, () => {
    return {
      open: (props: AlertParams) => {
        setProps(props);
        setOpen(true);
      },
    };
  }, []);

  return (
    <AlertDialog open={open} onOpenChange={(open) => !open && setOpen(false)}>
      <AlertDialogContent size={props?.size}>
        <AlertDialogHeader>
          <AlertDialogTitle>{props?.title}</AlertDialogTitle>
          <AlertDialogDescription>{props?.description} </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={props?.onCancel}>Don&apos;t allow</AlertDialogCancel>
          <AlertDialogAction onClick={props?.onOk}>Allow</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
