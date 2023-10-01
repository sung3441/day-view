import SnackbarUI from '@/shared/component/Organism/Snackbar/indext';
import { IS_NODE } from '@/shared/constant';
import { createRoot, Root } from 'react-dom/client';

export type TMessage = {
  message: string;
  id: string;
};

class Snackbar {
  private static instance: Snackbar;
  private readonly rootElement: HTMLDivElement | null = null;
  private readonly root: Root | null = null;
  private readonly duration: number = 3000;
  private messages: TMessage[] = [];

  constructor() {
    if (!IS_NODE) {
      this.rootElement = document?.getElementById(
        'snackbar-root'
      ) as HTMLDivElement;
      this.root = createRoot(this.rootElement);
    }
  }

  private renderToast() {
    if (!this.root) return;
    this.root.render(
      <SnackbarUI
        messages={this.messages}
        handleClose={this.close.bind(this)}
      />
    );
  }

  private hideElement(id: string) {
    const target = document.getElementById(id);
    if (target) target.classList.add('hide');
  }

  private close(id: string) {
    const target = this.messages.find((message) => message.id === id);
    if (target) {
      this.hideElement(id);
      setTimeout(() => {
        this.messages = this.messages.filter(
          (message) => message.id !== target.id
        );
        this.renderToast();
      }, 150);
    }
  }

  private autoClose(id: string) {
    setTimeout(() => this.close(id), this.duration);
  }

  public addMessage(message: string) {
    // TODO: id를 uuid로 변경
    const id = new Date().getTime().toString();
    this.messages.push({
      message,
      id: new Date().getTime().toString(),
    });
    this.autoClose(id);
    this.renderToast();
  }
}

const snackbar = new Snackbar();
export default snackbar;
