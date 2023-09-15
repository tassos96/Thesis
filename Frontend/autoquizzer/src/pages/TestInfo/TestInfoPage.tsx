import { useEffect, useState } from "react";
import { QuestionDTO } from "../../DTO/QuestionsPage/QuestionDTO";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppBreadcrumb from "../../components/Breadcrumb/AppBreadcrumb";
import { Button, Card, Divider, Form, List, Modal, Space, message } from "antd";
import { assignTestRequest, deleteTestAssignmentRequest, getQuestionsWithAnswers, getTestStatistics, getTestUsers } from "../../httpServices/HttpServices";
import { showErrorMessage } from "../../helpers/AppConstants";
import { Header } from "antd/lib/layout/layout";
import { ITestUsersDTO } from "../../DTO/TestsPage/ITestUsersDTO";
import { ExclamationCircleFilled, InfoCircleTwoTone } from "@ant-design/icons";
import { IStatisticsDTO } from "../../DTO/TestsPage/IStatisticsDTO";
import { IAssignTestDTO } from "../../DTO/TestsPage/IAssignTestDTO";
import TextArea from "antd/es/input/TextArea";
import { IDeleteAssignmentDTO } from "../../DTO/TestsPage/IDeleteAssignmentDTO";
import { useUserContext } from "../../context/UserContext";
import TestInfoStudent from "./TestInfoStudent";
import Loader from "../../components/Loader/Loader";

export interface ITestInfoPage {
    isLoading: boolean;
    testId: number;
    questions?: QuestionDTO[];
    testUsers?: ITestUsersDTO[];
    statistics?: IStatisticsDTO;

    showStatisticsModal: boolean;
    openAssignTestModal: boolean;

    effect: boolean;
}

