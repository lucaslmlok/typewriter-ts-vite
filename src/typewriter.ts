type QueueItem = () => Promise<void>;

type Options = {
  loop?: boolean;
  delay?: number;
  deleteSpeed?: number;
};

const defaultOptions: Options = {
  loop: false,
  delay: 40,
  deleteSpeed: 100,
};

class Typewriter {
  private queue: QueueItem[] = [];

  constructor(private element: HTMLElement, private options: Options) {
    this.options = { ...defaultOptions, ...options };
  }

  private AddToQueue(cb: (resolve: () => void) => void) {
    this.queue.push(() => new Promise(cb));
  }

  pauseFor(duration: number) {
    this.AddToQueue((resolve) => {
      setTimeout(resolve, duration);
    });
    return this;
  }

  typeString(string: string) {
    this.AddToQueue((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        this.element.append(string[i]);
        i++;

        if (i >= string.length) {
          clearInterval(interval);
          resolve();
        }
      }, this.options.delay);
    });
    return this;
  }

  deleteChars(number: number) {
    this.AddToQueue((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        this.element.innerHTML = this.element.innerHTML.substring(
          0,
          this.element.innerHTML.length - 1
        );
        i++;

        if (i >= number) {
          clearInterval(interval);
          resolve();
        }
      }, this.options.delay);
    });
    return this;
  }

  deleteAll(speed = this.options.deleteSpeed) {
    this.AddToQueue((resolve) => {
      const interval = setInterval(() => {
        this.element.innerHTML = this.element.innerHTML.substring(
          0,
          this.element.innerHTML.length - 1
        );

        if (this.element.innerHTML.length <= 0) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
    return this;
  }

  async start() {
    let cb = this.queue.shift();
    while (cb != null) {
      await cb();
      if (this.options.loop) {
        this.queue.push(cb);
      }
      cb = this.queue.shift();
    }
    return this;
  }
}

export default Typewriter;
