/* eslint-disable max-len */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement } from 'lit';

const Initialized: Record<string, any> = {};

class LitElementExtended extends LitElement {
  initialized = false;

  data = null;
}

export const initialize = (data: { id: string; payload: any }) => {
  const element = document.getElementById(data.id) as LitElementExtended;

  console.log('Data initialize: ', data);

  if (element) {
    element.initialized = true;
    element.data = data.payload;
    element.requestUpdate(); // Cause LitElement to perform an update
  }
};

export const initializeProxy = new Proxy(Initialized, {
  // prop refers to the id of the component
  set(target, id: string, value: any) {
    // Merge the new value with the existing one instead of replacing it
    target[id] = { ...(target[id] || {}), ...value };

    // Assign the initialize function to the property if it doesn't exist yet
    if (!target[id].initialize) {
      target[id].initialize = initialize;
    }

    // Check if the data has been fetched and the component is connected, if so, initialize the component.
    const isConnected = Boolean(target[id].isConnected || document.getElementById(id));

    if (isConnected && target[id].data) {
      target[id].initialize(target[id].data);
    }

    return true;
  }
});
