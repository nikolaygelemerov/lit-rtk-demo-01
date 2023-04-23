import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';

import { decrementCounter, incrementCounter, store } from '@store';

// eslint-disable-next-line prettier/prettier
@customElement('update-counter-component')
class UpdateCounterComponent extends connect(store)(LitElement) {
  static styles = css`
    .button-container {
      display: flex;
      gap: var(--offset-l);
    }

    button {
      cursor: pointer;
    }
  `;

  render() {
    return html`
      <div class="button-container">
        <button @click="${() => store.dispatch(decrementCounter())}">-</button>
        <button @click="${() => store.dispatch(incrementCounter())}">+</button>
      </div>
    `;
  }
}

export default UpdateCounterComponent;
