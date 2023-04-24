/* eslint-disable max-len */
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { CubbyPricingGroup } from '../../types';

// eslint-disable-next-line prettier/prettier
@customElement('cubby-facility-pricing-group')
class CubbyFacilityPricingGroup extends LitElement {
  @property()
  pricingGroup = {} as CubbyPricingGroup;

  static styles = css`
    .pricing-group {
      height: 400px;
      box-shadow: var(--cubby-box-shadow);
      border-radius: var(--cubby-border-radius);
    }
  `;

  render() {
    return html`
      <div class="pricing-group">
        <p>${this.pricingGroup.name}</p>
      </div>
    `;
  }
}

export default CubbyFacilityPricingGroup;
