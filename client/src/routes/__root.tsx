import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@emotion/react';
import theme from '../lib/theme/theme';

export const Route = createRootRoute({
  component: RootComponent,
})

const queryClient = new QueryClient();

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}


function RootComponent() {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </React.Fragment>
    </ThemeProvider>

  )
}
