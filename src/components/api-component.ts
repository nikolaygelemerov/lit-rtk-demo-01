import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { api, store } from '@store';

// eslint-disable-next-line prettier/prettier
@customElement('api-component')
class ApiComponent extends LitElement {
  static styles = css`
    :host {
      font-size: 16px;
      font-family: var(--font-family-base);

      /* ********************************** */
      /* *********** color ************ */
      /* ********************************** */
      --color-bkg-paper: rgb(236 114 114);
      --color-bkg-button: rgb(31 163 75);
      --color-text: rgb(94 94 94);
      --color-text-button: rgb(255 255 255);
      --color-border: rgb(32 32 32);
      --var-accent-1-color: rgb(131 221 131);
      --var-neutral-white-color: white;
      --var-neutral-black-color: rgb(0 0 0);

      /* ********************************** */
      /* *********** font-size ************ */
      /* ********************************** */
      --font-size-base: 16px;
      --font-size-xs: 0.625rem;
      --font-size-s: 0.75rem;
      --font-size-m: 0.875rem;
      --font-size-l: 1rem;
      --font-size-xl: 1.5rem;
      --font-size-xxl: 1.75rem;

      /* ********************************** */
      /* *********** font-family ************ */
      /* ********************************** */
      --font-family-base: arial, helvetica, sans-serif;

      /* ********************************** */
      /* *********** offset ************ */
      /* ********************************** */
      --offset-zero: 0;
      --offset-min: 1px;
      --offset-xs: 0.25rem;
      --offset-s: 0.375rem;
      --offset-m: 0.5rem;
      --offset-l: 0.75rem;
      --offset-xl: 1rem;
      --offset-xxl: 1.25rem;
      --offset-xxxl: 1.5rem;
      --offset-xxxxl: 2rem;

      /* ********************************** */
      /* *********** border-radius ************ */
      /* ********************************** */
      --border-radius: 0.25rem;

      /* ********************************** */
      /* *********** border-width ************ */
      /* ********************************** */
      --border-width: 1px;

      /* ********************************** */
      /* *********** box-shadow ************ */
      /* ********************************** */
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
