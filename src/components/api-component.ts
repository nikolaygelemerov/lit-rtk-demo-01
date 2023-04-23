import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { api, store } from '@store';

// eslint-disable-next-line prettier/prettier
@customElement('api-component')
class ApiComponent extends LitElement {
  static styles = css`
    :host {
      // **********************************
      // *********** color ************
      // **********************************

      --color-bkg-paper: rgb(236 114 114);
      --color-bkg-button: rgb(31 163 75);
      --color-text: rgb(94 94 94);
      --color-text-button: rgb(255 255 255);
      --color-border: rgb(32 32 32);

      /* neutral */
      --var-accent-1-color: rgb(131 221 131);

      /* neutral */
      --var-neutral-white-color: white;
      --var-neutral-black-color: rgb(0 0 0);

      // **********************************
      // *********** Font size ************
      // **********************************
      --font-size-base: 16px;
      --font-size-xs: 0.625rem; // 10px
      --font-size-s: 0.75rem; // 12px
      --font-size-m: 0.875rem; // 14px
      --font-size-l: 1rem; // 16px
      --font-size-xl: 1.5rem; // 24px
      --font-size-xxl: 1.75rem; // 28px

      // **********************************
      // *********** font-family ************
      // **********************************
      --font-family-base: arial, helvetica, sans-serif;

      // **********************************
      // ************ Offsets *************
      // **********************************
      --offset-zero: 0;
      --offset-min: 1px;
      --offset-xs: 0.25rem; // 4px
      --offset-s: 0.375rem; // 6px
      --offset-m: 0.5rem; // 8px
      --offset-l: 0.75rem; // 12px
      --offset-xl: 1rem; // 16px
      --offset-xxl: 1.25rem; // 20px
      --offset-xxxl: 1.5rem; // 24px
      --offset-xxxxl: 2rem; // 32px

      // **********************************
      // ************ Border radius *************
      // **********************************
      --border-radius: 0.25rem; // 4px

      // **********************************
      // ************ Border width *************
      // **********************************
      --border-width: 1px;

      // **********************************
      // ************ Box shadow *************
      // **********************************
      --box-shadow: rgb(0 0 0 / 35%) 0 5px 10px;
    }
  `;

  firstUpdated() {
    store.dispatch(api.endpoints.fetchPosts.initiate());
  }

  render() {
    return html`<slot></slot>`;
  }
}

export default ApiComponent;
