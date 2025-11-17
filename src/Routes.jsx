import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProductDetail from './pages/product-detail';
import Registration from './pages/registration';
import LoginPage from './pages/login';
import Marketplace from './pages/marketplace';
import Dashboard from './pages/dashboard';
import Homepage from './pages/homepage';
import Messages from './pages/messages/Messages';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/messages" element={<Messages />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
