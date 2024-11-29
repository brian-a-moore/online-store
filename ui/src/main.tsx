import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ModalProvider } from './context/ModalContext';
import { ToastProvider } from './context/ToastContext';
import './styles/animations.css';
import './styles/globals.css';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <ModalProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ModalProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
);
