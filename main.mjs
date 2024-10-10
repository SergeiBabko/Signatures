import chroma from 'https://unpkg.com/chroma-js@3.1.0/index.js';
import { Signature } from './signature.mjs';
import { Spinner } from './spinner.mjs';

import * as Utils from './utils.mjs';

new class Main {
  DEFAULT_PARAMETERS = {
    waves: 3,
    useBackground: true,
    title: 'SEGICH',
    subtitle: 'A software wizard by day, a creative explorer by night',
    image: 'https://picsum.photos/1000',
    icons: '[{"title":"Ko-Fi","icon":"fa-solid fa-mug-saucer","url":"https://ko-fi.com/segich"},{"title":"Buy Me a Coffee","icon":"fa-solid fa-mug-saucer","url":"https://buymeacoffee.com/segich"}]'
  };

  constructor() {
    this.params = this.getParameters();
    this.root = document.getElementById('root');
  }

  initialize() {
    const spinner = new Spinner(this.params);
    Utils.appendChild(this.root, spinner.create());
    this.getColors().then((colors) => {
      this.updateBackground(colors);
      const signature = new Signature(this.params, colors);
      const signatureEl = signature.create();
      setTimeout(() => {
        spinner.destroy();
        Utils.appendChild(this.root, signatureEl);
      }, 1000);
    });
  }

  getParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    return { ...this.DEFAULT_PARAMETERS, ...Object.fromEntries(urlParams) };
  }

  async getColors() {
    return new Promise((resolve) => {
      const img = new Image();
      const resolveColors = () => {
        const fac = new FastAverageColor();
        const color = fac.getColor(img);
        const colorAccent = color.hex;
        const colorText = chroma(colorAccent).mix(color.isDark ? 'white' : 'black', 0.9).hex();
        const colorBackground = chroma(colorAccent).mix('white', color.isDark ? 0.3 : 0.7).hex();
        resolve({ color, colorText, colorAccent, colorBackground });
      };
      img.onload = resolveColors;
      img.onerror = resolveColors;
      img.crossOrigin = 'Anonymous';
      img.src = this.params.image;
    });
  }

  updateBackground(colors) {
    try {
      const useBgParam = this.params.useBackground;
      const useBackground = typeof useBgParam !== 'boolean' ? JSON.parse(this.params.useBackground) : useBgParam;
      if (useBackground) this.root.style.backgroundColor = colors.colorText;
    } catch (e) {
      //
    }
  }
}().initialize();
