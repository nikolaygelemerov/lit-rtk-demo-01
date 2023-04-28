import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { fetchFacilities } from '@services';
import { baseStyles } from '@styles';

import CubbyTabs from '../shared/CubbyTabs/CubbyTabs';
import './components';
import { CubbyFacility as CubbyFacilityType, Id } from './types';

@customElement('cubby-facility')
class CubbyFacility extends LitElement {
  @property({ attribute: 'facility-id', type: Number }) facilityId: Id = 1;

  @state()
  facility = {} as CubbyFacilityType;

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
      <cubby-facility-header .facility="${this.facility}"> </cubby-facility-header>
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
                  html`<cubby-facility-pricing-group
                    .pricingGroup=${pricingGroup}
                  ></cubby-facility-pricing-group>`
              )}
            </section>
          `
        )}
      </cubby-tabs>
    `;
  }
}

export default CubbyFacility;
