import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { connect } from 'pwa-helpers';

import { api, RootState, SelectedFacilitiesMap, store } from '@store';
import { CubbyFacility } from '@types';

@customElement('cubby-facilities')
class CubbyFacilities extends connect(store)(LitElement) {
  @state()
  facilities: CubbyFacility[] = [];

  @state()
  selectedMap: SelectedFacilitiesMap = {};

  firstUpdated() {
    store.dispatch(api.endpoints.getFacilities.initiate());
  }

  stateChanged(state: RootState) {
    this.selectedMap = state.facilities.selectedMap;

    const getFacilitiesSelector = api.endpoints.getFacilities.select();

    const { data } = getFacilitiesSelector(state);

    if (data) {
      this.facilities = data;
    }
  }

  render() {
    return html`
      <div>
        ${repeat(
          this.facilities || [],
          (facility) => facility.facility.id,
          (facility) =>
            html`${this.selectedMap[facility.facility.id]
              ? html`<cubby-facility facility-id="${facility.facility.id}"></cubby-facility>`
              : ''}`
        )}
      </div>
    `;
  }
}

export default CubbyFacilities;
