import { Button, Card, Form, FormInstance, Input, List, Modal, Select, Space, message } from "antd";
import AppBreadcrumb from "../../../components/Breadcrumb/AppBreadcrumb";
import "./Subcategories.css";
import { AppRoutes, showErrorMessage } from "../../../helpers/AppConstants";
import { ICategoryDTO } from "../../../DTO/CategoriesPage/ICategoryDTO";
import { useEffect, useState } from "react";
import { addCategory, deleteCategoryRequest, getCategories, updateCategory } from "../../../httpServices/HttpServices";
import Loader from "../../../components/Loader/Loader";
import TextArea from "antd/es/input/TextArea";
import FormItem from "antd/es/form/FormItem";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export interface ISubcategoriesPageState {
    categories?: ICategoryDTO[];
    isLoading: boolean;
    modalLoading: boolean;
    openModal: boolean;
    isUpdateCategory: boolean;
    updateCategoryId: number;
    categoriesOptions: IOption[];
    selectedCategoryId: number;
}

export interface IOption {
    value: number;
    label: string;
  }

const SubcategoriesPage = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const [state, setState] = useState<ISubcategoriesPageState>({
        isLoading: true,
        modalLoading: false,
        openModal: false,
        isUpdateCategory: false,
        updateCategoryId: 0,
        categoriesOptions: [],
        selectedCategoryId: 0
    });

    const showModal = () => {
        setState((prev) => {
            return {
                ...prev,
                openModal: true
            }
        })
      };

    const handleOk = (values: any) => {
        const createNewCategory: ICategoryDTO = {
            categoryId: state.updateCategoryId,
            description: values.categoryDescription,
            title: values.categoryTitle
        };

        {state.isUpdateCategory === false ? (
        addCategory(createNewCategory)
            .then((resp) => {
                setState((prev) => {
                    return {
                        ...prev,
                        modalLoading: true
                    }
                })
                getCategories().then((res) => {
                    setState((prev) => {
                        return {
                            ...prev,
                            categories: res.data,
                            isLoading: false,
                            isUpdateCategory: false,
                            updateCategoryId: 0,
                            modalLoading: false,
                            openModal: false
                        };
                    });
                });
            })
            .catch((error) => {
                showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
            })
        ) :
        (
            updateCategory(createNewCategory)
            .then((resp) => {
                setState((prev) => {
                    return {
                        ...prev,
                        modalLoading: true
                    }
                })
                getCategories().then((res) => {
                    setState((prev) => {
                        return {
                            ...prev,
                            categories: res.data,
                            isLoading: false,
                            isUpdateCategory: false,
                            updateCategoryId: 0,
                            modalLoading: false,
                            openModal: false
                        };
                    });
                });
            })
            .catch((error) => {
                showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
            })
        )}
    };

    const handleCancel = () => {
        form.resetFields();
        setState((prev) => {
            return {
                ...prev,
                openModal: false,
                isUpdateCategory: false,
                updateCategoryId: 0
            }
        })
      };

    useEffect(() => {
        const selectedCategoryId = Number(searchParams.get('id')); // 10
        console.log(`selected ${selectedCategoryId}`);
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
                    categories: res.data,
                    isLoading: false,
                    categoriesOptions: categoriesOptions,
                    selectedCategoryId: selectedCategoryId
                };
            });

        })
        .catch((error) => {
            showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
        });
    }, []);

    const deleteCategory = (id: number) => {
        deleteCategoryRequest(id)
            .then((resp) => {
                setState((prev) => {
                    return {
                        ...prev,
                        modalLoading: true
                    }
                });
                getCategories().then((res) => {
                    setState((prev) => {
                        return {
                            ...prev,
                            categories: res.data,
                            isLoading: false,
                            isUpdateCategory: false,
                            updateCategoryId: 0,
                            modalLoading: false,
                            openModal: false
                        };
                    });
                });
            })
            .catch((error) => {
                showErrorMessage(messageApi, "Η διαδικασία απέτυχε.");
            })
    };

    const editCategory = (id: number, title:string, description: string) => {
        console.log(id, title, description);
        form.setFieldsValue({ categoryTitle: title, categoryDescription: description });
        setState((prev) => {
            return {
                ...prev,
                openModal: true,
                isUpdateCategory: true,
                updateCategoryId: id
            }
        });
    }

    const handleChange = (value: number) => {
        console.log(`selected ${value}`);
        if(value === 0)
        {
            navigate("/subcategories")
        }
        else
        {
            navigate("/subcategories?id=" + value);
        }
        const selectedCategoryId = Number(value);
        setState((prev) => {
            return {
                ...prev,
                selectedCategoryId: selectedCategoryId
            }
        });
      };

    return (
        <>
            <AppBreadcrumb path="Αρχική/Κατηγορίες" />
            {state.isLoading === false ? (
            <div className="cardListWrapper">
                <Space style={{width: "100%"}}>
                    <Select
                    style={{ width: 300,marginBottom: "20%", marginTop: "5%" }}
                    size= {"middle"}
                    value={state.selectedCategoryId}
                    placeholder="Επέλεξε κατηγορία για να φιλτράρεις"
                    onChange={(values) => handleChange(values)}
                    options={state.categoriesOptions}
                    />
                </Space>
                <List
                    grid={{
                        gutter: 16,xs: 1,sm: 2,md: 4,lg: 4,xl: 6,xxl: 3
                    }}
                    dataSource={state.categories}
                    pagination = {{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 9,
                        align: 'center'
                    }}
                    footer={
                        <Space wrap>
                            <Button
                                type="primary"
                                className="add-category-button"
                                onClick={showModal}
                            >
                                Προσθήκη υποκατηγορίας
                            </Button>
                        </Space>
                    }
                    renderItem={(category) => (
                        <List.Item>
                            <Card 
                                title={<a href={AppRoutes.Subcategories + "/" + category.categoryId}>{category.title}</a>} 
                                actions=
                                {[
                                    <Space wrap>
                                        <Button onClick={() => deleteCategory(category.categoryId)} danger>Διαγραφή</Button>
                                        <Button onClick={() => editCategory(category.categoryId, category.title, category.description)}>Επεξεργασία</Button>
                                    </Space>
                                ]}
                            >
                                <a href={AppRoutes.Subcategories + "/" + category.categoryId}>
                                    {category.description}
                                </a>
                            </Card>
                        </List.Item>
                    )}
                />
                    <Modal
                        open={state.openModal}
                        title="Προσθήκη υποκατηγορίας"
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[]}
                    >
                        <Form
                            form={form}
                            name="createCategory"
                            className="create-category-form"
                            onFinish={handleOk}
                            layout="vertical"
                            scrollToFirstError
                        >
                            <Form.Item
                                className="form-input"
                                name="subcategoryTitle"
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
                                name="subcategoryDescription"
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
                                name="categoryId">
                                <Select
                                    //style={{ width: "auto"}}
                                    size={"middle"}
                                    //value={state.selectedCategoryId}
                                    placeholder="Επέλεξε κατηγορία στην οποία ανήκει."
                                    //onChange={(values) => handleChange(values)}
                                    options={state.categoriesOptions.slice(1)}
                                />
                            </Form.Item>
                            <Space wrap>
                            <FormItem>
                            <Button key="back" onClick={handleCancel}>
                                Πίσω
                            </Button>
                            </FormItem>
                            <FormItem>
                            <Button className="add-category-button" key="submit" htmlType="submit" type="primary" loading={state.modalLoading}>
                                Αποθήκευση
                            </Button>
                            </FormItem>
                            </Space>
                        </Form>
                    </Modal>
            </div>
            )
            :
            (
                <Loader/>
            )}
        </>
    );
}

export default SubcategoriesPage;