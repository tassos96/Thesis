import { IUserRoleEnum } from "./IUserRoleEnum";

export interface IUserDTO{
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    userRole?: IUserRoleEnum;
    institution: string;
    securityToken: string;
}