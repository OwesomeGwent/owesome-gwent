export interface INoti {
  id: number;
  message: string;
  timeout: number;
  type: NotiType;
}
export type NotiType = 'success' | 'error' | 'default';

type Listener = (getNoties: () => INoti[]) => void;

const baseNoti: Pick<INoti, 'message' | 'timeout' | 'type'> = {
  message: 'Default Message',
  timeout: 3000,
  type: 'default',
};

export class Notify {
  public uid = 0;
  public noties: INoti[] = [];
  public listeners: Listener[] = [];
  public subscribe = (listener: Listener) => {
    this.listeners.push(listener);
  };
  public notify = (noti: Partial<INoti>) => {
    const newNoti = {
      ...baseNoti,
      ...noti,
      id: this.uid++,
    };
    this.noties.push(newNoti);
    this.notifier();
  };
  public remove = (id: number) => {
    this.noties = this.noties.filter(noty => noty.id !== id);
    this.notifier();
  };
  public clear = () => {
    this.noties = [];
    this.notifier();
  };

  private getNoties = () => {
    return this.noties;
  };
  private notifier = () => {
    this.listeners.forEach(listener => listener(this.getNoties));
  };
}

export const notify = new Notify();
