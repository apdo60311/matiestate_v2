import { DI_TYPES } from "../di/di.types";
import { Building } from "../entities/Building.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm"

@injectable()
export class BuildingsRepository extends Repository<Building> {

    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {

        super(Building, datasource.createEntityManager());
    }

    async getBuildings(): Promise<string> {
        return "List of buildings";
    }

    async findByCity(city: string): Promise<Building[]> {
        return [];
    }

    async findWithRelations(): Promise<Building[]> {
        return [];
    }
}