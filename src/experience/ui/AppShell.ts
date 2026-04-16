import React from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';

export class AppShell {
  private constructor() {
    this._initRoot();
  }

  private _initRoot() {
    const el = document.createElement('div');
    el.id = 'ui-root';
    document.body.append(el);

    const root = createRoot(el);
    root.render(React.createElement(React.Fragment, { children: React.createElement(Toaster) }));
  }

  private static _instance: AppShell;

  public static getInstance() {
    if (this._instance) return this._instance;
    return (this._instance = new AppShell());
  }
}
