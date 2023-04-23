import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';

import { api, store } from '@store';
import { Post, RootState } from '@types';

// eslint-disable-next-line prettier/prettier
@customElement('posts-component')
class PostsComponent extends connect(store)(LitElement) {
  @state()
  posts: { data?: Post[]; error: unknown; isLoading: boolean } = {
    data: [],
    error: null,
    isLoading: false
  };

  static styles = css`
    .posts {
      display: grid;
      grid-template-columns: repeat(5, minmax(20rem, 1fr));
      gap: var(--offset-l);
      width: 100%;
      padding: var(--offset-l);
      color: var(--color-bkg-button);
      border: var(--border-width) solid var(--border-width);
    }
  `;

  stateChanged(state: RootState) {
    const fetchPostsSelector = api.endpoints.fetchPosts.select();

    const { data, error, isLoading } = fetchPostsSelector(state);

    this.posts = { data, error, isLoading };
  }

  render() {
    return html`
      <div class="posts">
        <p>${JSON.stringify(this.posts.data)}</p>
      </div>
    `;
  }
}

export default PostsComponent;
