import { css } from 'lit';

export const baseStyles = css`
  :host {
    font-size: var(--cubby-font-size, 16px);
    font-family: var(--cubby-font-family, arial, helvetica, sans-serif);

    /* ********************************** */
    /* *********** color ************ */
    /* ********************************** */
    --color-text: var(--cubby-color-text, rgb(60, 60, 60));
    --color-text-light: var(--cubby-color-text-light, rgb(180, 180, 180));
    --color-text-lighter: var(--cubby-color-text-lighter, rgb(215, 215, 215));
    --color-text-lightest: var(--cubby-color-text-lightest, rgb(255, 255, 255));

    --color-bkg: var(--cubby-color-bkg, rgb(60, 60, 60));
    --color-bkg-light: var(--cubby-color-bkg-light, rgb(180, 180, 180));
    --color-bkg-lighter: var(--cubby-color-bkg-lighter, rgb(215, 215, 215));
    --color-bkg-lightest: var(--cubby-color-bkg-lightest, rgb(255, 255, 255));

    --color-border: var(--cubby-color-border, rgb(60, 60, 60));
    --color-border-light: var(--cubby-color-border-light, rgb(180, 180, 180));
    --color-border-lighter: var(--cubby-color-border-lighter, rgb(215, 215, 215));
    --color-border-lightest: var(--cubby-color-border-lightest, rgb(255, 255, 255));

    --color-warn: var(--cubby-color-warn, rgb(214, 99, 100));

    /* ********************************** */
    /* *********** font-size ************ */
    /* ********************************** */
    --font-size-base: var(--cubby-font-size-base, 16px);
    --font-size-xs: var(--cubby-font-size-xs, 0.625rem); /* 10px */
    --font-size-s: var(--cubby-font-size-s, 0.75rem); /* 12px */
    --font-size-m: var(--cubby-font-size-m, 0.875rem); /* 14px */
    --font-size-l: var(--cubby-font-size-l, 1rem); /* 16px */
    --font-size-xl: var(--cubby-font-size-xl, 1.5rem); /* 24px */
    --font-size-xxl: var(--cubby-font-size-xxl, 1.75rem); /* 28px */

    /* ********************************** */
    /* *********** offset ************ */
    /* ********************************** */
    --offset-min: var(--cubby-offset-min, 1px);
    --offset-xs: var(--cubby-offset-xs, 0.25rem); /* 4px */
    --offset-s: var(--cubby-offset-s, 0.375rem); /* 6px */
    --offset-m: var(--cubby-offset-m, 0.5rem); /* 8px */
    --offset-l: var(--cubby-offset-l, 0.75rem); /* 12px */
    --offset-xl: var(--cubby-offset-xl, 1rem); /* 16px */
    --offset-xxl: var(--cubby-offset-xxl, 1.25rem); /* 20px */
    --offset-xxxl: var(--cubby-offset-xxxl, 1.5rem); /* 24px */
    --offset-xxxxl: var(--cubby-offset-xxxxl, 2rem); /* 32px */

    /* ********************************** */
    /* *********** border-radius ************ */
    /* ********************************** */
    --border-radius: var(--cubby-border-radius, 0.25rem);

    /* ********************************** */
    /* *********** border-width ************ */
    /* ********************************** */
    --border-width: var(--cubby-border-width, 1px);
    --border-width-bold: var(--cubby-border-width-bold, 2px);

    /* ********************************** */
    /* *********** box-shadow ************ */
    /* ********************************** */
    --box-shadow: var(--cubby-box-shadow, rgb(0 0 0 / 35%) 0 5px 10px);
    --box-shadow-light: var(--cubby-box-shadow-light, rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px);

    /* ********************************** */
    /* *********** transition-time ************ */
    /* ********************************** */
    --transition-time: var(--cubby-transition-time, 300ms);
  }
`;
