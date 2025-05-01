import { SubscriptionDTO } from "src/app/application/dtos/subscription.dto";
import { SubscriptionEntity } from "src/app/domain/entities/subscription.entity";


export class SubscriptionMapper {
    static toDTO(entity: SubscriptionEntity): SubscriptionDTO {
        return {
            id: entity.id,
            price: entity.price,
            name: entity.name,
            status: entity.status,
        };
    }

    static toEntity(dto: SubscriptionDTO): SubscriptionEntity {
        return new SubscriptionEntity(
            dto.id,
            dto.price,
            dto.name,
            dto.status
        );
    }
}