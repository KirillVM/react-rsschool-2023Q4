import { default as AbortController } from "abort-controller";
import { default as fetch } from "node-fetch";
import { Headers, Request, Response } from "node-fetch";
import RootLayout from '@src/layouts/root-layout'
import '@src/styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from "@src/app/store/store";
import ErrorBoundary from "@src/components/error-boundary/error-boundary";

Object.assign(globalThis, {
  fetch,
  Headers,
  Request,
  Response,
  AbortController,
});

export function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
        <RootLayout>
          <Component {...pageProps} />
      </RootLayout>
    </ErrorBoundary>

  )
}

export default wrapper.withRedux(App);
