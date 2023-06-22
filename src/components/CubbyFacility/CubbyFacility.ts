import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { connect } from 'pwa-helpers';

import { store } from '@store';
import { api, RootState } from '@store';
import { baseStyles } from '@styles';

import CubbyTabs from '../shared/CubbyTabs/CubbyTabs';
import './components';
import { CubbyFacility as CubbyFacilityType, Id } from './types';

class CubbyFacility extends connect(store)(LitElement) {
  @property({ attribute: 'facility-id', type: Number }) facilityId: Id = 1;

  @state()
  facility = {} as CubbyFacilityType;

  @property({ type: Boolean })
  noHeader = false;

  /*
  async firstUpdated() {
    try {
      const facility = await fetchFacilities(this.facilityId);

      if (facility) {
        this.facility = facility;
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  */

  stateChanged(state: RootState) {
    const getFacilitiesSelector = api.endpoints.getFacilities.select();

    const { data } = getFacilitiesSelector(state);

    if (data) {
      const facility = data.find((facility) => facility.facility.id === this.facilityId);

      if (facility) {
        this.facility = facility;
      }
    }
  }

  static styles = css`
    ${baseStyles}
  `;

  // Add a new method to handle the 'tab-selected' event
  handleTabSelected(e: CustomEvent) {
    console.log('Tab selected:', e.detail.index);
  }

  private _focusedTabIndex = 0;

  handleClick(e: MouseEvent, index: number) {
    this._focusedTabIndex = index;
  }

  handleKeyDown(e: KeyboardEvent) {
    if (this.shadowRoot) {
      const tabElements = Array.from(this.shadowRoot.querySelectorAll('[slot=tab]'));

      if (e.key === 'ArrowRight') {
        if (this._focusedTabIndex === tabElements.length - 1) {
          this._focusedTabIndex = 0;
        } else {
          this._focusedTabIndex = this._focusedTabIndex + 1;
        }
      } else if (e.key === 'ArrowLeft') {
        if (this._focusedTabIndex === 0) {
          this._focusedTabIndex = tabElements.length - 1;
        } else {
          this._focusedTabIndex = this._focusedTabIndex - 1;
        }
      } else if (e.key === 'Enter') {
        const cubbyTabs = this.shadowRoot.querySelector('cubby-tabs') as CubbyTabs;
        cubbyTabs.selectTab(this._focusedTabIndex);

        return;
      } else {
        return; // If none of the handled keys were pressed, do nothing
      }

      e.preventDefault(); // Prevent scrolling the page
      const newFocusedTab = tabElements[this._focusedTabIndex] as HTMLElement;
      newFocusedTab.focus();
    }
  }

  render() {
    return html`
      ${this.noHeader ? '' : html`<cubby-facility-header .facility="${this.facility}" />`}
      <cubby-tabs @keydown=${this.handleKeyDown} @tab-selected=${this.handleTabSelected}>
        ${repeat(
          this.facility.groups || [],
          (group) => group.name,
          (group, index) => html`
            <h2 slot="tab" @click=${(e: MouseEvent) => this.handleClick(e, index)}>
              ${group.name}
            </h2>
            <section slot="panel">
              ${repeat(
                group.pricingGroups || [],
                (pricingGroup) => pricingGroup.name,
                (pricingGroup) =>
                  html`<cubby-facility-pricing-group .pricingGroup=${pricingGroup} />`
              )}
            </section>
          `
        )}
      </cubby-tabs>
    `;
  }
}

console.log('customElements.get(cubby-facility)', customElements.get('cubby-facility'));

if (customElements.get('cubby-facility') === undefined) {
  customElements.define('cubby-facility', CubbyFacility);
}

export default CubbyFacility;
