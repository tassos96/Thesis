import { IUserRoleEnum } from "../IUserRoleEnum";

export interface IUserSignupDTO {
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    phoneNumber: string;
    institution: string;
    userRole: IUserRoleEnum;
}
