import { logger } from "../../utils/logger";
import { DI_TYPES } from "../../di/di.types";
import { ContractPictures } from "../../entities/ContractPictures.entity";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";

@injectable()
export class ContractPicturesRepository extends Repository<ContractPictures> {
    constructor(@inject(DI_TYPES.DataSource) datasource: DataSource) {
        super(ContractPictures, datasource.createEntityManager());
    }

    async createPicture(picture: Partial<ContractPictures>): Promise<string | null> {
        try {
            const result = await this.save(picture);
            logger.info(`Contract Picture Created successfully with id: ${result.id}`);
            return result.id;
        } catch (error) {
            logger.error(`Error while creating Contract Picture. ${error}`);
            return null;
        }
    }

    async createPictures(contractId: string, pictures: Partial<ContractPictures>[]): Promise<string[] | null> {
        try {
            const picturesWithContract = pictures.map(picture => ({
                ...picture,
                contract: { id: contractId }
            }));

            const result = await this.save(picturesWithContract);
            const pictureIds = result.map(picture => picture.id);
            logger.info(`Contract Pictures Created successfully with ids: ${pictureIds.join(', ')}`);
            return pictureIds;
        } catch (error) {
            logger.error(`Error while creating Contract Pictures. ${error}`);
            return null;
        }
    }

    async getPicturesByContractId(contractId: string): Promise<ContractPictures[]> {
        try {
            const result = await this.find({
                where: { contract: { id: contractId } }
            });
            logger.info(`Fetched Pictures for contract: ${contractId}`);
            return result;
        } catch (error) {
            logger.error(`Error while fetching Pictures for contract: ${contractId}. ${error}`);
            return [];
        }
    }
}
