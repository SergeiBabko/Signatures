import * as Utils from './utils.mjs';

export class Spinner {
  constructor(params) {
    this.params = params;
  }

  create() {
    this.spinner = this.#createSpinner();
    Utils.appendChild(this.spinner, this.#createWaves());
    return this.spinner;
  }

  destroy() {
    this.spinner.classList.add('destroyed');
    setTimeout(() => this.spinner.remove(), 1000);
  }

  #createSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    return spinner;
  }

  #createWaves() {
    const wavesCount = Math.max(this.params.waves || 0, 3);
    const waves = document.createElement('div');
    waves.className = 'waves';
    for (let i = 1; i <= wavesCount; i++) {
      Utils.appendChild(waves, this.#createWave(i));
    }
    return waves;
  }

  #createWave(index) {
    const wave = document.createElement('div');
    wave.className = `wave wave-${index}`;
    wave.style.width = Utils.randomInRange(95, 105, 5) + '%';
    wave.style.height = Utils.randomInRange(95, 105, 5) + '%';
    wave.style.animation = `drift ${Utils.randomInRange(5, 10) * 1000}ms infinite linear`;
    Utils.appendChild(wave, this.#createWaveColor());
    return wave;
  }

  #createWaveColor() {
    const color = document.createElement('div');
    color.className = `wave-color`;
    color.style.transform = `rotate(${Utils.randomInRange(0, 360, 5)}deg)`;
    return color;
  }
}
