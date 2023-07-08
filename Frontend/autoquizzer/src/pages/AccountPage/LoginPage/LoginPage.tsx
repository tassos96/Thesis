import { Button, Col, Form, Input, message, Result, Row } from "antd";
// import AppBreadcrumb from "../../../components/AppBreadcrumb";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./LoginPage.css";
import { loginUser} from "../../../httpServices/HttpServices";

import { Link } from "react-router-dom";
import { AppRoutes, showErrorMessage } from "../../../helpers/AppConstants";
import { useUserContext } from "../../../context/UserContext";
import AppBreadcrumb from "../../../components/Breadcrumb/AppBreadcrumb";
import { IUserLoginRequestDTO } from "../../../DTO/LoginPage/IUserLoginRequestDTO";

const LoginPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const currentUserContext = useUserContext();
  const isUserCurrentlyLoggedIn = currentUserContext.isUserLoggedIn();

  const onFinish = (values: any) => {
    const userCredentials: IUserLoginRequestDTO = {
      userName: values.username,
      password: values.password,
    };
    loginUser(userCredentials)
      .then((resp) => {
        currentUserContext.setLogedinUser(resp.data);
      })
      .catch((error) => {
        showErrorMessage(messageApi, "Λάθος στοιχεία χρήστη");
      });
  };

  return (
    <>
      <div>
        <AppBreadcrumb path="Αρχική/Σύνδεση" />
        {!isUserCurrentlyLoggedIn ? (
          <Row>
            <Col span={12} offset={6}>
              <div className="login-form">
                <h1 className="geek-blue">AutoQuizzer</h1>

                <h2>Σύνδεση</h2>

                <Form
                  name="normal_login"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Παρακαλώ εισάγετε όνομα χρήστη ή email",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Όνομα χρήστη ή email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Παρακαλώ εισάγετε κωδικό" },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Κωδικός"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Σύνδεση
                    </Button>
                    <br /> Είσαι νέος χρήστης;{" "}
                    <Link to={"../" + AppRoutes.Signup} className="blue-color">
                      Εγγραφή
                    </Link>
                  </Form.Item>
                </Form>
                {contextHolder}
              </div>
            </Col>
          </Row>
        ) : (
          <Result
            status="success"
            title="Επιτυχής Σύνδεση"
            subTitle="Είστε συνδεδεμένος στην εφαρμογή"
          />
        )}
      </div>
    </>
  );
};

export default LoginPage;
