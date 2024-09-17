import * as yup from "yup";
import { ERROR_MESSAGES } from "../../../utils/constants/enums";

export const loginSchema = yup.object().shape({
    username: yup.string().email(ERROR_MESSAGES.INCORRECT_EMAIL).required(ERROR_MESSAGES.REQUIRED),
    password: yup.string().required(ERROR_MESSAGES.REQUIRED)
});

export const RegisterSchema = yup.object().shape({
    firstName: yup.string().required(ERROR_MESSAGES.REQUIRED),
    lastName: yup.string().required(ERROR_MESSAGES.REQUIRED),
    email: yup.string().email(ERROR_MESSAGES.INCORRECT_EMAIL).required(ERROR_MESSAGES.REQUIRED),
    mobile: yup.string().length(10).required(ERROR_MESSAGES.REQUIRED),
    password: yup.string().required(ERROR_MESSAGES.REQUIRED),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
    username : yup.string().required(ERROR_MESSAGES.REQUIRED)
});

export const TaskSchema = yup.object().shape({
    title: yup.string().required(ERROR_MESSAGES.REQUIRED),
    description: yup.string().required(ERROR_MESSAGES.REQUIRED).min(10, ERROR_MESSAGES.LENGTH), 
});

export const searchTaskSchema = yup.object().shape({
    searchText  : yup.string()
})