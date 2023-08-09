import { Button, Form, Input, List, Modal, Radio, Select, Space, message } from "antd";
import { useEffect, useState } from "react";
import { addQuestion, deleteQuestionRequest, getCategories, getQuestions, getSubcategories, updateQuestion } from "../../../httpServices/HttpServices";
import { showErrorMessage } from "../../../helpers/AppConstants";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import { QuestionDTO } from "../../../DTO/QuestionsPage/QuestionDTO";
import { ExclamationCircleFilled, InfoCircleTwoTone } from "@ant-design/icons";
import AppBreadcrumb from "../../../components/Breadcrumb/AppBreadcrumb";
import TextArea from "antd/es/input/TextArea";
import { IDifficultyEnum } from "../../../DTO/IDifficultyEnum";
import { QuestionAnswerDTO } from "../../../DTO/QuestionsPage/QuestionAnswerDTO";
import { IQuestionUpdateDTO } from "../../../DTO/QuestionsPage/IQuestionUpdateDTO";

export interface IQuestionPageState {
    isLoading: boolean;
    categories?: IOption[];
    subcategories?: IOption[];
    selectedCategoryId: number;
    selectedSubcategoryId: number;
    questions?: QuestionDTO[];
    isSubcategoryEnabled: boolean;

    modalLoading: boolean;
    openModal: boolean;
    formSubcategories?: IOption[];
    isFormSubcategoriesDisabled: boolean;
    isFormCategoriesDisabled: boolean;
    isQuestionUpdate: boolean;
    updateQuestionId: number;
    updateQuestionCatId: number;
    updateQuestionSubcatId: number;
    updateAns1Id: number;
    updateAns2Id: number;
    updateAns3Id: number;
    updateAns4Id: number;

    hideModalButtons: boolean;
    formDisabled: boolean;
}

export interface IOption {
    value: number;
    label: string;
}

