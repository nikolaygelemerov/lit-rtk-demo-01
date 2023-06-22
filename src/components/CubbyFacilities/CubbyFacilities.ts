import { css, CSSResult, html, LitElement, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { connect } from 'pwa-helpers';

import { initializeProxy } from '@services';
import { api, FacilitiesSelected, RootState, store } from '@store';
import { baseStyles } from '@styles';
import { CubbyFacility } from '@types';

export const ID = 'cubby-facilities';

class CubbyFacilities extends connect(store)(LitElement) {
  connectedCallback() {
    super.connectedCallback();

    this.id = ID;

    initializeProxy[this.id] = {
      isConnected: true
    };
  }

  @state()
  initialized = false;

  @state()
  data = null;

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
    console.log('CubbyFacilities data: ', this.data);
    console.log('CubbyFacilities initialized: ', this.initialized);

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
        : html`<h1>Cubby Facilities Loading...</h1>`}
    `;
  }
}

console.log('customElements.get(cubby-facilities)', customElements.get('cubby-facilities'));

if (customElements.get('cubby-facilities') === undefined) {
  customElements.define('cubby-facilities', CubbyFacilities);
}

export default CubbyFacilities;
