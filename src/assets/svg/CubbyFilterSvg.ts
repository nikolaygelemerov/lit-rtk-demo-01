import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

class CubbyFilterSvg extends LitElement {
  @property()
  width = '24';

  @property()
  height = '24';

  @property()
  fill = 'none';

  @property()
  stroke = 'currentColor';

  render() {
    return html`
      <style>
        :host {
          width: ${this.width}px;
          height: ${this.height}px;
        }
      </style>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 24 24"
        fill="${this.fill}"
        stroke="${this.stroke}"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-filter"
      >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
    `;
  }
}

console.log('customElements.get(cubby-filters-svg)', customElements.get('cubby-filters-svg'));

if (customElements.get('cubby-filters-svg') === undefined) {
  customElements.define('cubby-filters-svg', CubbyFilterSvg);
}

export default CubbyFilterSvg;
