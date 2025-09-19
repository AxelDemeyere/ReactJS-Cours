import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import { LoginPage } from "./pages/LoginPage/LoginPage.tsx";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage.tsx";
import { ProtectedRoute } from "./auth/ProtectedRoute.tsx";
import { NotesListPage } from "./pages/NotesListPage/NotesListPage.tsx";
import { NoteFormPage } from "./pages/NoteFormPage/NoteFormPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
          <BrowserRouter>
              <Routes>
                  {/* Public */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  {/* Protégé: layout + sous-routes */}
                  <Route element={<ProtectedRoute><App /></ProtectedRoute>}>
                      <Route path="/" element={<Navigate to="/notes" replace />} />
                      <Route path="/notes" element={<NotesListPage />} />
                      <Route path="/notes/new" element={<NoteFormPage />} />
                      <Route path="/notes/:id" element={<NoteFormPage />} />
                  </Route>

                  {/* 404 */}
                  <Route path="*" element={<NotFoundPage />} />
              </Routes>
          </BrowserRouter>
      </AuthProvider>
  </StrictMode>,
)
