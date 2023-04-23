import { ContextConsumer } from '@lit-labs/context';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ApiContext } from './context';

// eslint-disable-next-line prettier/prettier
@customElement('word-component')
class WordComponent extends LitElement {
  private _myData = new ContextConsumer(this, ApiContext, () => {}, true);

  @property({ type: String })
  class = '';

  @property({ type: String })
  word = '';

  static styles = css`
    :host {
      all: initial;
      color: red;
    }
  `;

  render() {
    console.log('this._myData: ', this._myData);
    return html`
      <div>
        <h2>${this.word}</h2>
        <p>${JSON.stringify(this._myData.value)}</p>
      </div>
    `;
  }
}

export default WordComponent;
