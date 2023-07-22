import { Button, Card, List, Space } from "antd";
import AppBreadcrumb from "../../../components/Breadcrumb/AppBreadcrumb";
import "./CategoriesPage.css";
import { AppRoutes } from "../../../helpers/AppConstants";
import { ICategoryDTO } from "../../../DTO/CategoriesPage/ICategoryDTO";
import { useEffect, useState } from "react";
import { getCategories } from "../../../httpServices/HttpServices";
import Loader from "../../../components/Loader/Loader";

export interface ICategoriesPageState {
    categories?: ICategoryDTO[];
    isLoading: boolean;
}

const CategoriesPage = () => {

    const [state, setState] = useState<ICategoriesPageState>({
        isLoading: true,
    });

    useEffect(() => {
        getCategories().then((res) => {
            setState((prev) => {
                return {
                    ...prev,
                    categories: res.data,
                    isLoading: false
                };
            });
        });
    }, []);
    
    // const data = [
    //     {
    //         id: 1,  
    //         title: 'Title 1',
    //         description: 'Description'
    //     },
    //     {
    //         id: 2,  
    //         title: 'Title 2',
    //         description: 'Description'
    //     },
    //     {
    //         id: 3,
    //         title: 'Title 3',
    //         description: 'Description'
    //     },
    //     {
    //         id: 4,
    //         title: 'Title 4',
    //         description: 'Description'
    //     },
    //     {
    //         id: 5,
    //         title: 'Title 5',
    //         description: 'Description'
    //     },
    //     {
    //         id: 6,
    //         title: 'Title 6',
    //         description: 'Description'
    //     },
    // ];

    const deleteCategory = (id: number) => {
        console.log(id);
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
                            >
                                Προσθήκη κατηγορίας
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
                                        <Button onClick={() => deleteCategory(category.categoryId)}>Επεξεργασία</Button>
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