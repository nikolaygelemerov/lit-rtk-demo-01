import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';

import { store } from '@store';
import { Post } from '@types';

// eslint-disable-next-line prettier/prettier
@customElement('post-component')
class PostComponent extends connect(store)(LitElement) {
  @property()
  post = {} as Post;

  static styles = css`
    .post {
      display: flex;
      flex-direction: column;
      gap: var(--offset-l);
      justify-content: space-between;
      box-sizing: border-box;
      height: 100%;
      padding: calc(var(--offset-l) * 2);
      border: var(--border-width) solid var(--color-border);
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
    }

    .post h1 {
      color: var(--color-text);
      text-transform: capitalize;
    }

    .post p {
      color: var(--color-text);
    }
  `;

  render() {
    return html`
      <div class="post">
        <h1>${this.post.title}</h1>
        <p>${this.post.body}</p>
      </div>
    `;
  }
}

export default PostComponent;
