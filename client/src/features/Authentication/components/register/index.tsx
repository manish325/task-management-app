import { FC, useContext } from "react"
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IAuthContext, IAuthState, IRegisterForm } from "../../types";
import { Button, TextField, CircularProgress } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from "../../schema";
import "./register.scss";
import { AuthContext } from "../../contexts/auth.context";

const Register: FC = () => {
    const {
        state, register : onRgister
    } = useContext(AuthContext) as IAuthContext;
    const {loading} = state as IAuthState || {};
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<IRegisterForm>({
        defaultValues : {},
        resolver: yupResolver(RegisterSchema)
    });

    
    return (
        <main className="register">
            <h1> Register </h1>
            <form className="register-form" onSubmit={handleSubmit(onRgister)}>

                <div className="form-field">
                    <TextField {...register("firstName")} error={errors.firstName?.message ? true : false} placeholder="First Name"></TextField>
                    <span className="error">{errors.firstName?.message}</span>
                </div>

                <div className="form-field">
                    <TextField {...register("lastName")} error={errors.lastName?.message ? true : false} placeholder="Last Name"></TextField>
                    <span className="error">{errors.lastName?.message}</span>
                </div>

                <div className="form-field">
                    <TextField {...register("email")} error={errors.email?.message ? true : false} placeholder="Email"></TextField>
                    <span className="error">{errors.email?.message}</span>
                </div>

                <div className="form-field">
                    <TextField {...register("password")} error={errors.password?.message ? true : false} type="password" placeholder="Password"></TextField>
                    <span className="error">{errors.password?.message}</span>
                </div>

                <div className="form-field">
                    <TextField {...register("confirmPassword")} error={errors.confirmPassword?.message ? true : false} type="password" placeholder="Confirm Password"></TextField>
                    <span className="error">{errors.confirmPassword?.message}</span>
                </div>
            </form>
                <Button type="submit" variant="contained">
                    {
                        isSubmitting && loading ? <CircularProgress/> : 'Sign up'
                    }
                </Button>
            <Link to={'/auth/login'}>
                Click here to go to login
            </Link>
        </main>
    )
}

export default Register;