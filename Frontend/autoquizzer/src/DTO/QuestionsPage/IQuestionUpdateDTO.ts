import { IDifficultyEnum } from "../IDifficultyEnum";
import { QuestionAnswerDTO } from "./QuestionAnswerDTO";

export interface IQuestionUpdateDTO {
    questionId: number;
    categoryId: number;
    subcategoryId: number;

    newCategoryId: number;
    newSubcategoryId: number;
    newDescription: string;
    newDifficulty: IDifficultyEnum;
    questionAnswers: QuestionAnswerDTO[];
}