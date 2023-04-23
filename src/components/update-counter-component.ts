import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';

import { decrementCounter, incrementCounter, store } from '@store';

// eslint-disable-next-line prettier/prettier
@customElement('update-counter-component')
class UpdateCounterComponent extends connect(store)(LitElement) {
  @property({ type: String })
  className = '';

  render() {
    return html`
      <div>
        <button @click="${() => store.dispatch(decrementCounter())}">-</button>
        <button @click="${() => store.dispatch(incrementCounter())}">+</button>
      </div>
    `;
  }
}

export default UpdateCounterComponent;
