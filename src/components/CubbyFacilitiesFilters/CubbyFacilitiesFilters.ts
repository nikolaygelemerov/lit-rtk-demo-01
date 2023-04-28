import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { connect } from 'pwa-helpers';

import '@assets';
import { fetchFacilities } from '@services';
import { RootState, SelectedFacilitiesMap, selectFacility, store } from '@store';
import { baseStyles } from '@styles';
import { CubbyFacility as CubbyFacilityType } from '@types';

@customElement('cubby-facilities-filters')
class CubbyFacilitiesFilters extends connect(store)(LitElement) {
  @state()
  isOpen = true;

  @state()
  facilities: CubbyFacilityType[] = [];

  @state()
  selectedMap: SelectedFacilitiesMap = {};

  async firstUpdated() {
    try {
      const facilities = await fetchFacilities();

      if (facilities) {
        this.facilities = facilities;
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  static styles = css`
    ${baseStyles}

    :host {
      --filter-button-width: calc(2 * var(--cubby-offset-l) + 24px);

      display: flex;
    }

    .container {
      position: relative;
      display: flex;
      align-items: flex-start;
      transform: translateX(0);
      transition: transform var(--cubby-transition-time) ease-in-out;
    }

    .container-closed {
      transform: translateX(calc(-100% + var(--filter-button-width)));
    }

    .button-wrap {
      display: flex;
      flex-direction: column;
      gap: var(--cubby-offset-l);
      width: 20rem;
      padding: var(--cubby-offset-xxl);
      overflow: hidden;
      background-color: var(--cubby-color-bkg-lightest);
      border-top: var(--cubby-border-width) solid var(--cubby-color-border-lighter);
      border-bottom-right-radius: var(--cubby-border-radius);
      box-shadow: var(--cubby-box-shadow-light);
    }

    .filter-title {
      font-size: var(--cubby-font-size-xl);
      margin: var(--cubby-offset-m) 0;
    }

    .button {
      padding: var(--cubby-offset-m) var(--cubby-offset-l);
      color: var(--cubby-color-text);
      font-size: var(--cubby-font-size-l);
      background-color: var(--cubby-color-bkg-lighter);
      border: none;
      border-radius: var(--cubby-border-radius);
      box-shadow: var(--cubby-box-shadow-light);
      transition: background-color var(--cubby-transition-time) ease-in-out;
      cursor: pointer;
    }

    .button-selected,
    .button:hover {
      background-color: var(--cubby-color-bkg-light);
    }

    .button-svg {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--cubby-offset-m) var(--cubby-offset-l);
      background-color: var(--cubby-color-bkg-lightest);
      border: none;
      border-top: var(--cubby-border-width) solid var(--cubby-color-border-lighter);
      border-top-right-radius: var(--cubby-border-radius);
      border-bottom-right-radius: var(--cubby-border-radius);
      box-shadow: var(--cubby-box-shadow-light);
      cursor: pointer;
    }

    .separator {
      position: absolute;
      z-index: 1;
      top: 1px;
      right: calc(var(--filter-button-width) + var(--cubby-border-width));
      width: 2px;
      height: calc(2 * var(--cubby-offset-m) + 24px);
      background-color: var(--cubby-color-bkg-lightest);
    }
  `;

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  stateChanged(state: RootState) {
    this.selectedMap = state.facilities.selectedMap;
  }

  render() {
    return html`
      <div class="container ${this.isOpen ? '' : 'container-closed'}">
        <div class="button-wrap">
          <p class="filter-title">Select facilities</p>
          ${repeat(
            this.facilities || [],
            (facility) => facility.facility.id,
            (facility) =>
              html`<button
                class="button ${this.selectedMap[facility.facility.id] ? 'button-selected' : ''}"
                @click="${() => {
                  store.dispatch(selectFacility(facility.facility.id));
                }}"
                type="button"
              >
                ${facility.facility.name}
              </button>`
          )}
        </div>
        <button class="button-svg" @click="${this.toggleOpen}">
          <cubby-filters-svg stroke="var(--cubby-color-text)"></cubby-filters-svg>
        </button>
        <div class="separator" />
      </div>
    `;
  }
}

export default CubbyFacilitiesFilters;
