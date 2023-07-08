import { AutoComplete, Button, Col, Form, Input, InputNumber, message, Result, Row, Select, Space } from "antd";
import { useState } from "react";
// import AppBreadcrumb from "../../../components/AppBreadcrumb";
//import { IUserSignupDTO } from "../../../DTO/IUserSignupDTO";
import { showErrorMessage } from "../../../helpers/AppConstants";
import { signUpUser } from "../../../httpServices/HttpServices";
//import { getCoordinatesFromAddress } from "../../../httpServices/HttpServices";


import "./SignupPage.css";
import AppBreadcrumb from "../../../components/Breadcrumb/AppBreadcrumb";
import { IUserSignupDTO } from "../../../DTO/SignupPage/IUserSignupDTO";

const { Option } = Select;


const SignupPage = () => {
  
  const [messageApi, contextHolder] = message.useMessage();
  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);
  const [isSignupSuccessfull, setIsSignupSuccessfull] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    const address = values.street + " " + values.streetNumber + " " + values.city; 
    // const googleResult = await getCoordinatesFromAddress(address);
    // const lat = googleResult.lat;
    // const lng = googleResult.lng;
    let signUpDTO: IUserSignupDTO = values as IUserSignupDTO;
    // signUpDTO.lat = lat.toString();
    // signUpDTO.lng = lng.toString();
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
                  name="age"
                  label="Ηλικία"
                  rules={[
                    {
                      required: true,
                      message: "Συμπλήρωσε την ηλικία σου"
                    }
                  ]}>
                  <InputNumber className="input-number" min={18} max={130} />
                </Form.Item>
              </Col>

              <Col className="column" >
                <Form.Item
                  name="genderId"
                  label="Φύλο"
                  rules={[{ required: true, message: "Επέλεξε το φύλο σου" }]}
                >
                  <Select placeholder="Επέλεξε το φύλο σου">
                    <Option value={1}>Άνδρας</Option>
                    <Option value={2}>Γυναίκα</Option>
                  </Select>
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
                  label="Επιβεβαίωση Κωδικού"
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
                <Form.Item
                  name="street"
                  label="Οδός"
                  rules={[{ required: true, message: "Συμπλήρωσε την οδό σου" }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col className="column">
                <Form.Item
                  name="streetNumber"
                  label="Αριθμός"
                  rules={[{ required: true, message: "Συμπλήρωσε τον αριθμό της οδού σου" }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col className="column">
                <Form.Item
                  name="city"
                  label="Πόλη"
                  rules={[{ required: true, message: "Συμπλήρωσε την πόλη σου" }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col className="column">
                <Form.Item
                  name="addressDescription"
                  label="Φιλική Ονομασία Διεύθυνσης"
                  rules={[{ required: true, message: "Συμπλήρωσε την φιλική ονομασία της διεύθυνσης σου" }]}
                >
                  <Input />
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