/* eslint-disable max-len */
import { css, html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

class CubbyTabs extends LitElement {
  static styles = css`
    nav {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    nav > ::slotted([slot='tab']) {
      flex: 1 1 auto;
      padding: var(--offset-xl) var(--offset-xxxxl);
      color: var(--color-text-light);
      border-bottom: var(--border-width) solid var(--color-text-light);
      font-size: var(--font-size-xl);
      text-align: center;
      cursor: pointer;
    }

    nav > ::slotted([slot='tab'][selected]) {
      color: var(--color-text);
      border-bottom: var(--border-width-bold) solid var(--color-text);
    }

    ::slotted([slot='panel']) {
      display: none;
    }

    ::slotted([slot='panel'][selected]) {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: var(--offset-xxxxl);
      padding: var(--offset-xl);
    }

    .nav-container {
      container-type: inline-size;
    }

    .panel-container {
      container-type: inline-size;
    }

    @container (max-width: 1380px) {
      ::slotted([slot='panel'][selected]) {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    @container (max-width: 1040px) {
      ::slotted([slot='panel'][selected]) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @container (max-width: 800px) {
      ::slotted([slot='panel'][selected]) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @container (max-width: 600px) {
      nav {
        grid-template-columns: 1fr;
      }

      ::slotted([slot='panel'][selected]) {
        grid-template-columns: 1fr;
      }
    }
  `;

  @property()
  _tabs = [] as Element[];

  @property()
  _panels = [] as Element[];

  firstUpdated() {
    if (this.shadowRoot) {
      // Attach slotchange event listeners
      this.shadowRoot.querySelector('slot[name="tab"]')?.addEventListener('slotchange', () => {
        this._tabs = Array.from(this.querySelectorAll('[slot=tab]'));
        this.selectTab(0);
      });

      this.shadowRoot.querySelector('slot[name="panel"]')?.addEventListener('slotchange', () => {
        this._panels = Array.from(this.querySelectorAll('[slot=panel]'));
      });
    }
  }

  selectTab(tabIndex: number) {
    this._tabs.forEach((tab) => tab.removeAttribute('selected'));
    this._tabs[tabIndex]?.setAttribute('selected', '');
    this._panels.forEach((panel) => panel.removeAttribute('selected'));
    this._panels[tabIndex]?.setAttribute('selected', '');
  }

  handleSelect(e: { target: Element }) {
    const index = this._tabs.indexOf(e.target);
    this.selectTab(index);

    // Emit a custom event with the selected tab index
    const event = new CustomEvent('tab-selected', { detail: { index } });
    this.dispatchEvent(event);
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('_tabs') || changedProperties.has('_panels')) {
      this._tabs.forEach((tab, index) => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-controls', `panel-${index}`);
        tab.setAttribute('id', `tab-${index}`);
        tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
      });

      this._panels.forEach((panel, index) => {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', `tab-${index}`);
        panel.setAttribute('id', `panel-${index}`);
      });

      this.selectTab(0);
    }
  }

  render() {
    return html`
      <div class="nav-container">
        <nav>
          <slot name="tab" @click=${(e: { target: Element }) => this.handleSelect(e)}></slot>
        </nav>
      </div>
      <div class="panel-container">
        <slot name="panel"></slot>
      </div>
    `;
  }
}

console.log('customElements.get(cubby-tabs)', customElements.get('cubby-tabs'));

if (customElements.get('cubby-tabs') === undefined) {
  customElements.define('cubby-tabs', CubbyTabs);
}

export default CubbyTabs;
