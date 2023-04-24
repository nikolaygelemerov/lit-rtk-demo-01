/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace JSX {
  interface HTMLElementTagNameMap {
    'api-component': any;
    'counter-component': any;
    'posts-component': any;
    'update-counter-component': any;
  }
}

declare let STOREFRONT_KEY: string;

declare module '*.jpg' {
  const url: string;
  export default url;
}
