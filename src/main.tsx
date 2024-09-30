import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import './i18n';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from './components/orther/error/ErrorBoundary.tsx';
import LoadingPage from './pages/LoadingPage/LoadingPage.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/storage/store.ts';
import { AuthProvider } from './context/AuthContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PersistGate loading={<LoadingPage loading={true} />} persistor={persistor}>
      <BrowserRouter>
        <Suspense fallback={<LoadingPage loading={true} />}>
          <ErrorBoundary>
            <AuthProvider>
              {' '}
              {/* Bao bọc toàn bộ App với AuthProvider */}
              <ToastContainer />
              <App />
            </AuthProvider>
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </PersistGate>
  </React.StrictMode>
);
