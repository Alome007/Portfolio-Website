import { configure, addParameters, addDecorator } from '@storybook/react';
import { themes } from '@storybook/theming';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/utils/Theme';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import GothamBook from '../src/fonts/gotham-book.woff2';
import GothamMedium from '../src/fonts/gotham-medium.woff2';
import { fontStyles, GlobalStyles, AppContext } from '../src/app/App';
const activeTheme = themes.dark;

addParameters({
  options: {
    theme: activeTheme,
  },
});

addDecorator((story) => (
  <HelmetProvider>
    <ThemeProvider theme={activeTheme}>
      <AppContext.Provider value={{ currentTheme: activeTheme }}>
        <Helmet>
          <link rel="preload" href={GothamBook} as="font" crossorigin="crossorigin" />
          <link rel="preload" href={GothamMedium} as="font" crossorigin="crossorigin" />
          <style>{fontStyles}</style>
        </Helmet>
        <GlobalStyles />
        {story()}
      </AppContext.Provider>
    </ThemeProvider>
  </HelmetProvider>
))

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);