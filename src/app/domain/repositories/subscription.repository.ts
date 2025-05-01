import { SubscriptionEntity } from "../entities/subscription.entity";


export interface SubscriptionRepository {
    findById(id: string): Promise<SubscriptionEntity | null>;
    save(subscription: SubscriptionEntity): Promise<void>;
    update(subscription: SubscriptionEntity): Promise<void>;
    delete(id: string): Promise<void>;
}
