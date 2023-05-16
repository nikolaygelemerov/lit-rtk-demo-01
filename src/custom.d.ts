/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace JSX {
  interface HTMLElementTagNameMap {
    'api-component': any;
    'counter-component': any;
    'posts-component': any;
    'update-counter-component': any;
  }
}

declare module '*.jpg' {
  const url: string;
  export default url;
}

declare const STOREFRONT_KEY: string;

declare const STOREFRONT_STYLES: any;

declare let STOREFRONT: any;

declare module '../styles.js' {
  const styles: any;
  export default styles;
}

declare module 'cubby-config' {
  const styles: any;
  export default styles;
}
