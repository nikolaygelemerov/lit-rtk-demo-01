/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement } from 'lit';

const Initialized: Record<string, any> = {};

class LitElementExtended extends LitElement {
  initialized = false;

  data = null;
}

export const initialize = (data: { id: string; payload: any }) => {
  const element = document.getElementById(data.id) as LitElementExtended;

  if (element) {
    element.initialized = true;
    element.data = data.payload;
    element.requestUpdate(); // Cause LitElement to perform an update
  }
};

export const initializeProxy = new Proxy(Initialized, {
  set(target, prop: string, value: any) {
    // Merge the new value with the existing one instead of replacing it
    target[prop] = { ...(target[prop] || {}), ...value };

    // Assign the initialize function to the property if it doesn't exist yet
    if (!target[prop].initialize) {
      target[prop].initialize = initialize;
    }

    // If the data has been fetched and the component is connected, initialize the component.
    if (target[prop].isConnected && target[prop].data) {
      target[prop].initialize(target[prop].data);
    }

    return true;
  }
});
