export interface ITestUsersDTO {
    testId: number;
    examId: number;
    userId: number;
    grade: number | null;
    assignmentDate: string;
    resolvedDate: string | null;
    userName: string;
    email: string;
    fullname: string;
}