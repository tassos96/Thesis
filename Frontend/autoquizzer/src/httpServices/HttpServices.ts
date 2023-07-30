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
import { ICategoryDTO } from "../DTO/CategoriesPage/ICategoryDTO";
import { ISubcategoryDTO } from "../DTO/SubcategoriesPage/ISubcategoryDTO";
import { IUpdatesubcategoryDTO } from "../DTO/SubcategoriesPage/IUpdateSubcategoryDTO";
import { QuestionDTO } from "../DTO/QuestionsPage/QuestionDTO";
import { IQuestionUpdateDTO } from "../DTO/QuestionsPage/IQuestionUpdateDTO";
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

export const getCategories = async () => {
  console.log(Appsettings.BaseUrl + "categories/fetchCategories");
  return await axios.get<ICategoryDTO[]>(
    Appsettings.BaseUrl + "categories/fetchCategories", {headers: authorizationHeader()});
};

export const addCategory = async (body: ICategoryDTO) => {
  console.log(Appsettings.BaseUrl + "categories/createCategory");
  return await axios.post<ICategoryDTO>(Appsettings.BaseUrl + "categories/createCategory", body, {
    headers: authorizationHeader(),
  });
}

export const updateCategory = async (body: ICategoryDTO) => {
  console.log(Appsettings.BaseUrl + "categories/updateCategory");
  return await axios.post<ICategoryDTO>(Appsettings.BaseUrl + "categories/updateCategory", body, {
    headers: authorizationHeader(),
  });
}

export const deleteCategoryRequest = async (categoryId: number) => {
  console.log(Appsettings.BaseUrl + "categories/deleteCategory");
  return await axios.delete<boolean>(Appsettings.BaseUrl + "categories/deleteCategory", {
    params: {categoryId: categoryId}, 
    headers: authorizationHeader()}
  );
}

export const getSubcategories = async (categoryId: number) => {
  console.log(Appsettings.BaseUrl + "subcategories/fetchsubcategories");
  return await axios.get<ISubcategoryDTO[]>(
    Appsettings.BaseUrl + "subcategories/fetchsubcategories", {
      headers: authorizationHeader(),
      params: {categoryId: categoryId},
    });
};

export const addSubcategory = async (body: ISubcategoryDTO) => {
  console.log(Appsettings.BaseUrl + "subcategories/createSubcategory");
  return await axios.post<ICategoryDTO>(Appsettings.BaseUrl + "subcategories/createSubcategory", body, {
    headers: authorizationHeader(),
  });
}

export const updateSubcategory = async (body: IUpdatesubcategoryDTO) => {
  console.log(Appsettings.BaseUrl + "subcategories/updateSubcategory");
  return await axios.post<IUpdatesubcategoryDTO>(Appsettings.BaseUrl + "subcategories/updateSubcategory", body, {
    headers: authorizationHeader(),
  });
}

export const deleteSubcategoryRequest = async (subcategoryId: number) => {
  console.log(Appsettings.BaseUrl + "subcategories/deleteSubcategory");
  return await axios.delete<boolean>(Appsettings.BaseUrl + "subcategories/deleteSubcategory", {
    params: {subcategoryId: subcategoryId}, 
    headers: authorizationHeader()}
  );
}

export const getQuestions = async (categoryId: number, subcategoryId: number) => {
  console.log(Appsettings.BaseUrl + "questions/fetchQuestions");
  return await axios.get<QuestionDTO[]>(
    Appsettings.BaseUrl + "questions/fetchQuestions", {
      headers: authorizationHeader(),
      params: {
        categoryId: categoryId,
        subcategoryId: subcategoryId
      },
    });
};

export const deleteQuestionRequest = async (categoryId:number, subcategoryId: number, questionId: number) => {
  console.log(Appsettings.BaseUrl + "questions/deleteQuestion");
  return await axios.delete<boolean>(Appsettings.BaseUrl + "questions/deleteQuestion", {
    params: {
      categoryId: categoryId,
      subcategoryId: subcategoryId,
      questionId: questionId
    }, 
    headers: authorizationHeader()}
  );
}

export const addQuestion = async (body: QuestionDTO) => {
  console.log(Appsettings.BaseUrl + "questions/createQuestion");
  return await axios.post<QuestionDTO>(Appsettings.BaseUrl + "questions/createQuestion", body, {
    headers: authorizationHeader(),
  });
}

export const updateQuestion = async (body: IQuestionUpdateDTO) => {
  console.log(Appsettings.BaseUrl + "questions/updateQuestion");
  return await axios.post<IQuestionUpdateDTO>(Appsettings.BaseUrl + "questions/updateQuestion", body, {
    headers: authorizationHeader(),
  });
}