import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./Layout.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SignupPage from "./Component/Signup/Signup.jsx";
import SigninPage from "./Component/Signin/Signin.jsx";
import Dashboard from "./Component/Dashboard/Dashboard.jsx";
import Home from "./Component/Home/Home.jsx";
import NewResume from "./Component/NewResume/NewResume.jsx";
import ResumeBuilder from "./Component/ResumeDetails/ResumeDetails.jsx";
import Template from "./Component/Templates/Templates.jsx";
import ViewResume from "./my-resume/[resumeId]/view/index.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="" element={<Home />} />
      <Route path="/NewResume" element={<NewResume />} />
      <Route path="/ResumeData" element={<ResumeBuilder />} />
      <Route path="/templates" element={<Template />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/my-resume/:resumeId/view" element={<ViewResume />} />

    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
