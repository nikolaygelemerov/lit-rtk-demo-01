import { css } from 'lit';

export const baseStyles = css`
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

    --cubby-color-bkg: rgb(60, 60, 60);
    --cubby-color-bkg-light: rgb(180, 180, 180);
    --cubby-color-bkg-lighter: rgb(215, 215, 215);
    --cubby-color-bkg-lightest: rgb(255, 255, 255);

    --cubby-color-border: rgb(60, 60, 60);
    --cubby-color-border-light: rgb(180, 180, 180);
    --cubby-color-border-lighter: rgb(215, 215, 215);
    --cubby-color-border-lightest: rgb(255, 255, 255);

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
    --cubby-box-shadow-light: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;

    /* ********************************** */
    /* *********** transition-time ************ */
    /* ********************************** */
    --cubby-transition-time: 300ms;
  }
`;
