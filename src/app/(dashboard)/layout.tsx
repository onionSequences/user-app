'use client';

import { Provider } from 'react-redux';
import store from 'lib/redux/store';

import { Header } from 'components/Header';
import 'styles/globals.scss';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="User app" />
        <title>User app</title>
      </head>
      <body>
        <Provider store={store}>
          <div id="root">
            <Header />
            <main>{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
