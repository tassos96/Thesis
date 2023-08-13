import { useEffect, useState } from 'react'
import './ResolveTest.css'
import { QuestionDTO } from '../../DTO/QuestionsPage/QuestionDTO';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IChoiseDTO, IExamQuestionDTO } from '../../DTO/TestsPage/IExamQuestionDTO';
import { fetchExamQuestions, updateCategory, validateExamAnswersRequest } from '../../httpServices/HttpServices';
import { Button, Card, Divider, Radio, Result, Space, message } from 'antd';
import { showErrorMessage } from '../../helpers/AppConstants';
import AppBreadcrumb from '../../components/Breadcrumb/AppBreadcrumb';
import { IExamResult } from '../../DTO/TestsPage/IExamResult';

export interface IResolveExamState {
  examId?: number;
  questions?: IExamQuestionDTO[];
  questionsNumber: number;
  userAnswers?: IUserQuestionAnswer[];
  examResult?: IExamResult;

  currentQuestion: number;
  effect: boolean;

  selectedAnswer?: IChoiseDTO;

  showResult: boolean;
}

export interface IUserQuestionAnswer {
  examId: number;
  questionId: number;
  userOption: number;
}

const ResolveExam = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState<IResolveExamState>({
    currentQuestion: 0,
    effect: false,
    questionsNumber: 0,
    showResult: false
  });

  
  useEffect(() => {
    const examId = Number(searchParams.get('examId'))
    setState((prev) => {
      return{
        ...prev,
        examId: examId
      }
    })

    fetchExamQuestions(examId).then((res) => {
      const initUserAnswers = res.data.map(question => ({
        userOption: -1, // defaultValue indication no option,
        examId: examId,
        questionId: question.questionId
      }));
      
      setState((prev) => {
        return {
          ...prev,
          questions: res.data,
          questionsNumber: res.data.length,
          userAnswers: initUserAnswers
        };
      });
    }).catch((error) => {
      showErrorMessage(messageApi, "Η διαδικασία απέτυχε.")
  });
  }, 
  [state.effect]);


  const setSelectedAnswer = (choise : IChoiseDTO) => {
    if(state.userAnswers)
    {
      const updatedUserAnswers = [...state.userAnswers];
      updatedUserAnswers[state.currentQuestion] = {
        ...updatedUserAnswers[state.currentQuestion],
        userOption: choise.answerId
      };

      setState((prev) => {
        return {
          ...prev,
          userAnswers: updatedUserAnswers
        };
      });
    }
    
    setState((prev) => {
      return {
        ...prev,
        selectedAnswer: choise,
      };
    });
  }

  const handleNextQuestion = () => {
    if (state.currentQuestion < state.questionsNumber - 1) {
      setState((prev) => {
        return {
          ...prev,
          currentQuestion: state.currentQuestion + 1,
        };
      });
      console.log(state.currentQuestion)
      console.log(state.userAnswers)
    }
    else
    {
      // Quiz finished
      if(state.userAnswers)
      {
        validateExamAnswersRequest(state.userAnswers).then((res) => {
          const result : IExamResult = {
            examId: res.data.examId,
            grade: res.data.grade,
            correctAnswers: res.data.correctAnswers,
            standing: res.data.standing
          }

          setState((prev) => {
            return {
              ...prev,
              showResult: true,
              examResult: result
            };
          });
        })
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (state.currentQuestion > 0) {
      setState((prev) => {
        return {
          ...prev,
          currentQuestion: state.currentQuestion - 1,
        };
      });
    }
  };

  return (
    <>
    <AppBreadcrumb path="Αρχική/Τεστ/Επίλυση Τεστ" />
    {contextHolder}
    {state.showResult === false ? (
    <div style={{ paddingLeft: '30%', paddingRight: '30%', marginTop: '3%' }}>
      <Card title={`${state.currentQuestion + 1}/${state.questionsNumber}: ${state.questions?.at(state.currentQuestion)?.description}`}>
        <Space direction="vertical">
          <Radio.Group
              onChange={(e) => setSelectedAnswer(e.target.value)}
              value={state.selectedAnswer}
            >
              <Space direction="vertical">
              {state.questions?.at(state.currentQuestion)?.choises.map((choise, index) => (
                <Radio key={index} value={choise}>
                  {choise.description}
                </Radio>
              ))}
            </Space>
          </Radio.Group>

          <Space wrap>
            <Button
              type="primary"
              style={{ marginTop: '10px', marginRight: '10px' }}
              onClick={handlePreviousQuestion}
              disabled={state.currentQuestion === 0}
            >
              Προηγούμενο
            </Button>

            <Button
              type="primary"
              style={{ marginTop: '10px' }}
              onClick={handleNextQuestion}
              disabled={state.currentQuestion === state.questionsNumber - 1 && state.userAnswers?.some(answer => answer.userOption === -1)}
            >
              {state.currentQuestion === (state.questions?.length ?? 0) - 1 ? 'Τέλος' : 'Επόμενο'}
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
    ) : 
    (
      <div style={{ textAlign: "center"}}>
      <Result
        status="success"
        title="Συγχαρητήρια οι απαντήσεις σου καταχωρήθηκαν με επιτυχία."
        subTitle=
        {
          <div>
            <h2>Η βαθμολογία σου είναι: </h2>
            <p><b>Βαθμός:</b> {state.examResult?.grade}%</p>
            <p><b>Σωστές απαντήσεις:</b> {state.examResult?.correctAnswers}/{state.questionsNumber}</p>
            <p><b>Κατάταξη:</b> {state.examResult?.standing}</p>
          </div>
        }
      />
      
      <Button
          type="primary"
          onClick={() => {navigate("/test", {replace: true})}}
        >
          Επιστροφή στα τεστ
      </Button>
      </div>
    )
    }
    </>
  );
}

export default ResolveExam