const QuestionsPage = () => {

    const [state, setState] = useState<IQuestionPageState>({
        isLoading: true,
        selectedCategoryId : 0,
        selectedSubcategoryId: 0,
        isSubcategoryEnabled: false,

        modalLoading: false,
        openModal: false,
        isFormSubcategoriesDisabled: true,
        isFormCategoriesDisabled: false,
        isQuestionUpdate: false,
        updateQuestionId: 0,
        updateQuestionCatId: 0,
        updateQuestionSubcatId: 0,
        updateAns1Id: 0,
        updateAns2Id: 0,
        updateAns3Id: 0,
        updateAns4Id: 0,

        hideModalButtons: false,
        formDisabled: false
    });

    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { confirm } = Modal;
    const [form] = Form.useForm();

    useEffect(() => {
        const selectedCategoryId = Number(searchParams.get('categoryId'));
        const selectedSubcategoryId = Number(searchParams.get('subcategoryId'));
        console.log(selectedCategoryId)

        getCategories().then((res) => {
            const defaultFilter: IOption = {
                value: 0,
                label: 'Όλα'
            };
            const categoriesOptions = res.data.map((x) => {
                const optionDTO: IOption = {
                  value: x.categoryId,
                  label: x.title,
                };
                return optionDTO;
              });
            categoriesOptions.push(defaultFilter);
            categoriesOptions.sort((a, b) => a.value.toString().localeCompare(b.value.toString()));

            
            setState((prev) => {
                return {
                    ...prev,
                    categories: categoriesOptions,
                    isSubcategoryEnabled: selectedCategoryId === 0
                };
            });
        })
        .catch((error) => {
            showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
        });

        getSubcategories(selectedCategoryId).then((res) => {
            const defaultFilter: IOption = {
                value: 0,
                label: 'Όλα'
            };
            const subcategoriesOptions = res.data.map((x) => {
                const optionDTO: IOption = {
                  value: x.subcategoryId,
                  label: x.title,
                };
                return optionDTO;
            });
            subcategoriesOptions.push(defaultFilter);
            subcategoriesOptions.sort((a, b) => a.value.toString().localeCompare(b.value.toString()));
            setState((prev) => {
                return {
                    ...prev,
                    subcategories: subcategoriesOptions,
                    isLoading: false,
                    selectedCategoryId: selectedCategoryId,
                    selectedSubcategoryId: selectedSubcategoryId
                };
            });
        })
        .catch((error) => {
            showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
        });

        getQuestions(selectedCategoryId, selectedSubcategoryId).then((res) => {
            setState((prev) => {
                return {
                    ...prev,
                    questions: res.data
                };
            });
        });
    }, []);

    const handleCategoryChange = (value : number) => {

        const selectedCategoryId = Number(value);
        setState((prev) => {
            return {
                ...prev,
                selectedCategoryId: selectedCategoryId,
                selectedSubcategoryId: 0,
                isLoading: true,
                isSubcategoryEnabled: value === 0
            }
        });

        getSubcategories(selectedCategoryId).then((res) => {
            const defaultFilter: IOption = {
                value: 0,
                label: 'Όλα'
            };
            const subcategoriesOptions = res.data.map((x) => {
                const optionDTO: IOption = {
                  value: x.subcategoryId,
                  label: x.title,
                };
                return optionDTO;
            });
            subcategoriesOptions.push(defaultFilter);
            subcategoriesOptions.sort((a, b) => a.value.toString().localeCompare(b.value.toString()));
            setState((prev) => {
                return {
                    ...prev,
                    subcategories: subcategoriesOptions,
                    isLoading: false,
                };
            });
        })
        .catch((error) => {
            showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
        });

        getQuestions(selectedCategoryId, 0).then((res) => {
            setState((prev) => {
                return {
                    ...prev,
                    questions: res.data
                };
            });
        });
    };

    const handleSubcategoryChange = (value : number) => {
        
        const selectedSubcategoryId = Number(value);
        
        setState((prev) => {
            return {
                ...prev,
                selectedSubcategoryId: selectedSubcategoryId
            }
        });
        console.log("subcategoryChange: cat->" + state.selectedCategoryId + " subcat->" + selectedSubcategoryId);

        if(value === 0)
        {
            navigate("/questions")
        }
        else
        {
            navigate("/questions?categoryId=" + state.selectedCategoryId + "&subcategoryId=" + selectedSubcategoryId);
        }
        getQuestions(state.selectedCategoryId, selectedSubcategoryId).then((res) => {
            setState((prev) => {
                return {
                    ...prev,
                    questions: res.data
                };
            });
        });
    };

    const editQuestion = (question : QuestionDTO) => {
        getSubcategories(Number(question.categoryId)).then((res) => {
            const subcategoriesFormOptions = res.data.map((x) => {
                const optionDTO: IOption = {
                    value: x.subcategoryId,
                    label: x.title,
                  };
                  return optionDTO;
            });
            setState((prev) => {
                return {
                    ...prev,
                    formSubcategories: subcategoriesFormOptions,
                    isFormSubcategoriesDisabled: false,
                    isFormCategoriesDisabled: false
                };
            }); 
        });

        form.setFieldsValue({
            categoryId: question.categoryId,
            subcategoryId: question.subcategoryId,
            description: question.description,
            ans1: question.questionAnswers[0].description,
            ans2: question.questionAnswers[1].description,
            ans3: question.questionAnswers[2].description,
            ans4: question.questionAnswers[3].description,
            rightAns: setRightAns(question.questionAnswers),
            difficulty: question.difficulty
        });

        console.log('edit: ' + question.categoryId);

        setState((prev) => {
            return {
                ...prev,
                openModal: true,
                isQuestionUpdate: true,
                updateQuestionId: question.questionId,
                updateQuestionCatId: question.categoryId,
                updateQuestionSubcatId: question.subcategoryId,
                updateAns1Id: question.questionAnswers[0].answerId,
                updateAns2Id: question.questionAnswers[1].answerId,
                updateAns3Id: question.questionAnswers[2].answerId,
                updateAns4Id: question.questionAnswers[3].answerId,
            }
        });
    };

    const deleteQuestion = (categoryId: number, subcategoryId: number, questionId: number) => {
        confirm(
            {
                title: 'Προσοχή',
                icon: <ExclamationCircleFilled />,
                content: 'Είσαι σίγουρος ότι επιθυμείς να διαγραφτεί αυτή η ερώτηση;',
                cancelText: 'Όχι',
                okText: 'Ναί',
                okType: 'danger',
                onOk() {
                    deleteQuestionRequest(categoryId, subcategoryId, questionId)
                    .then((resp) => {
                        setState((prev) => {
                            return {
                                ...prev,
                                modalLoading: true
                            }
                        });
                        getQuestions(state.selectedCategoryId, state.selectedSubcategoryId).then((res) => {
                            setState((prev) => {
                                return {
                                    ...prev,
                                    questions: res.data,
                                    isLoading: false,
                                    isQuestionUpdate: false,
                                    updateQuestionId: 0,
                                    updateQuestionCatId: 0,
                                    updateQuestionSubcatId: 0,
                                    updateAns1Id: 0,
                                    updateAns2Id: 0,
                                    updateAns3Id: 0,
                                    updateAns4Id: 0,
                                    modalLoading: false,
                                    openModal: false
                                };
                            });
                        });
                    })
                    .catch((error) => {
                        showErrorMessage(messageApi, "Η διαδικασία απέτυχε.");
                    });
                },
                onCancel() {
                  console.log('Cancel');
                },
            }
        );
    }

    const setRightAns = (questionAnswers: QuestionAnswerDTO[]) => {
        if(questionAnswers[0].isCorrect) return "ans1"
        else if(questionAnswers[1].isCorrect) return "ans2"
        else if(questionAnswers[2].isCorrect) return "ans3"
        else return "ans4"
    };

    const showModal = () => {
        if(state.selectedCategoryId !== 0)
        {
            form.setFieldsValue({categoryId: state.selectedCategoryId})
            setState((prev) => {
                return {
                    ...prev,
                    isFormCategoriesDisabled: true
                };
            });
        }
        if(state.selectedSubcategoryId !== 0)
        {
            getSubcategories(Number(state.selectedCategoryId)).then((res) => {
                const subcategoriesFormOptions = res.data.map((x) => {
                    const optionDTO: IOption = {
                        value: x.subcategoryId,
                        label: x.title,
                      };
                      return optionDTO;
                });
                setState((prev) => {
                    return {
                        ...prev,
                        formSubcategories: subcategoriesFormOptions,
                        isFormSubcategoriesDisabled: true,
                        isFormCategoriesDisabled: true
                    };
                }); 
            });
            form.setFieldsValue({subcategoryId: state.selectedSubcategoryId})
        }    
        
        setState((prev) => {
            return {
                ...prev,
                openModal: true
            }
        })
    };

    const showInfo = (question : QuestionDTO) => {
        form.setFieldsValue({
            categoryId: question.categoryId,
            subcategoryId: question.subcategoryId,
            description: question.description,
            ans1: question.questionAnswers[0].description,
            ans2: question.questionAnswers[1].description,
            ans3: question.questionAnswers[2].description,
            ans4: question.questionAnswers[3].description,
            rightAns: setRightAns(question.questionAnswers),
            difficulty: question.difficulty
        });
        
        setState((prev) => {
            return {
                ...prev,
                openModal: true,
                hideModalButtons: true,
                formDisabled: true
            }
        })
    };

    const handleOk = (values: any) => {
        const createQuestion: QuestionDTO = {
            questionId: 0,
            categoryId: values.categoryId,
            subcategoryId: values.subcategoryId,
            description: values.description,
            difficulty: values.difficulty,
            questionAnswers: [
                {
                    answerId: 0,
                    description: values.ans1,
                    isCorrect: values.rightAns === "ans1",
                    questionId: 0
                },
                {
                    answerId: 0,
                    description: values.ans2,
                    isCorrect: values.rightAns === "ans2",
                    questionId: 0
                },
                {
                    answerId: 0,
                    description: values.ans3,
                    isCorrect: values.rightAns === "ans3",
                    questionId: 0
                },
                {
                    answerId: 0,
                    description: values.ans4,
                    isCorrect: values.rightAns === "ans4",
                    questionId: 0
                },
            ]
        }

        const updateQuestionDTO: IQuestionUpdateDTO = {
            questionId: state.updateQuestionId,
            categoryId: state.updateQuestionCatId,
            subcategoryId: state.updateQuestionSubcatId,

            newCategoryId: values.categoryId,
            newSubcategoryId: values.subcategoryId,
            newDescription: values.description,
            newDifficulty: values.difficulty,
            questionAnswers: [
                {
                    answerId: state.updateAns1Id,
                    description: values.ans1,
                    isCorrect: values.rightAns === "ans1",
                    questionId: state.updateQuestionId
                },
                {
                    answerId: state.updateAns2Id,
                    description: values.ans2,
                    isCorrect: values.rightAns === "ans2",
                    questionId: state.updateQuestionId
                },
                {
                    answerId: state.updateAns3Id,
                    description: values.ans3,
                    isCorrect: values.rightAns === "ans3",
                    questionId: state.updateQuestionId
                },
                {
                    answerId: state.updateAns4Id,
                    description: values.ans4,
                    isCorrect: values.rightAns === "ans4",
                    questionId: state.updateQuestionId
                },
            ]
        }

        
        {state.isQuestionUpdate === false ? (
            addQuestion(createQuestion).then((resp) => {
                setState((prev) => {
                    return {
                        ...prev,
                        modalLoading: true
                    }
                });
                getQuestions(state.selectedCategoryId, state.selectedSubcategoryId).then((res) => {
                    setState((prev) => {
                        return {
                            ...prev,
                            questions: res.data,
                            isLoading: false,
                            isQuestionUpdate: false,
                            updateQuestionId: 0,
                            updateQuestionCatId: 0,
                            updateQuestionSubcatId: 0,
                            updateAns1Id: 0,
                            updateAns2Id: 0,
                            updateAns3Id: 0,
                            updateAns4Id: 0,
                            openModal: false,
                            modalLoading: false
                        };
                    });
                })
                .catch((error) => {
                    showErrorMessage(messageApi, "Η διαδικασία απέτυχε.");
                });
                form.resetFields();
            })
        ) :
        (
            updateQuestion(updateQuestionDTO).then((resp) => {
                setState((prev) => {
                    return {
                        ...prev,
                        modalLoading: true
                    }
                });
                getQuestions(state.selectedCategoryId, state.selectedSubcategoryId).then((res) => {
                    setState((prev) => {
                        return {
                            ...prev,
                            questions: res.data,
                            isLoading: false,
                            isQuestionUpdate: false,
                            updateQuestionId: 0,
                            updateQuestionCatId: 0,
                            updateQuestionSubcatId: 0,
                            updateAns1Id: 0,
                            updateAns2Id: 0,
                            updateAns3Id: 0,
                            updateAns4Id: 0,
                            openModal: false,
                            modalLoading: false
                        };
                    });
                })
                .catch((error) => {
                    showErrorMessage(messageApi, "Η διαδικασία απέτυχε.");
                });
                form.resetFields();
            })
        )}
    };

    const handleCancel = () => {
        form.resetFields();
        setState((prev) => {
            return {
                ...prev,
                modalLoading: false,
                openModal: false,
                isFormSubcategoriesDisabled: true,
                isFormCategoriesDisabled: false,
                isQuestionUpdate: false,
                updateQuestionId: 0,
                updateQuestionCatId: 0,
                updateQuestionSubcatId: 0,
                updateAns1Id: 0,
                updateAns2Id: 0,
                updateAns3Id: 0,
                updateAns4Id: 0,
                formSubcategories: [],
                hideModalButtons: false,
                formDisabled: false
            }
        })
    };

    const handleCategoriesChangeForm = (categoryId: number) => {      
        console.log('cat: ' + categoryId);
        form.setFieldsValue({subcategoryId: null});
        getSubcategories(categoryId).then((res) => {
            const subcategoriesFormOptions = res.data.map((x) => {
                const optionDTO: IOption = {
                    value: x.subcategoryId,
                    label: x.title,
                  };
                  return optionDTO;
            });
            setState((prev) => {
                return {
                    ...prev,
                    formSubcategories: subcategoriesFormOptions,
                    isFormSubcategoriesDisabled: false,
                    isFormCategoriesDisabled: false,
                };
            }); 
        });
    };

    
    return (
        <>
        <AppBreadcrumb path="Αρχική/Ερωτήσεις" />
        {state.isLoading === false ? (
        <div>
            <Space style={{width: "100%", marginTop: '1%'}} wrap>
                <Form layout="vertical">
                    <Form.Item label="Κατηγορία">
                        <Select
                            style={{ width: 300,marginBottom: "2%"}}
                            size= {"middle"}
                            value={state.selectedCategoryId}
                            placeholder="Επέλεξε κατηγορία για να φιλτράρεις"
                            onChange={(values) => handleCategoryChange(values)}
                            options={state.categories}
                        />
                    </Form.Item>
                </Form>
                <Form layout="vertical">
                    <Form.Item label="Υποκατηγορία">
                        <Select
                            style={{ width: 300,marginBottom: "2%"}}
                            size= {"middle"}
                            value={state.selectedSubcategoryId}
                            placeholder="Επέλεξε υπόκατηγορία για να φιλτράρεις"
                            onChange={(values) => handleSubcategoryChange(values)}
                            options={state.subcategories}
                            disabled = {state.isSubcategoryEnabled}
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
                    dataSource={state.questions}
                    renderItem={(item) => (
                    <List.Item
                        actions=
                        {[
                            <Space wrap>
                                <Button onClick={() => deleteQuestion(item.categoryId, item.subcategoryId, item.questionId)} danger>Διαγραφή</Button>
                                <Button onClick={() => editQuestion(item)}>Επεξεργασία</Button>
                            </Space>
                        ]}
                    >
                        <List.Item.Meta
                        avatar={<InfoCircleTwoTone />}
                        title={<a onClick={() => showInfo(item)}>{item.description}</a>}
                        description={"Δυσκολία: " + item.difficulty}
                        />
                    </List.Item>
                    )}
                    footer={
                        <Space wrap>
                            <Button
                                type="primary"
                                className="add-category-button"
                                onClick={showModal}
                            >
                                Προσθήκη ερώτησης
                            </Button>
                        </Space>
                    }
                />
            </div>
            {contextHolder}
            <div className="modal">
                <Modal
                    open={state.openModal}
                    title="Προσθήκη ερώτησης"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[]}
                >
                    <Form
                        form={form}
                        name="createQuestion"
                        className="create-question-form"
                        onFinish={handleOk}
                        layout="vertical"
                        scrollToFirstError
                        disabled= {state.formDisabled}
                    >
                        <Form.Item
                            className="form-input"
                            name="categoryId"
                            label="Κατηγορία"
                            rules={[
                                {
                                    required: true,
                                    message: "Επέλεξε την κατηγορία."
                                }
                            ]}
                        >
                            <Select
                                    size={"middle"}
                                    placeholder="Επέλεξε κατηγορία στην οποία ανήκει."
                                    onChange={(value)=> handleCategoriesChangeForm(value)}
                                    options={state.categories?.slice(1)}
                                    disabled={state.isFormCategoriesDisabled}
                                />
                        </Form.Item>
                        <Form.Item
                            className="form-input"
                            name="subcategoryId"
                            label="Υποκατηγορία"
                            rules={[
                                {
                                    required: true,
                                    message: "Επέλεξε την υποκατηγορία."
                                }
                            ]}
                        >
                            <Select
                                    size={"middle"}
                                    placeholder="Επέλεξε κατηγορία στην οποία ανήκει."
                                    options={state.formSubcategories}
                                    disabled={state.isFormSubcategoriesDisabled}
                                />
                        </Form.Item>
                        <Form.Item
                            className="form-input"
                            name="description"
                            label="Περιγραφή"
                            rules={[
                                {
                                    required: true,
                                    message: "Συμπλήρωσε τη περιγραφή."
                                }
                            ]}
                        >
                            <TextArea rows={2} />
                        </Form.Item>
                        
                        <Form.Item
                            className="form-input"
                            name="ans1"
                            label="Επιλογή 1"
                            rules={[
                                {
                                    required: true,
                                    message: "Συμπλήρωσε τη περιγραφή."
                                }
                            ]}
                        >
                            <TextArea rows={2} />
                        </Form.Item>
                        
                        <Form.Item
                            className="form-input"
                            name="ans2"
                            label="Επιλογή 2"
                            rules={[
                                {
                                    required: true,
                                    message: "Συμπλήρωσε τη περιγραφή."
                                }
                            ]}
                        >
                            <TextArea rows={2} />
                        </Form.Item>

                        <Form.Item
                            className="form-input"
                            name="ans3"
                            label="Επιλογή 3"
                            rules={[
                                {
                                    required: true,
                                    message: "Συμπλήρωσε τη περιγραφή."
                                }
                            ]}
                        >
                            <TextArea rows={2} />
                        </Form.Item>
                        
                        <Form.Item
                            className="form-input"
                            name="ans4"
                            label="Επιλογή 4"
                            rules={[
                                {
                                    required: true,
                                    message: "Συμπλήρωσε τη περιγραφή."
                                }
                            ]}
                        >
                            <TextArea rows={2} />
                        </Form.Item>
                        
                        <Form.Item label="Σωστή απάντηση" name="rightAns">
                            <Radio.Group>
                                <Radio value="ans1"> Επιλογή 1 </Radio>
                                <Radio value="ans2"> Επιλογή 2 </Radio>
                                <Radio value="ans3"> Επιλογή 3 </Radio>
                                <Radio value="ans4"> Επιλογή 4 </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item label="Δυσκολία" name="difficulty">
                            <Radio.Group>
                                <Radio value={IDifficultyEnum.Easy}> Εύκολη </Radio>
                                <Radio value={IDifficultyEnum.Medium}> Μεσαία </Radio>
                                <Radio value={IDifficultyEnum.Hard}> Δύσκολη </Radio>
                                <Radio value={IDifficultyEnum.VeryHard}> Πολύ δύσκολη </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Space wrap>
                            <Form.Item>
                                <Button key="back" onClick={handleCancel}>
                                    Πίσω
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button className="add-category-button" key="submit" htmlType="submit" type="primary" loading={state.modalLoading}>
                                    Αποθήκευση
                                </Button>
                            </Form.Item>
                            </Space>
                        </Form>
                    </Modal>
            </div>
        </div>
        ) : 
        (
            <Loader/>
        )}
        </>
    );
}

export default QuestionsPage;