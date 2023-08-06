import { useEffect, useState } from "react";
import AppBreadcrumb from "../../components/Breadcrumb/AppBreadcrumb";
import Loader from "../../components/Loader/Loader";
import { Button, Form, List, Select, Space, message } from "antd";
import { IDifficultyEnum } from "../../DTO/IDifficultyEnum";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchTests } from "../../httpServices/HttpServices";
import { ITestDTO } from "../../DTO/TestsPage/ITestDTO";
import { showErrorMessage } from "../../helpers/AppConstants";
import { InfoCircleTwoTone } from "@ant-design/icons";

export interface ITestPageState {
    isLoading: boolean;
    selectedDifficultyFilter?: IDifficultyEnum;
    // difficulties?: IOptionDifficulty[];
    tests?: ITestDTO[];
}

export interface IOptionDifficulty {
    value: IDifficultyEnum;
    label: string;
}

const TestsPage = () => { 

    const [searchParams] = useSearchParams();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [state, setState] = useState<ITestPageState>({
        isLoading: false,
        selectedDifficultyFilter: IDifficultyEnum.None
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
                selectedDifficultyFilter: selectedDifficultyFilter
            }
        })
    }, []);

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
                                <Button onClick={() => {}} danger>Διαγραφή</Button>
                                <Button onClick={() => {}}>Επεξεργασία</Button>
                                <Button onClick={() => {}} type="primary">Ανάθεση</Button>
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
            </div>
        ) :
        (
            <Loader/>
        )}
        </>
    );
}

export default TestsPage;