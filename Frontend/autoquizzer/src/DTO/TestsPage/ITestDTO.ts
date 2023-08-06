import { IDifficultyEnum } from "../IDifficultyEnum";

export interface ITestDTO {
    testId: number;
    title: string;
    subject: string;
    difficulty: IDifficultyEnum;
    questionsNumber: number;
    categories: string;
    subcategories: string;
}