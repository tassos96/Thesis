import "../css/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { AppRoutes } from "../helpers/AppConstants";
import { UserContextProvider } from "../context/UserContext";
import Home from "../pages/Home/Home";
import NoPage from "../pages/NoPage/NoPage";
import LoginPage from "../pages/AccountPage/LoginPage/LoginPage";
import SignupPage from "../pages/AccountPage/SignupPage/SignupPage";
import LogOutPage from "../pages/AccountPage/LogoutPage/LogOutPage";
import AccountInfoPage from "../pages/AccountPage/AccountInfo/AccountInfoPage";
import CategoriesPage from "../pages/Repos/Categories/CategoriesPage";
import SubcategoriesPage from "../pages/Repos/Subcategories/Subcategories";
import QuestionsPage from "../pages/Repos/Questions/QuestionsPage";
import TestsPage from "../pages/Tests/TestsPage";
import TestInfoPage from "../pages/TestInfo/TestInfoPage";

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={AppRoutes.Home} element={<Home />} />
            <Route path={AppRoutes.Test} element={<TestsPage />} />
            <Route path={AppRoutes.TestInfo} element={<TestInfoPage />} />
            <Route path={AppRoutes.Categories} element={<CategoriesPage />} />
            <Route path={AppRoutes.Subcategories} element={<SubcategoriesPage />} />
            <Route path={AppRoutes.Questions} element={<QuestionsPage />} />
            <Route path={AppRoutes.Login} element={<LoginPage />} />
            <Route path={AppRoutes.Signup} element={<SignupPage />} />
            <Route path={AppRoutes.Logout} element={<LogOutPage />} />
            <Route path={AppRoutes.AccountInfo} element={<AccountInfoPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
