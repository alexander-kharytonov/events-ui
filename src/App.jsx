import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { Layout } from "@/layouts";
import {
  AuthPage,
  CreateEventPage,
  EventDetailsPage,
  HomePage,
  NotFoundPage,
} from "@/pages";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
}

function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/" replace /> : children;
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="events/:eventId" element={<EventDetailsPage />} />
        <Route
          path="events/create"
          element={
            <ProtectedRoute>
              <CreateEventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="auth"
          element={
            <GuestRoute>
              <AuthPage />
            </GuestRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
