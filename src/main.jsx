import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { router } from './router';
import { RouterProvider } from 'react-router-dom';

import './index.css'
import { CssBaseline } from '@mui/material';

import ApiProvider from './context/ContextApi';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CssBaseline/>
    <ApiProvider>
        <RouterProvider router={router}/>
    </ApiProvider>  
  </StrictMode>,
)
