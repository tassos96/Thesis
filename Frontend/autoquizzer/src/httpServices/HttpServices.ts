import axios from "axios";
import { getUserTokenFromLocalStorage } from "../context/UserContext";
// import { ICategoryFilterDTO } from "../DTO/ICategoryFilterDTO";
// import { IProductsPageResponseDTO } from "../DTO/IProductsPageResponseDTO";
// import { IRequestProductPage } from "../DTO/IRequestProductPage";
// import { IUserDTO } from "../DTO/IUserDTO";
// import { IUserRequestDTO } from "../DTO/IUserRequestDTO";
import Appsettings from "../helpers/AppSettings";
import { IUserSignupDTO } from "../DTO/SignupPage/IUserSignupDTO";
import { IUserLoginRequestDTO } from "../DTO/LoginPage/IUserLoginRequestDTO";
import { IUserDTO } from "../DTO/IUserDTO";
// import Geocode from "react-geocode";
// import { IUserSignupDTO } from "../DTO/IUserSignupDTO";
// import { IOrderPricingInfoResponseDTO } from "../DTO/OrderPricingResponse/IOrderPricingInfoResponseDTO";
// import { IAddressDTO } from "../DTO/IAddressDTO";
// import { IPaymentMethodDTO } from "../DTO/IPaymentMethodDTO";
// import { IDeliveryMethodDTO } from "../DTO/IDeliveryMethodDTO";
// import { IHistoryOrderDTO } from "../DTO/IHistoryOrderDTO";
// import { IRequestOrderProductsPage } from "../DTO/IRequestOrderProductsPage";
// import { IProductDTO } from "../DTO/IProductDTO";
// import { IOrderDTO } from "../DTO/IOrder";
// import { IBrandDTO } from "../DTO/IBrandDTO";
// import { IAccountInfoDTO } from "../DTO/IAccountInfoDTO";
// import { IOrderPricingRequestDTO } from "../DTO/IOrderPricingRequestDTO";

// Geocode.setApiKey("AIzaSyDvsZeg-SYJ5brphnTl1w_Zi9H994uT-w0");
// Geocode.setLanguage("gr");
// Geocode.setRegion("gr");
// Geocode.setLocationType("ROOFTOP");
// Geocode.enableDebug();

const authorizationHeader = () => {
  const userToken = getUserTokenFromLocalStorage();
  return { Authorization: userToken };
};

export const signUpUser = async (body: IUserSignupDTO) => {
  console.log(Appsettings.BaseUrl + "User/SignupUser");
  return await axios.post<IUserSignupDTO>(Appsettings.BaseUrl + "User/SignupUser", body);
};

export const loginUser = async (body: IUserLoginRequestDTO) => {
  console.log(Appsettings.BaseUrl + "User/LoginUser");
  return await axios.post<IUserDTO>(Appsettings.BaseUrl + "User/LoginUser", body);
};

export const updateUserInfo = async (body: IUserSignupDTO) => {
  console.log(Appsettings.BaseUrl + "User/UpdateUserAccountInfo");
  return await axios.post<IUserDTO>(Appsettings.BaseUrl + "User/UpdateUserAccountInfo", body, {
    headers: authorizationHeader(),
  });
};

// export const getCategories = async () => {
//   console.log(Appsettings.BaseUrl + "Category/GetCategories");
//   return await axios.get<ICategoryFilterDTO>(
//     Appsettings.BaseUrl + "Category/GetCategories"
//   );
// };

// export const getProductsPaged = async (body: IRequestProductPage) => {
//   console.log(Appsettings.BaseUrl + "Product/GetSubCategoryProductsPaged");
//   return await axios.post<IProductsPageResponseDTO>(
//     Appsettings.BaseUrl + "Product/GetSubCategoryProductsPaged",
//     body
//   );
// };

// export const loginUser = async (body: IUserRequestDTO) => {
//   console.log(Appsettings.BaseUrl + "User/Login");
//   return await axios.post<IUserDTO>(Appsettings.BaseUrl + "User/Login", body);
// };

// //with authorization headers
// export const getUserInfo = async () => {
//   console.log(Appsettings.BaseUrl + "User/GetUserInfo");
//   return await axios.get<IUserDTO>(Appsettings.BaseUrl + "User/GetUserInfo", {
//     headers: authorizationHeader(),
//   });
// };

// export const getCoordinatesFromAddress = async (address : string) => {
//   let googleResponse : any = {};
//   const apiCall = await Geocode.fromAddress(address).then(
//     (response) => {
//       googleResponse = response.results[0].geometry.location;
//       return googleResponse;
//     },
//     (error) => {
//       console.error(error);
//     }
//   );
//   return apiCall;
// }

