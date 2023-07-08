import { MessageInstance } from "antd/es/message/interface";

export const AppRoutes = {
    Home: "home",
    Products: "products",
    FavoriteProducts: "favorite-products",
    HistoryProducts: "history-products",
    Cart: "cart",
    AccountInfo: "account-info",
    Login: "login",
    Signup: "signup",
    Logout: "logout",
    CompleteOrder: "complete-order"
}

export const GoogleApiKey = "AIzaSyDvsZeg-SYJ5brphnTl1w_Zi9H994uT-w0";
export const PublicUrl = process.env.PUBLIC_URL;
export const ImagesUrl = process.env.PUBLIC_URL + "/images/";

export const showErrorMessage = (messageApi:MessageInstance, message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

