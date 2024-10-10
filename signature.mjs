import * as Utils from './utils.mjs';

export class Signature {
  constructor(params, colors) {
    this.params = params;
    this.colors = colors;
  }

  create() {
    const signature = this.#createSignature();
    Utils.appendChild(signature, this.#createSignatureBackground());
    Utils.appendChild(signature, this.#createSignatureHeader());
    Utils.appendChild(signature, this.#createSignatureBody());
    Utils.appendChild(signature, this.#createSignatureForeground());
    return signature;
  }

  #createSignature() {
    const signature = document.createElement('div');
    signature.className = 'signature';
    return signature;
  }

  #createSignatureBackground() {
    const signatureBackground = document.createElement('div');
    signatureBackground.className = 'signature-background';
    signatureBackground.style.backgroundColor = this.colors.colorBackground;
    return signatureBackground;
  }

  #createSignatureHeader() {
    const signatureHeader = document.createElement('div');
    signatureHeader.className = 'signature-header';
    Utils.appendChild(signatureHeader, this.#createWaves());
    Utils.appendChild(signatureHeader, this.#createHeaderImage());
    return signatureHeader;
  }

  #createWaves() {
    const wavesCount = this.params.waves || 1;
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
    color.style.backgroundColor = this.colors.colorAccent;
    color.style.transform = `rotate(${Utils.randomInRange(-15, 15, 5)}deg)`;
    return color;
  }

  #createHeaderImage() {
    if (!this.params.image) return;
    const headerImage = document.createElement('div');
    headerImage.className = 'header-image';
    headerImage.style.borderColor = this.colors.colorBackground;
    headerImage.style.backgroundColor = this.colors.colorBackground;
    headerImage.style.backgroundImage = `url(${this.params.image})`;
    return headerImage;
  }

  #createSignatureBody() {
    const signatureBody = document.createElement('div');
    signatureBody.className = 'signature-body';
    signatureBody.style.color = this.colors.colorText;
    Utils.appendChild(signatureBody, this.#createBodyNameWrapper());
    Utils.appendChild(signatureBody, this.#createBodyIcons());
    return signatureBody;
  }

  #createBodyNameWrapper() {
    if (!this.params.title && !this.params.subtitle) return;
    const bodyNameWrapper = document.createElement('div');
    bodyNameWrapper.className = 'body-name-wrapper';
    Utils.appendChild(bodyNameWrapper, this.#createBodyTitle());
    Utils.appendChild(bodyNameWrapper, this.#createBodySubtitle());
    return bodyNameWrapper;
  }

  #createBodyTitle() {
    if (!this.params.title) return;
    const bodyTitle = document.createElement('div');
    bodyTitle.className = 'body-title';
    bodyTitle.textContent = this.params.title;
    return bodyTitle;
  }

  #createBodySubtitle() {
    if (!this.params.subtitle) return;
    const bodySubtitle = document.createElement('div');
    bodySubtitle.className = 'body-subtitle';
    bodySubtitle.textContent = this.params.subtitle;
    return bodySubtitle;
  }

  #createBodyIcons() {
    if (!this.params.icons) return;
    try {
      const icons = JSON.parse(this.params.icons);
      const bodyIcons = document.createElement('div');
      bodyIcons.className = 'body-icons';
      this.#prepareIcons(bodyIcons, icons);
      return bodyIcons;
    } catch (r) {
      return;
    }
  }

  #createSignatureForeground() {
    const signatureForeground = document.createElement('div');
    signatureForeground.className = 'signature-foreground';
    return signatureForeground;
  }

  #prepareIcons(bodyIconsRoot, icons) {
    icons.forEach((icon) => {
      const iconLink = document.createElement('a');
      iconLink.className = 'icon';
      iconLink.href = icon.url;
      iconLink.target = '_blank';
      if (icon.icon) {
        const iconEl = document.createElement('i');
        iconEl.className = icon.icon;
        Utils.appendChild(iconLink, iconEl);
      }
      if (icon.title) {
        const iconTitle = document.createElement('div');
        iconTitle.className = 'iconTitle';
        iconTitle.textContent = icon.title;
        Utils.appendChild(iconLink, iconTitle);
      }
      Utils.appendChild(bodyIconsRoot, iconLink);
    });
  }
}