const TestInfoPage = () => {

    const [state, setState] = useState<ITestInfoPage>({
        testId: 0,
        isLoading: true,
        showStatisticsModal: false,
        openAssignTestModal: false,
        effect: false
    })
    
    const currentUserContext = useUserContext();
    const isUserTeacher = currentUserContext.isUserTeacher();
    const [searchParams] = useSearchParams();
    const [messageApi, contextHolder] = message.useMessage();
    const [assignTestForm] = Form.useForm();
    const { confirm } = Modal;
    const navigate = useNavigate();

    useEffect(() => {
        const testId = Number(searchParams.get('testId'))
        if(testId === 0)
        {
            navigate("/not-found", {replace: true})
        }

        getQuestionsWithAnswers(testId).then((res) => {
            setState((prev) => {
                return {
                    ...prev,
                    testId: testId,
                    questions: res.data,
                    isLoading: false
                };
            });
        }).catch((error) => {
            showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
        });

        getTestUsers(testId).then((res) => {
            setState((prev) => {
                return {
                    ...prev,
                    testUsers: res.data,
                    isLoading: false
                };
            });
        }).catch((error) => {
            showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
        });

    }, [state.effect])

    const calculateStatistics = () => {

        getTestStatistics(state.testId).then((res) => {
            setState((prev) => {
                return {
                    ...prev,
                    statistics: res.data,
                    showStatisticsModal: true
                };
            });
        }).catch((error) => {
            showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
        });
    }

    const handleAssignTestModalCancel = () => {
        setState((prev) => {
            return {
                ...prev,
                openAssignTestModal: false
            };
        });
    }

    const handleStatisticsModalCancel = () => {
        setState((prev) => {
            return {
                ...prev,
                showStatisticsModal: false
            };
        });
    }

    const assignTest = () => {
        setState((prev) => {
            return {
                ...prev,
                openAssignTestModal: true,
            }
        });
    };

    const handleAssignTestModalOk = (values: any) => {
        console.log("1:" + values.users);
        const lines = values.users.split('\n').map((line:string) => line.trim());
        const assignTestDTO: IAssignTestDTO = {
            testId: state.testId,
            usersToAssign: lines
        }

        console.log(assignTestDTO);

        assignTestRequest(assignTestDTO).then((resp) => {
            setState((prev) => {
                return {
                    ...prev,
                    modalLoading: true,
                    openAssignTestModal: false,
                    effect: !state.effect
                }
            })
        })
        .catch((error) => {
            showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
        });

        assignTestForm.resetFields();

        setState((prev) => {
            return {
                ...prev,
                openAssignTestModal: false,
            }
        })
    };

    const deleteAssignment = (item: ITestUsersDTO) => {
        confirm({
            title: 'Προσοχή',
            icon: <ExclamationCircleFilled />,
            content: 'Είσαι σίγουρος ότι επιθυμείς να διαγραφτεί αυτή η Ανάθεση;',
            okText: 'Ναί',
            okType: 'danger',
            cancelText: 'Όχι',
            onOk() {
                const deleteReq: IDeleteAssignmentDTO = {
                    examId: item.examId,
                    testId: item.testId,
                    userId: item.userId
                };

                deleteTestAssignmentRequest(deleteReq).then((resp) => {
                    setState((prev) => {
                        return {
                            ...prev,
                            modalLoading: true,
                            effect: !state.effect
                        };
                    });
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    };

    return (
        <>
            {contextHolder}
            <AppBreadcrumb path="Αρχική/Τεστ/Πληροφορίες Τεστ" />

            <h2>Ερωτήσεις Τεστ</h2>
            {isUserTeacher && state.isLoading === false && (
            <div>
                <List
                    grid={{
                        gutter: 16,xs: 1,sm: 2,md: 4,lg: 4,xl: 6,xxl: 3
                    }}
                    dataSource={state.questions}
                    pagination = {{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 3,
                        align: 'center'
                    }}
                    footer={[]}
                    renderItem={(question) => (
                        <List.Item>
                            <Card 
                                title={question.description} 
                            >
                                <p style = {{ color: question.questionAnswers[0].isCorrect ? "green" : "red"}} >1: {question.questionAnswers[0].description}</p>
                                <p style = {{ color: question.questionAnswers[1].isCorrect ? "green" : "red"}} >2: {question.questionAnswers[1].description}</p>
                                <p style = {{ color: question.questionAnswers[2].isCorrect ? "green" : "red"}} >3: {question.questionAnswers[2].description}</p>
                                <p style = {{ color: question.questionAnswers[3].isCorrect ? "green" : "red"}} >4: {question.questionAnswers[3].description}</p>
                            </Card>
                        </List.Item>
                    )}
                />

                <h2>Χρήστες που τους έχει ανατεθεί</h2>
                <List
                    pagination = {{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 3,
                        align: 'center'
                    }}
                    itemLayout="horizontal"
                    dataSource={state.testUsers}
                    renderItem={(item) => (
                    <List.Item
                        actions=
                        {[
                            <Space wrap>
                                <Button onClick={() => deleteAssignment(item)} danger>Διαγραφή Ανάθεσης</Button>
                            </Space>
                        ]}
                    >
                        <List.Item.Meta
                        avatar={<InfoCircleTwoTone />}
                        title={ 
                            <div>
                                {"Όνομα: " + item.fullname}
                                <Divider type="vertical"/>
                                {"Username: " + item.userName}
                                <Divider type="vertical"/>
                                {"Email: " + item.email}
                            </div>
                        }
                        description={
                            <div>
                            <p><b>Ημ/νία Ανάθεσης:</b> {item.assignmentDate}</p>
                            {item.resolvedDate !== undefined && (<p><b>Ημ/νία Επίλυσης:</b> {item.resolvedDate}</p>)}
                            {item.grade !== undefined && (<p><b>Βαθμός:</b> {item.grade}%</p>)}
                            {item.standing !== undefined && (<p><b>Κατάταξη:</b> {item.standing}</p>)}
                            </div>
                        }
                        />
                    </List.Item>
                    )}
                    footer={
                        <Space wrap>
                            <Button
                                type="primary"
                                className="add-category-button"
                                onClick={calculateStatistics}
                            >
                                Προβολή στατιστικών
                            </Button>
                            <Button onClick={assignTest} type="primary" className="add-category-button">Ανάθεση</Button>
                        </Space>
                    }
                />

                <Modal
                    open={state.showStatisticsModal}
                    title={"Στατιστικά χρηστών"}
                    onCancel={handleStatisticsModalCancel}
                    footer={[
                    ]}
                >
                    <p>100-85: {state.statistics?.first}</p>
                    <p>84-50: {state.statistics?.second}</p>
                    <p>49-25: {state.statistics?.third}</p>
                    <p>24-0: {state.statistics?.fourth}</p>
                </Modal>

                <Modal
                    open={state.openAssignTestModal}
                    title={"Ανάθεση Τεστ"}
                    onOk={handleAssignTestModalOk}
                    onCancel={handleAssignTestModalCancel}
                    footer={[]}
                >
                    <Form
                        form={assignTestForm}
                        name="assignTestForm"
                        layout="vertical"
                        onFinish={handleAssignTestModalOk}
                        style={{ maxWidth: 600 }}
                        autoComplete="off"
                    >
                        <Form.Item 
                                label="Χρήστες"
                                name="users"
                                rules={[
                                    {
                                        required: true,
                                        message: "Συμπλήρωσε τους χρήστες."
                                    }
                                ]}
                            >
                                <TextArea 
                                    placeholder="Email/Username.
Διαχωρισμός χρηστών με enter"
                                    autoSize={{ minRows: 3, maxRows: 5 }} 
                                />
                            </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Ανάθεση
                            </Button>
                        </Form.Item>
                    </Form>    
                </Modal>
            </div>
            )
            }
            {isUserTeacher === false && state.isLoading === false && (
                <div>
                    <TestInfoStudent/>
                </div>
            )}
            {state.isLoading === true && (
                <Loader/>
            )}
        </>
    );
}

export default TestInfoPage;