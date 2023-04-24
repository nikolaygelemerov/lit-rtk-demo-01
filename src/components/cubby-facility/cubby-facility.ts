import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { connect } from 'pwa-helpers';

import { store } from '@store';

import '../shared';
import './components';
import { CubbyFacility as CubbyFacilityType, Id } from './types';

// eslint-disable-next-line prettier/prettier
@customElement('cubby-facility')
class CubbyFacility extends connect(store)(LitElement) {
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
      font-family: var(--font-family-base);

      /* ********************************** */
      /* *********** color ************ */
      /* ********************************** */
      --cubby-color-text: rgb(60, 60, 60);
      --cubby-color-text-light: rgb(174, 174, 174);
      --cubby-color-text-lighter: rgb(255, 255, 255);

      /* ********************************** */
      /* *********** font-size ************ */
      /* ********************************** */
      --cubby-font-size-base: 16px;
      --cubby-font-size-xs: 0.625rem;
      --cubby-font-size-s: 0.75rem;
      --cubby-font-size-m: 0.875rem;
      --cubby-font-size-l: 1rem;
      --cubby-font-size-xl: 1.5rem;
      --cubby-font-size-xxl: 1.75rem;

      /* ********************************** */
      /* *********** font-family ************ */
      /* ********************************** */
      --font-family-base: arial, helvetica, sans-serif;

      /* ********************************** */
      /* *********** offset ************ */
      /* ********************************** */
      --offset-zero: 0;
      --offset-min: 1px;
      --offset-xs: 0.25rem;
      --offset-s: 0.375rem;
      --offset-m: 0.5rem;
      --offset-l: 0.75rem;
      --offset-xl: 1rem;
      --offset-xxl: 1.25rem;
      --offset-xxxl: 1.5rem;
      --offset-xxxxl: 2rem;

      /* ********************************** */
      /* *********** border-radius ************ */
      /* ********************************** */
      --border-radius: 0.25rem;

      /* ********************************** */
      /* *********** border-width ************ */
      /* ********************************** */
      --border-width: 1px;

      /* ********************************** */
      /* *********** box-shadow ************ */
      /* ********************************** */
      --box-shadow: rgb(0 0 0 / 35%) 0 5px 10px;
    }
  `;

  // Add a new method to handle the 'tab-selected' event
  handleTabSelected(e: CustomEvent) {
    console.log('Tab selected:', e.detail.index);
  }

  render() {
    return html`
      <cubby-facility-header .facility="${this.facility}"> </cubby-facility-header>
      <cubby-tabs @tab-selected=${this.handleTabSelected}>
        ${repeat(
          this.facility.groups || [],
          (group) => group.name,
          (group) => html`
            <h2 slot="tab">${group.name}</h2>
            <section slot="panel">Content for tab 1</section>
          `
        )}
      </cubby-tabs>
    `;
  }
}

export default CubbyFacility;
