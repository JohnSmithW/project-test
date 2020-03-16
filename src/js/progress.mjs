'use strict';

export function Progress(options) {
  this.start = 0;
  this.run = function() {
    this.start += 10;
    var progressElement = options.progressElement;
    if (this.start > 100) {
      this.start = 100;
    } else { progressElement.style.width = this.start + '%'; }
  };
}