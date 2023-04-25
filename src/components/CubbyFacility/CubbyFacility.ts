import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import '../shared';
import CubbyTabs from '../shared/CubbyTabs/CubbyTabs';
import './components';
import { CubbyFacility as CubbyFacilityType, Id } from './types';

// eslint-disable-next-line prettier/prettier
@customElement('cubby-facility')
class CubbyFacility extends LitElement {
  @property()
  facilityId = 1 as Id;

  @state()
  facility = {} as CubbyFacilityType;

  async firstUpdated() {
    const referer = 'localhost';
    const bearerToken = STOREFRONT_KEY;

    try {
      // eslint-disable-next-line compat/compat
      const response = await fetch('http://localhost:8080/marketing/v1/search', {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
          Referer: referer
        },
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as CubbyFacilityType[];
      const facility = data.find((facility) => facility.facility.id === this.facilityId);

      if (facility) {
        this.facility = facility;
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  static styles = css`
    :host {
      font-size: 16px;
      font-family: var(--cubby-font-family-base);

      /* ********************************** */
      /* *********** color ************ */
      /* ********************************** */
      --cubby-color-text: rgb(60, 60, 60);
      --cubby-color-text-light: rgb(180, 180, 180);
      --cubby-color-text-lighter: rgb(215, 215, 215);
      --cubby-color-text-lightest: rgb(255, 255, 255);

      --cubby-color-warn: rgb(214, 99, 100);

      /* ********************************** */
      /* *********** font-size ************ */
      /* ********************************** */
      --cubby-font-size-base: 16px;
      --cubby-font-size-xs: 0.625rem; /* 10px */
      --cubby-font-size-s: 0.75rem; /* 12px */
      --cubby-font-size-m: 0.875rem; /* 14px */
      --cubby-font-size-l: 1rem; /* 16px */
      --cubby-font-size-xl: 1.5rem; /* 24px */
      --cubby-font-size-xxl: 1.75rem; /* 28px */

      /* ********************************** */
      /* *********** font-family ************ */
      /* ********************************** */
      --cubby-font-family-base: arial, helvetica, sans-serif;

      /* ********************************** */
      /* *********** offset ************ */
      /* ********************************** */
      --cubby-offset-zero: 0;
      --cubby-offset-min: 1px;
      --cubby-offset-xs: 0.25rem; /* 4px */
      --cubby-offset-s: 0.375rem; /* 6px */
      --cubby-offset-m: 0.5rem; /* 8px */
      --cubby-offset-l: 0.75rem; /* 12px */
      --cubby-offset-xl: 1rem; /* 16px */
      --cubby-offset-xxl: 1.25rem; /* 20px */
      --cubby-offset-xxxl: 1.5rem; /* 24px */
      --cubby-offset-xxxxl: 2rem; /* 32px */

      /* ********************************** */
      /* *********** border-radius ************ */
      /* ********************************** */
      --cubby-border-radius: 0.25rem;

      /* ********************************** */
      /* *********** border-width ************ */
      /* ********************************** */
      --cubby-border-width: 1px;
      --cubby-border-width-bold: 2px;

      /* ********************************** */
      /* *********** box-shadow ************ */
      /* ********************************** */
      --cubby-box-shadow: rgb(0 0 0 / 35%) 0 5px 10px;
    }
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
