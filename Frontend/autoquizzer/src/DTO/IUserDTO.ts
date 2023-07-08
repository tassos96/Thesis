import { IUserRoleDTO } from "./IUserRoleDTO";

export interface IUserDTO{
    id: number;
    roleId: number;
    firstName: string;
    lastName: string;
    age: number;
    genderId: number;
    email: string;
    userName: string;
    password: string;
    role?: IUserRoleDTO;
    securityToken: string;
}