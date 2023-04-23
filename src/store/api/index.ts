/* eslint-disable max-len */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

import { Post } from '@types';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    fetchPosts: builder.query<Post[], void>({
      query: () => 'posts'
    })
  }),
  reducerPath: 'api'
});
