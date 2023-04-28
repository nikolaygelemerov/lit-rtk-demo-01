import { api } from '../api';
import { Facilities } from '../slices';

export interface RootState {
  facilities: Facilities;
  [api.reducerPath]: ReturnType<typeof api.reducer>;
}
