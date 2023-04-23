import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';

import { store } from '@store';
import { RootState } from '@types';

// eslint-disable-next-line prettier/prettier
@customElement('counter-component')
class CounterComponent extends connect(store)(LitElement) {
  @state()
  counter = 0;

  stateChanged(state: RootState) {
    this.counter = state.counter.value;
  }

  render() {
    return html`<h1>Counter: ${this.counter}</h1> `;
  }
}

export default CounterComponent;
