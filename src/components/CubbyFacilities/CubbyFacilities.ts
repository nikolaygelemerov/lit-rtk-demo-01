import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { connect } from 'pwa-helpers';

import { api, FacilitiesSelected, RootState, store } from '@store';
import { baseStyles } from '@styles';
import { CubbyFacility } from '@types';

@customElement('cubby-facilities')
class CubbyFacilities extends connect(store)(LitElement) {
  @state()
  facilities: CubbyFacility[] = [];

  @state()
  selected: FacilitiesSelected = {};

  firstUpdated() {
    store.dispatch(api.endpoints.getFacilities.initiate());
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
    return html`
      ${repeat(
        this.facilities || [],
        (facility) => facility.facility.id,
        (facility) =>
          html`${this.selected[facility.facility.id]
            ? html`<cubby-facility facility-id="${facility.facility.id}"></cubby-facility>`
            : ''}`
      )}
    `;
  }
}

export default CubbyFacilities;
