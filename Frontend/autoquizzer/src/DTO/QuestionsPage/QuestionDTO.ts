import { IDifficultyEnum } from "../IDifficultyEnum";
import { QuestionAnswerDTO } from "./QuestionAnswerDTO";

export interface QuestionDTO {
    questionId : number;
    difficulty: IDifficultyEnum;
    description: string;
    subcategoryId: number;
    categoryId: number;
    questionAnswers: QuestionAnswerDTO[];
}
