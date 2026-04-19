import React, { createRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import { Dialog, type DialogParams, type DialogRef } from './components/Dialog';

export class UIShell {
  private constructor() {
    const root = this._initRoot();

    this.dialog = root.dialogRef;
  }

  public dialog: DialogRef;

  private _initRoot() {
    /**
     * Create ui root
     */
    const el = document.createElement('div');
    el.id = 'ui-root';
    document.body.append(el);

    /**
     * Initial react entrance
     */

    const dialogRef = createRef() as DialogRef;

    const root = createRoot(el);
    root.render(
      <React.StrictMode>
        <Toaster position="top-center" />
        <Dialog ref={dialogRef} />
      </React.StrictMode>,
    );

    return { dialogRef };
  }

  private static _instance: UIShell;

  public static getInstance() {
    if (this._instance) return this._instance;
    return (this._instance = new UIShell());
  }
}

export const dialog = {
  open: (args: DialogParams) => UIShell.getInstance().dialog.current?.open(args),
  close: () => UIShell.getInstance().dialog.current?.close(),
};
