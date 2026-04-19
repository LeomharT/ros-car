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
import { useImperativeHandle, useState } from 'react';

export type DialogParams = {
  title?: string;
  content?: React.ReactNode;
  footer?: boolean;
  showCloseButton?: boolean;
  onOk?: () => Promise<unknown> | void;
};

export type DialogRef = React.RefObject<{
  open: (params?: DialogParams) => void;
  close: () => void;
}>;

export type DialogProps = {
  ref: DialogRef;
};

export function Dialog({ ref }: DialogProps) {
  const [open, setOpen] = useState(false);

  const [props, setProps] = useState<DialogParams>();

  const [loading, setLoading] = useState(false);

  function openDialog(props?: DialogParams) {
    setOpen(true);
    setProps(props);
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
      open: (params?: DialogParams) => openDialog(params),
      close: () => setOpen(false),
    };
  }, []);

  return (
    <DialogShadcn open={open} onOpenChange={(open) => !open && setOpen(false)}>
      <DialogContent showCloseButton={props?.showCloseButton}>
        <DialogHeader>
          <DialogTitle>{props?.title}</DialogTitle>
          <DialogDescription>{props?.content}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={loading} onClick={handleOnOk}>
            {loading && <Spinner />}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogShadcn>
  );
}
