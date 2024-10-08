import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import './i18n';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from './components/orther/error/ErrorBoundary.tsx';
import LoadingPage from './pages/LoadingPage/LoadingPage.tsx';
import { AuthProvider } from './context/auth/AuthContext.tsx';
import { TicketCatalogProvider } from './context/ticketCatalog/TicketCatalogContext.tsx';
import { TicketProvider } from './context/ticket/TicketContext.tsx';
import { LocationProvider } from './context/location/LocationContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingPage loading={true} />}>
        <ErrorBoundary>
          <AuthProvider>
            <TicketCatalogProvider>
            <TicketProvider>
              <LocationProvider>
                <ToastContainer />
                <App />
              </LocationProvider>
            </TicketProvider>
            </TicketCatalogProvider>
          </AuthProvider>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
