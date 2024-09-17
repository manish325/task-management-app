import * as yup from "yup";
import { ERROR_MESSAGES } from "../../../utils/constants/enums";

export const loginSchema = yup.object().shape({
    email: yup.string().email(ERROR_MESSAGES.INCORRECT_EMAIL).required(ERROR_MESSAGES.REQUIRED),
    password: yup.string().required(ERROR_MESSAGES.REQUIRED)
});

export const RegisterSchema = yup.object().shape({
    firstName: yup.string().required(ERROR_MESSAGES.REQUIRED),
    lastName: yup.string().required(ERROR_MESSAGES.REQUIRED),
    email: yup.string().email(ERROR_MESSAGES.INCORRECT_EMAIL).required(ERROR_MESSAGES.REQUIRED),
    password: yup.string().required(ERROR_MESSAGES.REQUIRED),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required')
});