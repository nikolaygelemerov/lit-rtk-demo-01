/* eslint-disable max-len */
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { arrayShuffle } from '@services';

import { imagesURLS } from '../../dummy/imageURLS';
import { CubbyPricingGroup } from '../../types';

// eslint-disable-next-line prettier/prettier
@customElement('cubby-facility-pricing-group')
class CubbyFacilityPricingGroup extends LitElement {
  @property()
  pricingGroup = {} as CubbyPricingGroup;

  static styles = css`
    .pricing-group {
      display: flex;
      flex-direction: column;
      gap: var(--cubby-offset-m);
      height: 400px;
      overflow: hidden;
      box-shadow: var(--cubby-box-shadow);
      border-radius: var(--cubby-border-radius);
    }

    .image-container {
      height: 250px;
      background: var(--background-image);
    }

    .descriptionWrap {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: var(--cubby-offset-l);
    }

    .description {
      display: flex;
      flex-direction: column;
      height: 100px;
      gap: var(--cubby-offset-m);
    }

    .name {
      margin: var(--cubby-offset-zero);
      color: var(--cubby-color-text);
      font-size: var(--cubby-offset-xl);
    }

    .feature {
      overflow: hidden;
      margin: var(--cubby-offset-zero);
      color: var(--cubby-color-text-light);
      font-size: var(--cubby-font-size-s);
    }

    .priceWrap {
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;
      padding: var(--cubby-offset-m);
      color: var(--cubby-color-text-lighter);
      border-top: var(--cubby-border-width) solid var(--cubby-color-text-lighter);
    }

    .price {
      color: var(--cubby-color-warn);
      font-size: var(--cubby-font-size-m);
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

export default CubbyFacilityPricingGroup;
