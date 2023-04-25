/* eslint-disable max-len */
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { CubbyFacility } from '../../types';

// eslint-disable-next-line prettier/prettier
@customElement('cubby-facility-header')
class CubbyFacilityHeader extends LitElement {
  @property()
  facility = {} as CubbyFacility;

  static styles = css`
    .header {
      position: relative;
      height: 300px;
      background: transparent
        url('https://st.depositphotos.com/1320280/2058/i/600/depositphotos_20581225-stock-photo-unit-storage.jpg')
        no-repeat center;
      background-size: cover;
      box-shadow: var(--cubby-box-shadow);
    }

    h1 {
      position: absolute;
      bottom: var(--cubby-offset-s);
      left: var(--cubby-offset-s);
      margin: 0;
      padding: 0;
      color: var(--cubby-color-text-lightest);
      font-size: var(--cubby-font-size-xxl);
    }
  `;

  render() {
    return html`
      <header class="header">
        <h1>${this.facility.facility?.name}</h1>
      </header>
    `;
  }
}

export default CubbyFacilityHeader;
