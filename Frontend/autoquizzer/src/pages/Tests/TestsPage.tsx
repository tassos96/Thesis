import { useEffect, useState } from "react";
import AppBreadcrumb from "../../components/Breadcrumb/AppBreadcrumb";
import Loader from "../../components/Loader/Loader";
import { Button, Form, Input, InputNumber, List, Modal, Select, Slider, Space, message } from "antd";
import { IDifficultyEnum } from "../../DTO/IDifficultyEnum";
import { useNavigate, useSearchParams } from "react-router-dom";
import { assignTestRequest, createTestRequest, deleteTestRequest, fetcSubcategoriesByCategoriesRequest, fetchTests, getCategories, updateTest } from "../../httpServices/HttpServices";
import { ITestDTO } from "../../DTO/TestsPage/ITestDTO";
import { showErrorMessage } from "../../helpers/AppConstants";
import { ExclamationCircleFilled, InfoCircleTwoTone, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { IUpdateTestDTO } from "../../DTO/TestsPage/IUpdateTestDTO";
import { stat } from "fs";
import { IAssignTestDTO } from "../../DTO/TestsPage/IAssignTestDTO";
import { IFetchSubcategoriesByCategoriesRequest } from "../../DTO/TestsPage/IFetchSubcategoriesByCategories";
import { ICreateTestDTO } from "../../DTO/TestsPage/ICreateTestDTO";

export interface ITestPageState {
    isLoading: boolean;
    selectedDifficultyFilter?: IDifficultyEnum;
    tests?: ITestDTO[];

    openUpdateTestModal: boolean;
    modalLoading: boolean;
    updateTestId: number;

    openAssignTestModal: boolean;
    assignTestId: number;

    openCreateTestModal: boolean;
    categories?: IOption[];
    subcategories?: IOption[];
    selectedCategoriesId?: number[];
    selectedSubcategoriesId?: number[];
    isSubcategoriesDisabled: boolean;

    effect: boolean;
}

export interface IOptionDifficulty {
    value: IDifficultyEnum;
    label: string;
}

export interface IOption {
    value: number;
    label: string;
}

const TestsPage = () => { 

    const [searchParams] = useSearchParams();
    const [updateTestForm] = Form.useForm();
    const [assignTestForm] = Form.useForm();
    const [createTestForm] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const { confirm } = Modal;
    const navigate = useNavigate();
    const [state, setState] = useState<ITestPageState>({
        isLoading: false,
        selectedDifficultyFilter: IDifficultyEnum.None,

        openUpdateTestModal: false,
        modalLoading: false,
        updateTestId: 0,

        openAssignTestModal: false,
        assignTestId: 0,

        openCreateTestModal: false,
        isSubcategoriesDisabled: true,

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

        getCategories().then((res) => {
            const categoriesOptions = res.data.map((x) => {
                const optionDTO: IOption = {
                  value: x.categoryId,
                  label: x.title,
                };
                return optionDTO;
              });
            
            setState((prev) => {
                return {
                    ...prev,
                    categories: categoriesOptions,
                };
            });
        })
        .catch((error) => {
            showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
        });

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
        setState((prev) => {
            return {
                ...prev,
                openAssignTestModal: true,
                assignTestId: test.testId
            }
        });
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

    const handleAssignTestModalCancel = () => {
        console.log("cancel-assign")
        assignTestForm.resetFields();
        setState((prev) => {
            return {
                ...prev,
                openAssignTestModal: false,
                assignTestId: 0
            }
        })
    };

    const handleAssignTestModalOk = (values: any) => {
        console.log("1:" + values.users);
        const lines = values.users.split('\n').map((line:string) => line.trim());
        const assignTestDTO: IAssignTestDTO = {
            testId: state.assignTestId,
            usersToAssign: lines
        }

        console.log(assignTestDTO);

        assignTestRequest(assignTestDTO).then((resp) => {
            setState((prev) => {
                return {
                    ...prev,
                    modalLoading: true,
                    assignTestId: 0,
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
                assignTestId: 0
            }
        })
    };

    const createTest = () => {
        setState((prev) => {
            return {
                ...prev,
                openCreateTestModal: true
            }
        });
    };

    const handleCategoriesChange = (selectedCategories: number[]) => {
        console.log(selectedCategories)

        const request: IFetchSubcategoriesByCategoriesRequest = {
            categories: selectedCategories
        }

        if(selectedCategories.length === 0)
        {
            setState((prev) => {
                return {
                    ...prev,
                    subcategories: [],
                    isSubcategoriesDisabled: true
                };
            });
        }
        else 
        {
            fetcSubcategoriesByCategoriesRequest(request).then((res) => {
                const subcategoriesOptions = res.data.map((x) => {
                    const optionDTO: IOption = {
                        value: x.subcategoryId,
                        label: x.title,
                    };
                    return optionDTO;
                });
    
                setState((prev) => {
                    return {
                        ...prev,
                        subcategories: subcategoriesOptions,
                        isSubcategoriesDisabled: false
                    };
                });
    
            }).catch((error) => {
                showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
            });
        }
    };

    const handleCreateTestModalCancel = () => {
        createTestForm.resetFields();
        
        setState((prev) => {
            return {
                ...prev,
                openCreateTestModal: false,
            }
        })
    }

    const handleCreateTestModalOk = (values: any) => {
        console.log(values)
        const usersToAssign = values.users?.split('\n').map((line:string) => line.trim());
        const createRequest : ICreateTestDTO = {
            title: values.title,
            subject: values.subject,
            questionsNumber: values.questionsNumber,
            difficulty: values.difficulty,
            categories: values.categories,
            subcategories: values.subcategories,
            usersToAssign: usersToAssign !== undefined ? usersToAssign : []
        };

        createTestRequest(createRequest).then((res) => {
            setState((prev) => {
                return {
                    ...prev,
                    modalLoading: true,
                    openCreateTestModal: false,
                    effect: !state.effect
                }
            })

            let selectedDifficultyFilter = searchParams.get('difficulty') as IDifficultyEnum;
            if(selectedDifficultyFilter === null)
            {
                selectedDifficultyFilter = IDifficultyEnum.None;
            }

            console.log(selectedDifficultyFilter)
            fetchTests(selectedDifficultyFilter).then((res2) => {
                setState((prev) => {
                    return {
                        ...prev,
                        tests: res2.data
                    }
                });
            })
            .catch((error2) => {
                showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
            });
        })
        .catch((error) => {
            showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
        });

        createTestForm.resetFields();

        setState((prev) => {
            return {
                ...prev,
                openCreateTestModal: false,
            }
        })
    }

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
                                    onClick={() => {createTest()}}
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
                            <Form.Item label="Χρήστες" name="users">
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

                    <Modal
                        open={state.openCreateTestModal}
                        title={"Δημιουργία Τεστ"}
                        onOk={handleCreateTestModalOk}
                        onCancel={handleCreateTestModalCancel}
                        footer={[]}
                    >
                        <Form
                            form={createTestForm}
                            name="createTestForm"
                            layout="vertical"
                            onFinish={handleCreateTestModalOk}
                            style={{ maxWidth: 600 }}
                            autoComplete="off"
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
                            <Form.Item
                                className="form-input"
                                name="questionsNumber"
                                label="Πλήθος ερωτήσεων"
                                rules={[
                                    {
                                        required: true,
                                        message: "Συμπλήρωσε το πλήθος ερωτήσεων."
                                    }
                                ]}
                            >
                                <Slider min={5} max={20}/>
                            </Form.Item>
                            <Form.Item 
                                label="Δυσκολία"
                                name="difficulty"
                                rules={[
                                    {
                                        required: true,
                                        message: "Συμπλήρωσε τη δυσκολία."
                                    }
                                ]}
                            >
                                <Select
                                    size= {"middle"}
                                    placeholder="Επέλεξε δυσκολία."
                                    options={defaultDifficultyFilters.slice(1)}
                                />
                            </Form.Item>
                            <Form.Item
                                className="form-input"
                                name="categories"
                                label="Κατηγορίες"
                                rules={[
                                    {
                                        required: true,
                                        message: "Συμπλήρωσε τις κατηγορίες."
                                    }
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Κατηγορίες"
                                    options={state.categories}
                                    onChange={handleCategoriesChange}
                                />
                            </Form.Item>
                            <Form.Item
                                className="form-input"
                                name="subcategories"
                                label="Υποκατηγορίες"
                                rules={[
                                    {
                                        required: true,
                                        message: "Συμπλήρωσε τις υποκατηγορίες."
                                    }
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    disabled={state.isSubcategoriesDisabled}
                                    style={{ width: '100%' }}
                                    placeholder="Υπόκατηγορίες"
                                    defaultValue={[]}
                                    options={state.subcategories}
                                    filterOption={(input, option) => {
                                        if(option) {
                                            return option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        return false;
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label="Χρήστες" name="users">
                                <TextArea 
                                    placeholder="Email/Username.
Διαχωρισμός χρηστών με enter"
                                    autoSize={{ minRows: 3, maxRows: 5 }} 
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Δημιουργία
                                </Button>
                            </Form.Item>
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