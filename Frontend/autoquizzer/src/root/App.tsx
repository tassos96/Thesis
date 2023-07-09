import React from "react";
import "../css/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
// import Home from "../pages/Home/MainPage/Home";
// import NoPage from "../pages/NoPage/MainPage/NoPage";
// import Products from "../pages/Products/MainPage/Products";
// import FavoriteOrderPage from "../pages/Orders/FavoriteOrder/FavoriteOrderPage";
// import HistoryOrderPage from "../pages/Orders/HistoryOrder/HistoryOrderPage";
// import Cart from "../pages/Cart/MainPage/Cart";
// import AccountInfoPage from "../pages/AccountPage/AccountInfo/AccountInfoPage";
// import LoginPage from "../pages/AccountPage/LoginPage/LoginPage";
// import SignupPage from "../pages/AccountPage/SignUpPage/SignupPage";
import { AppRoutes } from "../helpers/AppConstants";
// import { ShoppingCartProvider } from "../context/ShoppingCartContext";
import { UserContextProvider } from "../context/UserContext";
import Home from "../pages/Home/Home";
import NoPage from "../pages/NoPage/NoPage";
import LoginPage from "../pages/AccountPage/LoginPage/LoginPage";
import SignupPage from "../pages/AccountPage/SignupPage/SignupPage";
import LogOutPage from "../pages/AccountPage/LogoutPage/LogOutPage";
import AccountInfoPage from "../pages/AccountPage/AccountInfo/AccountInfoPage";
// import LogOutPage from "../pages/LogoutPage/LogOutPage";
// import CompleteOrderPage from "../pages/Cart/CompleteOrderPage";

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={AppRoutes.Home} element={<Home />} />
            {/* <Route path={AppRoutes.Products} element={<Products />} /> */}
            {/* <Route path={AppRoutes.FavoriteProducts} element={<FavoriteOrderPage />} /> */}
              {/* <Route path={AppRoutes.HistoryProducts} element={<HistoryOrderPage />} /> */}
              {/* <Route path={AppRoutes.Cart} element={<Cart />} /> */}
              
              <Route path={AppRoutes.Login} element={<LoginPage />} />
              <Route path={AppRoutes.Signup} element={<SignupPage />} />
              <Route path={AppRoutes.Logout} element={<LogOutPage />} />
              <Route path={AppRoutes.AccountInfo} element={<AccountInfoPage />} />
              {/* <Route path={AppRoutes.CompleteOrder} element={<CompleteOrderPage />} /> */}
              <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
