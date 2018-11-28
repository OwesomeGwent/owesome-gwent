import { createContext, ReactNode } from 'react';

export interface IModalContext {
  openModal: (children: ReactNode) => void;
  closeModal: () => void;
}

export default createContext({} as IModalContext);
