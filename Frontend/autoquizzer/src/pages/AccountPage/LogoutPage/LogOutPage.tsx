import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";
import AppBreadcrumb from "../../../components/Breadcrumb/AppBreadcrumb";

const LogOutPage = () => {
  const currentUserContext = useUserContext();
  const navigate = useNavigate();

  const logOut = ()=>{
    currentUserContext.logOutCurrentUser();
    navigate("/");
  }

  return (
    <>
    <AppBreadcrumb path="Αρχική/Αποσύνδεση" />
    <div className="login-form">
    <h1 className="geek-blue">AutoQuizzer</h1>
    <p>Θέλετε να αποσυνδεθείτε από την εφαρμογή και να συνεχίσετε σαν επισκέπτης;</p>
    <Button type="primary" className="login-form-button" onClick={()=>{logOut()}}>Αποσύνδεση</Button>
    </div>
    </>
  );
};

export default LogOutPage;
