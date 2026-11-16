
export interface LoginUser {
    email: string;
    password: string;
}
export interface verifyAccount {
    email: string;
    code: string;
}
export interface sendOtp {
    email: string;
}
export interface ResetPassword {
    email: string;
    code: string;
    newPassword: string;
}