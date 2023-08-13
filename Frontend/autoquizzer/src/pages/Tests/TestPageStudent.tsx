import { Button, Form, List, Select, Space, message } from "antd";
import { IDifficultyEnum } from "../../DTO/IDifficultyEnum";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppRoutes, showErrorMessage } from "../../helpers/AppConstants";
import { fetchUserExams } from "../../httpServices/HttpServices";
import { IExamDTO } from "../../DTO/TestsPage/IExamDTO";
import { IOptionDifficulty } from "./TestsPage";
import { InfoCircleTwoTone } from "@ant-design/icons";
import "./TestsPage.css"

export interface ITestPageStudentProps {

}

export interface ITestPageStudentState {
    isLoading: boolean;
    selectedDifficultyFilter?: IDifficultyEnum;
    tests?: IExamDTO[];
    effect: boolean;
}

const TestPageStudent = (props: ITestPageStudentProps) => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [messageApi, contextHolder] = message.useMessage();
    const [state, setState] = useState<ITestPageStudentState>({ 
        isLoading: true,
        selectedDifficultyFilter: IDifficultyEnum.None,
        effect: false
    })

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
        fetchUserExams(selectedDifficultyFilter).then((res) => {
            setState((prev) => {
                return {
                    ...prev,
                    tests: res.data,
                    isLoading: false,
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

        fetchUserExams(value).then((res) => {
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

    const solveTest = (examId: number) => {
        navigate("/test/resolveExam?examId=" + examId);
    };

    return (
        <>
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
                                <Button type="primary" onClick={() => solveTest(item.examId)} disabled={item.resolvedDate !== undefined}>Επίλυση</Button>
                            </Space>
                        ]}
                    >
                        <List.Item.Meta
                        avatar={<InfoCircleTwoTone />}
                        title={<a href= {item.resolvedDate !== undefined ? AppRoutes.TestInfo +"?testId=" + item.test.testId : ""}>{item.test.title}</a>}
                        description={
                            <div className= "container">
                                <div className="div1">
                                    <p><b>Εξεταστής:</b> {item.examinerFullname}</p>
                                    <p><b>Δυσκολία:</b> {item.test.difficulty}</p>
                                    <p><b>Ημ/νία Ανάθεσης:</b> {item.assignmentDate}</p>
                                </div>
                                <div className="div2">
                                    {item.resolvedDate !== undefined && (<p><b>Ημ/νία Επίλυσης:</b> {item.resolvedDate}</p>)}
                                    {item.grade !== undefined && (<p><b>Βαθμός:</b> {item.grade}%</p>)}
                                    {item.standing !== undefined && (<p><b>Κατάταξη:</b> {item.standing}</p>)}
                                </div>
                            </div>
                        }
                        />
                    </List.Item>
                    )}
                    footer={
                        []
                    }
                />
            </div>
        </>
    );
};

export default TestPageStudent;