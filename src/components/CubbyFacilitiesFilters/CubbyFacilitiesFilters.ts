import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { connect } from 'pwa-helpers';

import '@assets';
import { api, FacilitiesSelected, RootState, selectFacility, store } from '@store';
import { baseStyles } from '@styles';
import { CubbyFacility } from '@types';

@customElement('cubby-facilities-filters')
class CubbyFacilitiesFilters extends connect(store)(LitElement) {
  @state()
  isOpen = true;

  @state()
  facilities: CubbyFacility[] = [];

  @state()
  selected: FacilitiesSelected = {};

  static styles = css`
    ${baseStyles}

    :host {
      --filter-button-width: calc(2 * var(--offset-l) + 24px);

      display: flex;
    }

    .container {
      position: relative;
      display: flex;
      align-items: flex-start;
      width: 20rem;
      transition: width var(--transition-time) ease-in-out;
    }

    .container-closed {
      width: 0;
    }

    .button-wrap {
      display: flex;
      flex-direction: column;
      gap: var(--offset-l);
      width: 100%;
      padding: var(--offset-xxl);
      overflow: hidden;
      background-color: var(--color-bkg-lightest);
      border-top: var(--border-width) solid var(--color-border-lighter);
      border-bottom-right-radius: var(--border-radius);
      box-shadow: var(--box-shadow-light);
    }

    .button-wrap-closed {
      padding: 0;
    }

    .filter-title {
      font-size: var(--font-size-xl);
      margin: var(--offset-m) 0;
      color: var(--color-text);
    }

    .button {
      padding: var(--offset-m) var(--offset-l);
      color: var(--color-text);
      font-size: var(--font-size-l);
      background-color: var(--color-bkg-lighter);
      border: none;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow-light);
      transition: background-color var(--transition-time) ease-in-out;
      cursor: pointer;
    }

    .button-selected,
    .button:hover {
      background-color: var(--color-bkg-light);
    }

    .button-svg {
      position: absolute;
      z-index: 1;
      top: 0;
      right: calc(-1 * (var(--filter-button-width)));
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--offset-m) var(--offset-l);
      background-color: var(--color-bkg-lightest);
      border: none;
      border-top: var(--border-width) solid var(--color-border-lighter);
      border-top-right-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
      box-shadow: var(--box-shadow-light);
      cursor: pointer;
    }

    .separator {
      position: absolute;
      z-index: 1;
      top: 1px;
      right: calc(var(--filter-button-width) + var(--border-width));
      width: 2px;
      height: calc(2 * var(--offset-m) + 24px);
      background-color: var(--color-bkg-lightest);
    }
  `;

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  stateChanged(state: RootState) {
    this.selected = state.facilities.selected;

    const getFacilitiesSelector = api.endpoints.getFacilities.select();

    const { data } = getFacilitiesSelector(state);

    if (data) {
      this.facilities = data;
    }
  }

  render() {
    return html`
      <div class="container ${this.isOpen ? '' : 'container-closed'}">
        <div class="button-wrap ${this.isOpen ? '' : 'button-wrap-closed'}">
          <p class="filter-title">Select facilities</p>
          ${repeat(
            this.facilities || [],
            (facility) => facility.facility.id,
            (facility) =>
              html`<button
                aria-label="Select facility ${facility.facility.id}"
                class="button ${this.selected[facility.facility.id] ? 'button-selected' : ''}"
                @click="${() => {
                  store.dispatch(selectFacility(facility.facility.id));
                }}"
                type="button"
              >
                ${facility.facility.name}
              </button>`
          )}
        </div>
        <button aria-label="Toggle filters" class="button-svg" @click="${this.toggleOpen}">
          <cubby-filters-svg stroke="var(--color-text)"></cubby-filters-svg>
        </button>
        <div class="separator" />
      </div>
    `;
  }
}

export default CubbyFacilitiesFilters;
