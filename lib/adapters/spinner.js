class Spinner {
  constructor(message = 'Thinking...') {
    this.message = message;
    this.frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    this.interval = null;
    this.current = 0;
  }

  start() {
    // Hide cursor
    process.stdout.write('\x1B[?25l');
    this.interval = setInterval(() => {
      process.stdout.write(`\r\x1b[36m${this.frames[this.current]}\x1b[0m ${this.message}`);
      this.current = (this.current + 1) % this.frames.length;
    }, 80);
  }

  stop(successMessage = null) {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      // Clear line and show cursor
      process.stdout.write('\r\x1b[K\x1B[?25h');
      if (successMessage) {
        console.log(`\x1b[32m✔\x1b[0m ${successMessage}`);
      }
    }
  }
}

module.exports = { Spinner };
