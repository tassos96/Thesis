import { AutoComplete, Button, Col, Form, Input, InputNumber, message, Result, Row, Select, Space } from "antd";
import { useState } from "react";
import { showErrorMessage } from "../../../helpers/AppConstants";
import { signUpUser } from "../../../httpServices/HttpServices";
import AppBreadcrumb from "../../../components/Breadcrumb/AppBreadcrumb";
import { IUserSignupDTO } from "../../../DTO/SignupPage/IUserSignupDTO";
import "./SignupPage.css";
import { IUserRoleEnum } from "../../../DTO/IUserRoleEnum";

const { Option } = Select;

const SignupPage = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);
  const [isSignupSuccessfull, setIsSignupSuccessfull] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    let signUpDTO: IUserSignupDTO = values as IUserSignupDTO;
    console.log(signUpDTO);
    signUpUser(signUpDTO).then((resp) => {
      setIsSignupSuccessfull(true);
    })
      .catch((error) => {
        showErrorMessage(messageApi, "Η εγγραφή απέτυχε");
        setIsSignupSuccessfull(false);
      });
  };

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['@gmail.com', '@gmail.gr', '@yahoo.com', '@yahoo.gr'].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website
  }));

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="30">+30</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <AppBreadcrumb path="Αρχική/Εγγραφή" />
      {isSignupSuccessfull === false ? (
        <div>
          <Row>
            <div className="registration-form">
              <h1 className="geek-blue">AutoQuizzer</h1>
              <h3>Συμπλήρωσε την παρακάτω φόρμα για να κάνεις την εγγραφή σου</h3>
            </div>
          </Row>

          <Form
            //{...layout}
            form={form}
            name="register"
            className="registration-form"
            onFinish={onFinish}
            initialValues={{ prefix: "30" }}
            layout="vertical"
            scrollToFirstError
          >
            <Row className="row">
              <Col className="column" >
                <Form.Item
                  className="form-input"
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "To e-mail δεν είναι έγκυρο."
                    },
                    {
                      required: true,
                      message: "Συμπλήρωσε το email σου"
                    }
                  ]}
                >
                  <AutoComplete
                    options={websiteOptions}
                    onChange={onWebsiteChange}
                    placeholder="email"
                  >
                    <Input />
                  </AutoComplete>
                </Form.Item>
              </Col>
              <Col className="column" >
                <Form.Item
                  className="form-input"
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: true,
                      message: "Συμπλήρωσε το username σου"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row className="row">
              <Col className="column" >
                <Form.Item
                  name="firstname"
                  label="Όνομα"
                  rules={[
                    {
                      required: true,
                      message: "Συμπλήρωσε το όνομα σου"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col className="column" >
                <Form.Item
                  name="lastname"
                  label="Επώνυμο"
                  rules={[
                    {
                      required: true,
                      message: "Συμπλήρωσε το επώνυμο σου"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col className="column" >
                <Form.Item
                  name="phoneNumber"
                  label="Κινητό τηλέφωνο"
                  rules={[{ required: true, message: "Συμπλήρωσε το κινητό τηλέφωνό σου" }]}
                >
                  <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col className="column" >
                <Form.Item
                  name="userRole"
                  label="Τύπος χρήστη"
                  rules={[{ required: true, message: "Επέλεξε το τύπο χρήστη σου" }]}
                >
                  <Select placeholder="Επέλεξε το τύπο χρήστη σου">
                    <Option value={IUserRoleEnum.Student}>Student</Option>
                    <Option value={IUserRoleEnum.Teacher}>Teacher</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col className="column" >
                <Form.Item
                  className="form-input"
                  name="institution"
                  label="Εταιρεία/Ίδρυμα"
                  rules={[
                    {
                      required: true,
                      message: "Συμπλήρωσε την εταιρεία/ίδρυμα σου"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row className="row">
              <Col className="column" >
                <Form.Item
                  name="password"
                  label="Κωδικός"
                  rules={[
                    {
                      required: true,
                      message: "Συμπλήρωσε τον κωδικό σου"
                    }
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
              </Col>

              <Col className="column" >
                <Form.Item
                  name="confirm"
                  label="Επιβεβαίωση κωδικού"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Επιβεβαίωσε τον κωδικό σου"
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Οι κωδικοί δεν ταιριάζουν. Προσπάθησε ξανά")
                        );
                      }
                    })
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>

            <Row className="row">
              <Col className="column">
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="registration-form-button">
                    Εγγραφή
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>)
        :
        (
          <Result
            status="success"
            title="Επιτυχής Εγγραφή"
            subTitle="Συγχαρητήρια! Ολοκλήρωσες την εγγραφή σου με επιτυχία."
          />
        )}
    </>
  );
}

export default SignupPage;