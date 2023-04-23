/* eslint-disable max-len */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Post } from '@types';

// Define a TypeScript type for a response containing an array of Post objects
type PostsResponse = Post[];

// Create an API object using the `createApi` function from `@reduxjs/toolkit/query`
export const api = createApi({
  // Use `fetchBaseQuery` from `@reduxjs/toolkit/query` as the base query function,
  // with a base URL of `/`
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),

  // Define several endpoints for the API using the `build` function provided
  // by `createApi`
  endpoints: (build) => ({
    // Define an endpoint for adding a new Post object to the API
    addPost: build.mutation<Post, Partial<Post>>({
      // Invalidate any cached queries that return an array of Post objects,
      // since the addition of a new Post object could change the results of
      // those queries
      invalidatesTags: [{ id: 'LIST', type: 'Post' }],

      // Use an HTTP POST request to add the new Post object to the API
      query: (body) => ({
        body,
        method: 'POST',
        url: `posts`
      })
    }),

    // Define an endpoint for deleting a Post object from the API
    deletePost: build.mutation<{ id: number; success: boolean }, Post>({
      // Invalidate any cached queries that return a single Post object with
      // the same ID as the one being deleted
      invalidatesTags: (result, error, post) => [{ id: post.id, type: 'Post' }],

      // Use an HTTP DELETE request to delete the Post object from the API
      query(post) {
        return {
          method: 'DELETE',
          url: `posts/${post.id}`
        };
      }
    }),

    // Define an endpoint for retrieving a single Post object from the API
    getPost: build.query<Post, Post>({
      // Provide a cache tag for the returned Post object with the same ID
      // as the one being retrieved
      providesTags: (result, error, post) => [{ id: post.id, type: 'Post' }],

      // Use an HTTP GET request to retrieve the Post object from the API
      query: (post) => `posts/${post.id}`
    }),

    // Define an endpoint for retrieving an array of Post objects from the API
    getPosts: build.query<PostsResponse, void>({
      // Provide cache tags for each of the returned Post objects, as well as
      // a cache tag for the entire array of Post objects
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ id, type: 'Post' as const })),
              { id: 'LIST', type: 'Post' }
            ]
          : [{ id: 'LIST', type: 'Post' }],
      // Use an HTTP GET request to retrieve the array of Post objects from the API
      query: () => 'posts'
    }),

    // Define an endpoint for updating an existing Post object in the API
    updatePost: build.mutation<void, Pick<Post, 'id'> & Partial<Post>>({
      // Invalidate any cached queries that return a single Post object with
      // the same ID as the one being updated
      invalidatesTags: (result, error, { id }) => [
        { id, type: 'Post' },
        { id: 'LIST', type: 'Post' }
      ],

      // Define an async callback function that will be called when the mutation starts
      // and receives two arguments: the mutation arguments and a context object
      async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
        const { id, ...patch } = newPost;

        // Use the `updateQueryData` utility function to update the cache for the `getPost` query
        // The `draft` object is a mutable copy of the current query result data
        const patchResult = dispatch(
          api.util.updateQueryData('getPost', newPost as Post, (draft) => {
            // Use the `Object.assign` function to apply the changes in the `patch` argument
            // to the mutable `draft` copy of the post object
            Object.assign(draft, patch);
          })
        );
        try {
          // Wait for the mutation to complete
          await queryFulfilled;
        } catch {
          // If the mutation fails, undo the cache update using the `patchResult` object
          patchResult.undo();
        }
      },

      // Define a function that returns the HTTP request configuration for the mutation
      query: ({ id, ...patch }) => ({
        body: patch,
        method: 'PUT',
        url: `posts/${id}`
      })
    })
  }),

  // Keep unused data for 5 seconds
  // After last subscription unsubscribes
  keepUnusedDataFor: 5000,
  // Refetch data on mount or when args change
  // Update stale data
  refetchOnMountOrArgChange: 5000,
  // Use the Post tag type
  tagTypes: ['Post']
});

export const {
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useUpdatePostMutation
} = api;
