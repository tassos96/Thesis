import { ITestDTO } from "./ITestDTO";

export interface IExamDTO {
    examId: number;
    assignmentDate: string,
    resolvedDate: string,
    grade: number
    test: ITestDTO
}