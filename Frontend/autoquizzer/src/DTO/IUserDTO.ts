import { IUserRoleEnum } from "./IUserRoleEnum";

export interface IUserDTO{
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role?: IUserRoleEnum;
    institution: string;
    securityToken: string;
}