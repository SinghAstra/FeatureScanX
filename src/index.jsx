import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import FeedSection from "./components/Profile/FeedSection.jsx";
import PostsSection from "./components/Profile/PostsSection.jsx";
import SavedSection from "./components/Profile/SavedSection.jsx";
import TaggedSection from "./components/Profile/TaggedSection.jsx";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import AppProvider from "./context/AppProvider.jsx";
import "./index.css";
import ProtectedLayout from "./Layouts/ProtectedLayout.jsx";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import BookmarksPage from "./pages/BookmarksPage.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import HomePage from "./pages/HomePage";
import MessagesPage from "./pages/MessagesPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import PageNotFound from "./pages/PageNotFound";
import ProfilePage from "./pages/ProfilePage";
import ReelsPage from "./pages/ReelsPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/accounts/signup" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route exact path="/search" element={<SearchPage />} />
          <Route exact path="/explore" element={<ExplorePage />} />
          <Route exact path="/reels" element={<ReelsPage />} />
          <Route exact path="/messages" element={<MessagesPage />} />
          <Route exact path="/notifications" element={<NotificationsPage />} />
          <Route exact path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/:username" element={<ProfilePage />}>
            <Route path="/:username/" element={<PostsSection />} />
            <Route path="/:username/feed" element={<FeedSection />} />
            <Route path="/:username/saved" element={<SavedSection />} />
            <Route path="/:username/tagged" element={<TaggedSection />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
