import { IDifficultyEnum } from "../IDifficultyEnum";

export interface IExamQuestionDTO {
    questionId: number;
    description: string;
    difficulty: IDifficultyEnum;
    choises: IChoiseDTO[];
}

export interface IChoiseDTO {
    answerId: number;
    description: string;
}