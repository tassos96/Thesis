import { ITestDTO } from "./ITestDTO";

export interface IExamDTO {
    examId: number;
    examinerFullname: string;
    assignmentDate: string;
    resolvedDate?: string;
    grade?: number;
    standing?: number;
    test: ITestDTO;
}