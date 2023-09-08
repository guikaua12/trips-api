export interface IPasswordVerify {
    verify(password1: string, password2: string): Promise<boolean>;
}
