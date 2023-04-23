import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';

import { store } from '../store/store';

// eslint-disable-next-line prettier/prettier
@customElement('input-component')
class InputComponent extends connect(store)(LitElement) {
  @property({ type: String })
  className = '';

  handleChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;

    const event = new CustomEvent('input-change', {
      bubbles: true,
      composed: true,
      detail: { value }
    });

    this.dispatchEvent(event);
  }

  stateChanged(state: any) {
    console.log('state: ', state);
  }

  render() {
    return html`<input type="text" @input=${this.handleChange} />`;
  }
}

export default InputComponent;
