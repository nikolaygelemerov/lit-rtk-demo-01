import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';

import { api, store } from '@store';
import { Post, RootState } from '@types';

import './components';

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
      grid-template-columns: repeat(5, 1fr);
      grid-auto-rows: auto;
      gap: var(--offset-l);
      padding: var(--offset-l);
      color: var(--color-bkg-button);
    }

    @media (max-width: 1526px) {
      .posts {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    @media (max-width: 1256px) {
      .posts {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 950px) {
      .posts {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 628px) {
      .posts {
        grid-template-columns: 1fr;
      }
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
        ${this.posts.data?.map((post) => html`<post-component .post=${post}></post-component>`)}
      </div>
    `;
  }
}

export default PostsComponent;
