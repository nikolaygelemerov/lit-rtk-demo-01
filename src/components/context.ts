import { createContext } from '@lit-labs/context';

import { Context } from './types';

export const ApiContext = createContext<Context>(Symbol('API'));
