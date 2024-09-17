export interface IAuthenticationProps {
    
}

export interface ILoginForm {
    email : string,
    password : string
}

export interface IRegisterForm {
    email : string,
    firstName : string,
    lastName : string,
    password : string,
    confirmPassword : string,
}

export interface IAuthState {
    loading : boolean,
    snackbarMessage : string
}

export interface IAuthContext {
    state : IAuthState | undefined,
    login : (loginData : ILoginForm) => void,
    register : (registerData : IRegisterForm) => void,
    handleGoogleLogin : (response : any) => void,
    authDispatch : (action : AuthAction) => void
}

export interface AuthAction {
    type : string,
    payload : any
};

export interface ILoginWithGoogle {
    authToken : string
}