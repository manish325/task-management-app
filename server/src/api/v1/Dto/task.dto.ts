import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsArray,
    IsBoolean
} from "class-validator";
import { Errors } from "../../../config/constants";

export class TaskDto {
    @IsNotEmpty(
        {
            message : Errors.TASK_NAME_REQUIRED
        }
    )
    @IsString()
    title !: string;

    @IsNotEmpty({
        message: Errors.TASK_DESCRIPTION_REQUIRED
    })
    @IsString()
    description !: string;
}

export class EditTaskDto extends TaskDto {
    @IsNotEmpty({
        message : Errors.TASK_ID_REQUIRED
    })
    @IsNumber()
    id !: number;
}

export class UpdateTaskStage {
    @IsNotEmpty(
        {
            message : Errors.TASK_ID_REQUIRED
        }
    )
    @IsNumber()
    taskId !: number;

    @IsNotEmpty({
        message : Errors.STAGE_ID_REQUIRED
    })
    @IsNumber()
    stageId !: number;
}