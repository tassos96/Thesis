import { useEffect, useState } from "react";
import AppBreadcrumb from "../../components/Breadcrumb/AppBreadcrumb";
import Loader from "../../components/Loader/Loader";
import { Button, Form, Input, List, Modal, Select, Space, message } from "antd";
import { IDifficultyEnum } from "../../DTO/IDifficultyEnum";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteTestRequest, fetchTests, updateTest } from "../../httpServices/HttpServices";
import { ITestDTO } from "../../DTO/TestsPage/ITestDTO";
import { showErrorMessage } from "../../helpers/AppConstants";
import { ExclamationCircleFilled, InfoCircleTwoTone } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { IUpdateTestDTO } from "../../DTO/TestsPage/IUpdateTestDTO";
import { stat } from "fs";

export interface ITestPageState {
    isLoading: boolean;
    selectedDifficultyFilter?: IDifficultyEnum;
    tests?: ITestDTO[];

    openUpdateTestModal: boolean;
    modalLoading: boolean;
    updateTestId: number;

    effect: boolean;
}

export interface IOptionDifficulty {
    value: IDifficultyEnum;
    label: string;
}

const TestsPage = () => { 

    const [searchParams] = useSearchParams();
    const [updateTestForm] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const { confirm } = Modal;
    const navigate = useNavigate();
    const [state, setState] = useState<ITestPageState>({
        isLoading: false,
        selectedDifficultyFilter: IDifficultyEnum.None,

        openUpdateTestModal: false,
        modalLoading: false,
        updateTestId: 0,
        effect: false,
    });

    const defaultDifficultyFilters: IOptionDifficulty[] = [
        {
            value: IDifficultyEnum.None,
            label: 'Όλα'
        },
        {
            value: IDifficultyEnum.Easy,
            label: 'Εύκολα'
        },
        {
            value: IDifficultyEnum.Medium,
            label: 'Μέσαια'
        },
        {
            value: IDifficultyEnum.Hard,
            label: 'Δύσκολα'
        },
        {
            value: IDifficultyEnum.VeryHard,
            label: 'Πολύ Δύσκολα'
        },
    ];

    useEffect(() => {
        let selectedDifficultyFilter = searchParams.get('difficulty') as IDifficultyEnum;
        if(selectedDifficultyFilter === null)
        {
            selectedDifficultyFilter = IDifficultyEnum.None;
        }

        console.log(selectedDifficultyFilter)
        fetchTests(selectedDifficultyFilter).then((res) => {
            setState((prev) => {
                return {
                    ...prev,
                    tests: res.data
                }
            });
        })
        .catch((error) => {
            showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
        });

        setState((prev) => {
            return {
                ...prev,
                modalLoading: false,
                selectedDifficultyFilter: selectedDifficultyFilter
            }
        })
    }, [state.effect]);

    const handleDifficultyChange = (value : IDifficultyEnum) => {
        setState((prev) => {
            return {
                ...prev,
                selectedDifficultyFilter: value
            }
        })

        if(value === IDifficultyEnum.None)
        {
            navigate("/test")
        }
        else
        {
            navigate("/test?difficulty=" + value);
        }

        fetchTests(value).then((res) => {
            setState((prev) => {
                return {
                    ...prev,
                    tests: res.data
                }
            });
        })
        .catch((error) => {
            showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
        });
    };

    const deleteTest = (test: ITestDTO) => {
        confirm({
            title: 'Προσοχή',
            icon: <ExclamationCircleFilled />,
            content: 'Είσαι σίγουρος ότι επιθυμείς να διαγραφτεί αυτό το Τέστ;',
            okText: 'Ναί',
            okType: 'danger',
            cancelText: 'Όχι',
            onOk() {
                deleteTestRequest(test.testId).then((resp) => {
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

    const editTest = (test: ITestDTO) => {
        updateTestForm.setFieldsValue({title: test.title, subject: test.subject});
        setState((prev) => {
            return {
                ...prev,
                openUpdateTestModal: true,
                updateTestId: test.testId
            }
        });
    };

    const assignTest = (test: ITestDTO) => {
        
    };

    const handleUpdateTestModalOk = (values: any) => {
        const updateTestDTO: IUpdateTestDTO = {
            testId: state.updateTestId,
            title: values.title,
            subject: values.subject
        }
        
        updateTest(updateTestDTO).then((resp) => {
            setState((prev) => {
                return {
                    ...prev,
                    modalLoading: true,
                    updateTestId: 0,
                    openUpdateTestModal: false,
                    effect: !state.effect
                };
            });

        })
    };

    const handleUpdateTestModalCancel = () => {
        updateTestForm.resetFields();
        setState((prev) => {
            return {
                ...prev,
                openUpdateTestModal: false,
                updateTestId: 0
            }
        })
    };

    return (
        <>
        <AppBreadcrumb path="Αρχική/Τεστ" />
        {contextHolder}
        {state.isLoading === false ? (
            <div>
                <Space style={{width: "100%", marginTop: '1%'}} wrap>
                    <Form layout="vertical">
                        <Form.Item label="Δυσκολία">
                            <Select
                                style={{ width: 300,marginBottom: "2%"}}
                                size= {"middle"}
                                value={state.selectedDifficultyFilter}
                                placeholder="Επέλεξε δυσκολία για να φιλτράρεις"
                                onChange={(values) => handleDifficultyChange(values)}
                                options={defaultDifficultyFilters}
                            />
                        </Form.Item>
                    </Form>
                </Space>

                <div style={{ marginLeft: "5%", marginRight: "5%"}}>
                    <List
                        pagination = {{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 9,
                            align: 'center'
                        }}
                        itemLayout="horizontal"
                        dataSource={state.tests}
                        renderItem={(item) => (
                        <List.Item
                            actions=
                            {[
                                <Space wrap>
                                    <Button onClick={() => deleteTest(item)} danger>Διαγραφή</Button>
                                    <Button onClick={() => editTest(item)}>Επεξεργασία</Button>
                                    <Button onClick={() => assignTest(item)} type="primary">Ανάθεση</Button>
                                </Space>
                            ]}
                        >
                            <List.Item.Meta
                            avatar={<InfoCircleTwoTone />}
                            title={<a onClick={() => {}}>{item.title}</a>}
                            description={item.subject}
                            />
                        </List.Item>
                        )}
                        footer={
                            <Space wrap>
                                <Button
                                    type="primary"
                                    className="add-category-button"
                                    onClick={() => {}}
                                >
                                    Δημιουργία Τεστ
                                </Button>
                            </Space>
                        }
                    />
                </div>

                <Modal
                        open={state.openUpdateTestModal}
                        title={"Επεξεργασία Τεστ"}
                        onOk={handleUpdateTestModalOk}
                        onCancel={handleUpdateTestModalCancel}
                        footer={[
                        ]}
                    >
                        <Form
                            form={updateTestForm}
                            name="updateTestForm"
                            className="create-category-form"
                            onFinish={handleUpdateTestModalOk}
                            layout="vertical"
                            scrollToFirstError
                        >
                            <Form.Item
                                className="form-input"
                                name="title"
                                label="Τίτλος"
                                rules={[
                                    {
                                        required: true,
                                        message: "Συμπλήρωσε το τίτλο."
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                className="form-input"
                                name="subject"
                                label="Περιγραφή"
                                rules={[
                                    {
                                        required: true,
                                        message: "Συμπλήρωσε τη περιγραφή."
                                    }
                                ]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                            <Space wrap>
                            <Form.Item>
                            <Button key="back" onClick={handleUpdateTestModalCancel}>
                                Πίσω
                            </Button>
                            </Form.Item>
                            <Form.Item>
                            <Button className="add-category-button" key="submit" htmlType="submit" type="primary" loading={state.modalLoading}>
                                Ενημέρωση
                            </Button>
                            </Form.Item>
                            </Space>
                        </Form>
                    </Modal>
            </div>
        ) :
        (
            <Loader/>
        )}
        </>
    );
}

export default TestsPage;