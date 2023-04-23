import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { api, store } from '@store';

// eslint-disable-next-line prettier/prettier
@customElement('api-component')
class ApiComponent extends LitElement {
  firstUpdated() {
    store.dispatch(api.endpoints.fetchPosts.initiate());
  }

  render() {
    return html`<slot></slot>`;
  }
}

export default ApiComponent;
