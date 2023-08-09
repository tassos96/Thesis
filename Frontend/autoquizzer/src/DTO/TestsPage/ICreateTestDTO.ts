import { IDifficultyEnum } from "../IDifficultyEnum";

export interface ICreateTestDTO {
    title: string;
    subject: string;
    difficulty: IDifficultyEnum;
    questionsNumber: number;
    categories: number[];
    subcategories: number[];
    usersToAssign: string[];
}