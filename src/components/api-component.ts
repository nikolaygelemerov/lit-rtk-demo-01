import { ApiContext } from './context';
import { ContextProvider } from '@lit-labs/context';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

// eslint-disable-next-line prettier/prettier
@customElement('api-component')
class ApiComponent extends LitElement {
  private _provider = new ContextProvider(this, ApiContext, { data: 'initial data' });

  async fetchData() {
    try {
      // eslint-disable-next-line compat/compat
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();

      this._provider.setValue({ data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  firstUpdated() {
    this.fetchData();
  }

  render() {
    return html`<slot></slot>`;
  }
}

export default ApiComponent;
