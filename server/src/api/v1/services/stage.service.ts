import { Repository } from "typeorm";
import { Stage } from "../models/Stage.entity";
import { appDataSource } from "../../../config/DatabaseConfig";
import { DataBaseNotInitializedException } from "../Exceptions/Database.exceptions";

export class StageService {
    private stageRepo !: Repository<Stage>;
    constructor(

    ) {
        if(!appDataSource) {
            throw new DataBaseNotInitializedException();
        } else {
            this.stageRepo = appDataSource.getRepository(Stage);
        }
    }

    async getDefaultStage(): Promise<Stage> {
        return await this.stageRepo.findOneBy({ isDefault: true }) as Stage;
    }

    async getAllStages(): Promise<Stage[]> {
        return await this.stageRepo.find();
    }

    async getStageById(id: number): Promise<Stage> {
        return await this.stageRepo.findOneBy({ id }) as Stage;
    }
}