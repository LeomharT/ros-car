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
import { useImperativeHandle, useState } from 'react';

export type DialogParams = {
  title?: string;
  content?: React.ReactNode;
  footer?: boolean;
};

export type DialogRef = React.RefObject<{
  open: (params?: DialogParams) => void;
}>;

export type DialogProps = {
  ref: DialogRef;
};

export function Dialog({ ref }: DialogProps) {
  const [open, setOpen] = useState(false);

  const [props, setProps] = useState<DialogParams>();

  function openDialog(props?: DialogParams) {
    setOpen(true);
    setProps(props);
  }

  useImperativeHandle(ref, () => {
    return {
      open: (params?: DialogParams) => openDialog(params),
    };
  }, []);

  return (
    <DialogShadcn open={open} onOpenChange={(open) => !open && setOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props?.title}</DialogTitle>
          <DialogDescription>{props?.content}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </DialogShadcn>
  );
}
