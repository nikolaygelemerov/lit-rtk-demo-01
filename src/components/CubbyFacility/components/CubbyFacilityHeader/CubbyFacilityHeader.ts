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
      display: var(--header-display);
      height: 300px;
      background: transparent
        url('https://st.depositphotos.com/1320280/2058/i/600/depositphotos_20581225-stock-photo-unit-storage.jpg')
        no-repeat center;
      background-size: cover;
      box-shadow: var(--box-shadow-light);
    }

    h1 {
      position: absolute;
      bottom: var(--offset-s);
      left: var(--offset-s);
      margin: 0;
      padding: 0;
      color: var(--color-text-lightest);
      font-size: var(--font-size-xxl);
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
