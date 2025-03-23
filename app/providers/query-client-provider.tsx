'use client';

import {
  QueryClient,
  QueryClientProvider as QueryClientProviderInitial,
} from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProviderInitial client={client}>
      {children}
    </QueryClientProviderInitial>
  );
};
