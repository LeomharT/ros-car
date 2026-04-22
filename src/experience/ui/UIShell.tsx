import React, { createRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import { Alert, type AlertParams, type AlertRef } from './components/Alert';
import { Dialog, type DialogConfig, type DialogRef } from './components/Dialog';

export class UIShell {
  private constructor() {
    const root = this._initRoot();

    this.el = root.el;
    this.dialog = root.dialogRef;
    this.alert = root.alertRef;
  }

  public el: HTMLDivElement;

  public dialog: DialogRef;

  public alert: AlertRef;

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
    const alertRef = createRef() as AlertRef;

    const root = createRoot(el);
    root.render(
      <React.StrictMode>
        <Toaster position="top-center" />
        <Dialog ref={dialogRef} />
        <Alert ref={alertRef} />
      </React.StrictMode>,
    );

    return { el, dialogRef, alertRef };
  }

  private static _instance: UIShell;

  public static getInstance() {
    if (this._instance) return this._instance;
    return (this._instance = new UIShell());
  }
}

export const dialog = {
  open: (args: DialogConfig) => UIShell.getInstance().dialog.current?.open(args),
  close: () => UIShell.getInstance().dialog.current?.close(),
};

export const alert = {
  open: (args: AlertParams) => UIShell.getInstance().alert.current?.open(args),
};
