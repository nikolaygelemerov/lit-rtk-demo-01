/* eslint-disable max-len */
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { arrayShuffle } from '@services';

import { imagesURLS } from '../../dummy/imageURLS';
import { CubbyPricingGroup } from '../../types';

class CubbyFacilityPricingGroup extends LitElement {
  @property()
  pricingGroup = {} as CubbyPricingGroup;

  static styles = css`
    .pricing-group {
      display: flex;
      flex-direction: column;
      gap: var(--offset-m);
      height: 400px;
      overflow: hidden;
      box-shadow: var(--box-shadow);
      border-radius: var(--border-radius);
    }

    .image-container {
      height: 250px;
      background: var(--background-image);
    }

    .descriptionWrap {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: var(--offset-l);
    }

    .description {
      display: flex;
      flex-direction: column;
      height: 100px;
      gap: var(--offset-m);
    }

    .name {
      margin: 0;
      color: var(--color-text);
      font-size: var(--offset-xl);
    }

    .feature {
      overflow: hidden;
      margin: 0;
      color: var(--color-text-light);
      font-size: var(--font-size-s);
    }

    .priceWrap {
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;
      padding: var(--offset-m);
      color: var(--color-text-lighter);
      border-top: var(--border-width) solid var(--color-text-lighter);
    }

    .price {
      color: var(--color-warn);
      font-size: var(--font-size-m);
    }
  `;

  firstUpdated() {
    const pricingGroupImage = arrayShuffle(imagesURLS)[0];

    this.style.setProperty(
      '--background-image',
      `transparent url(${pricingGroupImage}) no-repeat center`
    );
  }

  render() {
    return html`
      <div class="pricing-group">
        <div class="image-container"></div>
        <div class="descriptionWrap">
          <div class="description">
            <p class="name">${this.pricingGroup.name}</p>
            <p class="feature">
              ${repeat(
                this.pricingGroup.features || [],
                (feature) => feature.name,
                (feature, index) =>
                  html`<span
                    >${feature.name}${index !== this.pricingGroup.features.length - 1
                      ? ', '
                      : ''}</span
                  >`
              )}
            </p>
          </div>
          <div class="priceWrap">
            <span>From</span>
            <span class="price">$${this.pricingGroup.price}</span>
          </div>
        </div>
      </div>
    `;
  }
}

console.log(
  'customElements.get(cubby-facility-pricing-group)',
  customElements.get('cubby-facility-pricing-group')
);

if (customElements.get('cubby-facility-pricing-group') === undefined) {
  customElements.define('cubby-facility-pricing-group', CubbyFacilityPricingGroup);
}

export default CubbyFacilityPricingGroup;
