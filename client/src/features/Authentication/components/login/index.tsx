import { FC, useContext } from "react";
import "./signin.scss";
import { Link } from "react-router-dom";
import {useForm} from "react-hook-form"
import { IAuthContext, IAuthState, ILoginForm } from "../../types";
import { TextField, Button, CircularProgress } from "@mui/material";
import { loginSchema } from "../../schema";
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from "../../contexts/auth.context";
import {FcGoogle} from "react-icons/fc"
import {
    useGoogleLogin
} from "@react-oauth/google";

const Login: FC = () => {
    const {state, login, handleGoogleLogin} = useContext(AuthContext) as IAuthContext;
    const {loading} = state as IAuthState || {};
    const {
        register,
        handleSubmit,
        formState : {errors, isSubmitting},
    } = useForm<ILoginForm>({
        defaultValues : {},
        resolver : yupResolver(loginSchema)
    });
    const googleLogin = useGoogleLogin({
        onSuccess : handleGoogleLogin,
        scope: 'openid profile email'
    })

    return (
        <main className="login">
            <h1> login </h1>
            <form className="login-form" onSubmit={handleSubmit(login)}>

                <div className="form-field">
                    <TextField {...register("email")} error={errors.email?.message ? true : false} placeholder="Email"></TextField>
                    <span className="error">{errors.email?.message}</span>
                </div>

                <div className="form-field">
                    <TextField {...register("password")} error={errors.password?.message ? true : false} type="password" placeholder="Password" ></TextField>
                    <span className="error">{errors.password?.message}</span>
                </div>

                <Button type="submit">
                    {
                        loading && isSubmitting ? <CircularProgress/> : 'Submit'
                    }
                </Button>

            </form>
            <Button className="sign-in-with-google" onClick={googleLogin as any}>
                <FcGoogle/> <span>Sign in with Google</span>
            </Button>
            <Link to='/auth/register'>
                Click here to go to Register
            </Link>
        </main>
    )
}

export default Login;