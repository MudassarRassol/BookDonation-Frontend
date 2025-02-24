import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './Redux/store.js'
import {Provider} from 'react-redux';
import { Theme } from '@radix-ui/themes/dist/cjs/index.js'
import "@radix-ui/themes/styles.css";
import './app.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Theme>
        <App />
      </Theme>
    </Provider>
  </StrictMode>,
)
