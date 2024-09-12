import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// routes
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";

// layouts
import ProtectedLayout from "./Layouts/ProtectedLayout";
import PublicLayout from "./Layouts/PublicLayout";

// splash screen
import SplashScreen from "./Skeleton/SplashScreen";

// lazy loading components
const LoginPage = lazy(() => import("./pages/Auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/Auth/RegisterPage"));
const ChangePasswordPage = lazy(() =>
  import("./pages/Auth/ChangePasswordPage")
);
const CompleteRegistrationPage = lazy(() =>
  import("./pages/Auth/CompleteRegistrationPage")
);
const ResetPasswordPage = lazy(() => import("./pages/Auth/ResetPasswordPage"));
const ChatPage = lazy(() => import("./components/Messages/ChatPage"));
const PostsSection = lazy(() => import("./components/Profile/PostsSection"));
const SavedSection = lazy(() => import("./components/Profile/SavedSection"));
const TaggedSection = lazy(() => import("./components/Profile/TaggedSection"));
const BookmarksPage = lazy(() => import("./pages/BookmarksPage"));
const ExplorePage = lazy(() => import("./pages/ExplorePage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const MessagesPage = lazy(() => import("./pages/MessagesPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const PostDetails = lazy(() => import("./pages/PostDetails"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ReelsPage = lazy(() => import("./pages/ReelsPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const StartChat = lazy(() => import("./placeholders/Messages/StartChat"));

const App = () => {
  return (
    <Suspense fallback={<SplashScreen />}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/accounts/signup" element={<RegisterPage />} />
            <Route
              path="/accounts/complete-registration"
              element={<CompleteRegistrationPage />}
            />
            <Route
              path="/accounts/password/reset"
              element={<ResetPasswordPage />}
            />
            <Route
              path="/accounts/password/reset/confirm/:token"
              element={<ChangePasswordPage />}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route exact path="/search" element={<SearchPage />} />
            <Route exact path="/explore" element={<ExplorePage />} />
            <Route exact path="/reels" element={<ReelsPage />} />
            <Route exact path="/chats/" element={<MessagesPage />}>
              <Route index element={<StartChat />} />
              <Route path=":chatSlug" element={<ChatPage />} />
            </Route>
            <Route
              exact
              path="/notifications"
              element={<NotificationsPage />}
            />
            <Route exact path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/:username" element={<ProfilePage />}>
              <Route path="/:username/" element={<PostsSection />} />
              <Route path="/:username/saved" element={<SavedSection />} />
              <Route path="/:username/tagged" element={<TaggedSection />} />
            </Route>
            <Route path="/posts/:postSlug" element={<PostDetails />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
