import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Exam from '../pages/Exam';
import Result from '../pages/Result';
import Reports from '../pages/Reports';
import Leaderboard from '../pages/Leaderboard';
import AdminDashboard from '../pages/AdminDashboard';
import MyProfile from '../pages/MyProfile';
import Settings from '../pages/Settings';
import About from '../pages/About';
import Features from '../pages/Features';
import HowItWorks from '../pages/HowItWorks';
import Pricing from '../pages/Pricing';
import Contact from '../pages/Contact';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';
// import Institutions from '../pages/Institutions';
// import News from '../pages/News';
// import About from '../pages/About';

export default function AppRoutes() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/result" element={<Result />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/exam"
  element={
    <ProtectedRoute>
      <Exam />
    </ProtectedRoute>
  }
/>

<Route
  path="/result"
  element={
    <ProtectedRoute>
      <Result />
    </ProtectedRoute>
  }
/>

<Route
  path="/reports"
  element={
    <ProtectedRoute>
      <Reports />
    </ProtectedRoute>
  }
/>

<Route
  path="/leaderboard"
  element={
    <ProtectedRoute>
      <Leaderboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <MyProfile />
    </ProtectedRoute>
  }
/>

<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>
{/* <Route
  path="/institutions"
  element={
    <ProtectedRoute>
      <Institutions />
    </ProtectedRoute>
  }
/>

<Route
  path="/news"
  element={
    <ProtectedRoute>
      <News />
    </ProtectedRoute>
  }
/>

<Route
  path="/about"
  element={
    <ProtectedRoute>
      <About />
    </ProtectedRoute>
  }
/> */}


        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Footer />
    </Router>
  );
}
