import { Card, List, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { QuestionDTO } from "../../DTO/QuestionsPage/QuestionDTO";
import { getQuestionsWithAnswersForUser } from "../../httpServices/HttpServices";
import { showErrorMessage } from "../../helpers/AppConstants";

export interface ITestInfoStudentProps {

}

export interface ITestInfoStudentState {
    isLoading: boolean;
    questions?: QuestionDTO[];
    testId?: number;
}

const TestInfoStudent = (props: ITestInfoStudentProps) => {
    const [searchParams] = useSearchParams();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [state, setState] = useState<ITestInfoStudentState>({ 
        isLoading: true
    })

    useEffect(() => {
        const testId = Number(searchParams.get('testId'))
        if(testId === 0)
        {
            navigate("/not-found", {replace: true})
        }

        getQuestionsWithAnswersForUser(testId).then((res) => {
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
    },[]);

    const resolveTextColor = (question: QuestionDTO, index: number) => {
        if(question.questionAnswers[index].isCorrect)
        {
            return "green"
        }
        else if(!question.questionAnswers[index].isCorrect && question.questionAnswers[index].answerId === question.userChoise)
        {
            return "blue"
        }
        else if(!question.questionAnswers[index].isCorrect && question.questionAnswers[index].answerId !== question.userChoise)
        {
            return "red"
        }
    }

    return (
        <>
        {contextHolder}
        {state.isLoading === false && (
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
                        pageSize: 9,
                        align: 'center'
                    }}
                    footer={[]}
                    renderItem={(question) => (
                        <List.Item>
                            <Card 
                                title={question.description} 
                            >
                                <p style = {{ color: resolveTextColor(question,0)}} >1: {question.questionAnswers[0].description}</p>
                                <p style = {{ color: resolveTextColor(question,1)}} >2: {question.questionAnswers[1].description}</p>
                                <p style = {{ color: resolveTextColor(question,2)}} >3: {question.questionAnswers[2].description}</p>
                                <p style = {{ color: resolveTextColor(question,3)}} >4: {question.questionAnswers[3].description}</p>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        )}
        {state.isLoading === true && (
            <Loader/>
        )}
        </>
    );
}

export default TestInfoStudent;