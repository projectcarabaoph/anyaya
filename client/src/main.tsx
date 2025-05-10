import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import './index.css'
import App from './App.tsx'
import { AuthProvider } from '@contexts/auth-context.tsx';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position='top-right' richColors duration={3000} />
      <App />
    </AuthProvider>
  </StrictMode>,
)


