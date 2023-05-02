/* eslint-disable max-len */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

import { dummyData } from '@components/CubbyFacility/dummy';
import { CubbyFacility } from '@types';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/todos/1', // 'http://localhost:8080/',
    headers: {
      Authorization: `Bearer ${STOREFRONT_KEY}`,
      'Content-Type': 'application/json',
      Referer: 'localhost'
    }
  }),
  endpoints: (builder) => ({
    getFacilities: builder.query<CubbyFacility[], void>({
      query: () => '', // 'marketing/v1/search'
      transformResponse: () => {
        return dummyData;
      }
    })
  }),
  reducerPath: 'api'
});
