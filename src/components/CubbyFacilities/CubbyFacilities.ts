import { css, CSSResult, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { connect } from 'pwa-helpers';

import { api, FacilitiesSelected, RootState, store } from '@store';
import { baseStyles } from '@styles';
import { CubbyFacility } from '@types';

let isConnectedPromise: Promise<string>;

@customElement('cubby-facilities')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class CubbyFacilities extends connect(store)(LitElement) {
  connectedCallback(): void {
    super.connectedCallback();

    // eslint-disable-next-line compat/compat
    isConnectedPromise = Promise.resolve('connected');
  }

  @state()
  initialized = false; // New state

  @state()
  facilities: CubbyFacility[] = [];

  @state()
  selected: FacilitiesSelected = {};

  @property({ type: Object })
  selectedIds: FacilitiesSelected = {};

  @property({
    attribute: 'no-header',
    converter: {
      fromAttribute: (value) => value === 'true',
      toAttribute: (value) => (value ? 'true' : 'false')
    },
    type: Boolean
  })
  noHeader = false;

  @state()
  private componentId = 1;

  @property({ type: Number })
  private version: number | undefined;

  @state()
  customStyles: CSSResult = css``;

  firstUpdated() {
    store.dispatch(api.endpoints.getFacilities.initiate());

    if (STOREFRONT_STYLES?.[`${this.componentId}-${this.version}`]?.cssVariables) {
      const cssVariablesString =
        STOREFRONT_STYLES[`${this.componentId}-${this.version}`].cssVariables;
      const cssVariables = JSON.parse(cssVariablesString);

      const cssString = Object.entries(cssVariables)
        .map(([key, value]) => `${key}: ${value};`)
        .join('\n');

      const hostString = `:host {
        ${cssString}
      }`;

      this.customStyles = css`
        ${unsafeCSS(hostString)}
      `;
    }
  }

  stateChanged(state: RootState) {
    this.selected = state.facilities.selected;

    const getFacilitiesSelector = api.endpoints.getFacilities.select();

    const { data } = getFacilitiesSelector(state);

    if (data) {
      this.facilities = data;
    }
  }

  static styles = css`
    ${baseStyles}

    :host {
      display: flex;
      flex-direction: column;
      gap: calc(2 * var(--offset-xxxl));
      width: 100%;
    }
  `;

  render() {
    console.log('this.initialized: ', this.initialized);

    return html`
      ${this.initialized
        ? html` <style>
              ${this.customStyles}
            </style>
            ${repeat(
              this.facilities || [],
              (facility) => facility.facility.id,
              (facility) =>
                html`<cubby-facility
                  facility-id="${facility.facility.id}"
                  .noHeader="${this.noHeader}"
                ></cubby-facility>`
            )}`
        : html`<div>Loading...</div>`}
    `;
  }
}

export const initialize = () => {
  isConnectedPromise.then(() => {
    console.log('CALLED');
    const element = document.querySelector('cubby-facilities') as CubbyFacilities;

    if (element) {
      element.initialized = true;
      element.requestUpdate(); // Cause LitElement to perform an update
    }
  });
};
