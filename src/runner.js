export class Runner {
  constructor() {
    this.cb = undefined;
    this.interval = 0;
    this.intervalInstance = undefined;
  }

  start(cb, speed) {
    speed = Math.max(speed, 1);
    speed = Math.min(speed, 10);

    this.interval = 1000 / speed;
    this.cb = cb;

    this.intervalInstance = setInterval(
      () => this.tick(),
      this.interval
    );

  }

  tick() {
    this.cb();
  }

  stop() {
    clearInterval(this.intervalInstance);
    this.interval = undefined;
    this.cb = undefined;
  }
}
