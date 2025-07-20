import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CityWeatherView from "./pages/CityWeatherView";
import LoadingSpinner from "./components/LoadingSpinner";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }
  return children;
}

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect: login,
    logout: auth0Logout,
    user,
  } = useAuth0();

  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/city/:cityId"
          element={
            <ProtectedRoute>
              <CityWeatherView />
            </ProtectedRoute>
          }
        />
        {/* fallback: redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