// export const signUpUser = async (body: IUserSignupDTO) => {
//   console.log(Appsettings.BaseUrl + "User/SignUpUser");
//   return await axios.post<IUserSignupDTO>(Appsettings.BaseUrl + "User/SignUpUser", body);
// };

// export const updateUserInfo = async (body: IUserSignupDTO) => {
//   console.log(Appsettings.BaseUrl + "User/UpdateUserAccountInfo");
//   return await axios.post<IUserSignupDTO>(Appsettings.BaseUrl + "User/UpdateUserAccountInfo", body, {
//     headers: authorizationHeader(),
//   });
// };

// export const getAccountInfo = async () => {
//   console.log(Appsettings.BaseUrl + "User/GetAccountInfo");
//   return await axios.get<IAccountInfoDTO>(Appsettings.BaseUrl + "User/GetAccountInfo", {
//     headers: authorizationHeader(),
//   });
// };

// export const getUsersAddresses = async () => {
//   console.log(Appsettings.BaseUrl + "User/GetCurrentUserAddresses");
//   return await axios.get<IAddressDTO[]>(
//     Appsettings.BaseUrl + "User/GetCurrentUserAddresses", {
//       headers: authorizationHeader(),
//     }
//   );
// };

// export const getPaymentMethods = async () => {
//   console.log(Appsettings.BaseUrl + "ReferenceData/GetPaymentsMethods");
//   return await axios.get<IPaymentMethodDTO[]>(
//     Appsettings.BaseUrl + "ReferenceData/GetPaymentsMethods"
//   );
// };

// export const getDeliveryMethods = async () => {
//   console.log(Appsettings.BaseUrl + "ReferenceData/GetDeliveryMethods");
//   return await axios.get<IDeliveryMethodDTO[]>(
//     Appsettings.BaseUrl + "ReferenceData/GetDeliveryMethods"
//   );
// };

// export const calculateOrderPricing = async (body: IOrderPricingRequestDTO) => {
//   console.log(Appsettings.BaseUrl + "Order/CalculateOrderPricingInfo");
//   return await axios.post<IOrderPricingInfoResponseDTO>(Appsettings.BaseUrl + "Order/CalculateOrderPricingInfo", 
//   body,
//   {
//     headers: authorizationHeader(),
//   });
  
// };

// export const getHistoryOrders = async () => {
//   console.log(Appsettings.BaseUrl + "Order/GetAllOrdersByUser");
//   return await axios.get<IHistoryOrderDTO[]>(
//     Appsettings.BaseUrl + "Order/GetAllOrdersByUser", {
//       headers: authorizationHeader(),
//     }
//   );
// };

// export const saveOrder = async (body: IOrderDTO) => {
//   console.log(Appsettings.BaseUrl + "Order/SaveOrder");
//   return await axios.post<number>(Appsettings.BaseUrl + "Order/SaveOrder", 
//   body,
//   {
//     headers: authorizationHeader(),
//   });
// };

// export const AddOrderToFavorite = async (id: number) => {
//   return await axios.get<boolean>(
//     Appsettings.BaseUrl + "Order/AddOrderToFavorite?id=" +id,
//     {
//       headers: authorizationHeader(),
//     }
//   );
// };

// export const RemoveOrderFromFavorite = async (id: number) => {
//   console.log(Appsettings.BaseUrl + "Order/RemoveOrderFromFavorite?id=" +id);
//   return await axios.get<boolean>(
//     Appsettings.BaseUrl + "Order/RemoveOrderFromFavorite?id=" +id,
//     {
//       headers: authorizationHeader(),
//     }
//   );
// };

// export const getSuperMarketBrands = async () => {
//   console.log(Appsettings.BaseUrl + "ReferenceData/GetSuperMarketBrands");
//   return await axios.get<IBrandDTO[]>(
//     Appsettings.BaseUrl + "ReferenceData/GetSuperMarketBrands"
//   );
// };

// export const sendEmails = async (body: IOrderPricingInfoResponseDTO) => {
//   console.log(Appsettings.BaseUrl + "Email/SendEmail");
//   return await axios.post(
//     Appsettings.BaseUrl + "Email/SendEmail", body, 
//     {
//       headers: authorizationHeader(),
//     }
//   );
// };

// export const getFavoriteOrders = async () => {
//   console.log(Appsettings.BaseUrl + "Order/GetAllFavOrdersByUser");
//   return await axios.get<IHistoryOrderDTO[]>(
//     Appsettings.BaseUrl + "Order/GetAllFavOrdersByUser", {
//       headers: authorizationHeader(),
//     }
//   );
// };