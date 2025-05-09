import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './config/theme.ts'
import { LocaleProvider } from './config/i18/LocaleProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocaleProvider>
            <App />
          </LocaleProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
