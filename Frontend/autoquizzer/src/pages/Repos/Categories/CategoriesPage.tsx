import { Button, Card, Form, Input, List, Modal, Popconfirm, Space, message } from "antd";
import AppBreadcrumb from "../../../components/Breadcrumb/AppBreadcrumb";
import "./CategoriesPage.css";
import { AppRoutes, showErrorMessage } from "../../../helpers/AppConstants";
import { ICategoryDTO } from "../../../DTO/CategoriesPage/ICategoryDTO";
import { useEffect, useState } from "react";
import { addCategory, deleteCategoryRequest, getCategories, updateCategory } from "../../../httpServices/HttpServices";
import Loader from "../../../components/Loader/Loader";
import TextArea from "antd/es/input/TextArea";
import FormItem from "antd/es/form/FormItem";
import { ExclamationCircleFilled } from "@ant-design/icons";

export interface ICategoriesPageState {
    categories?: ICategoryDTO[];
    isLoading: boolean;
    modalLoading: boolean;
    openModal: boolean;
    isUpdateCategory: boolean;
    updateCategoryId: number;
}

const CategoriesPage = () => {

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const { confirm } = Modal;

    const [state, setState] = useState<ICategoriesPageState>({
        isLoading: true,
        modalLoading: false,
        openModal: false,
        isUpdateCategory: false,
        updateCategoryId: 0
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
        console.log('i fire once');
        getCategories().then((res) => {
            setState((prev) => {
                return {
                    ...prev,
                    categories: res.data,
                    isLoading: false
                };
            });
        })
        .catch((error) => {
            showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
        });
    }, []);

    const deleteCategory = (id: number) => {
        confirm({
            title: 'Προσοχή',
            icon: <ExclamationCircleFilled />,
            content: 'Είσαι σίγουρος ότι επιθυμείς να διαγραφτεί αυτή η κατηγορία;',
            okText: 'Ναί',
            okType: 'danger',
            cancelText: 'Όχι',
            onOk() {
                deleteCategoryRequest(id)
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
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });   
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
        })
    }

    return (
        <>
            <AppBreadcrumb path="Αρχική/Κατηγορίες" />
            {state.isLoading === false ? (
            <div className="cardListWrapper">
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
                                Προσθήκη κατηγορίας
                            </Button>
                        </Space>
                    }
                    renderItem={(category) => (
                        <List.Item>
                            <Card 
                                title={<a href={AppRoutes.Subcategories + "?id=" + category.categoryId}>{category.title}</a>} 
                                actions=
                                {[
                                    <Space wrap>
                                        <Button onClick={() => deleteCategory(category.categoryId)} danger>Διαγραφή</Button>
                                        <Button onClick={() => editCategory(category.categoryId, category.title, category.description)}>Επεξεργασία</Button>
                                    </Space>
                                ]}
                            >
                                <a href={AppRoutes.Subcategories + "?id=" + category.categoryId}>
                                    {category.description}
                                </a>
                            </Card>
                        </List.Item>
                    )}
                />
                    <Modal
                        open={state.openModal}
                        title={state.isUpdateCategory ? "Επεξεργασία κατηγορίας" : "Προσθήκη κατηγορίας"}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                        ]}
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
                                name="categoryTitle"
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
                                name="categoryDescription"
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

export default CategoriesPage;