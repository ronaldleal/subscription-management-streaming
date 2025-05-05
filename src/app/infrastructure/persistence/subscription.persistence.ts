import { SubscriptionEntity } from "src/app/domain/entities/subscription.entity";
import { SubscriptionRepository } from "src/app/domain/repositories/subscription.repository";


export class SubscriptionPersistence implements SubscriptionRepository {
    private subscriptions: SubscriptionEntity[] = [];

    async findById(id: string): Promise<SubscriptionEntity | null> {
        return this.subscriptions.find(subscription => subscription.id === id) || null;
    }

    async save(subscription: SubscriptionEntity): Promise<void> {
        const existingIndex = this.subscriptions.findIndex(sub => sub.id === subscription.id);
        if (existingIndex > -1) {
            this.subscriptions[existingIndex] = subscription;
        } else {
            this.subscriptions.push(subscription);
        }
    }

    async update(subscription: SubscriptionEntity): Promise<void> {
        await this.save(subscription);
    }

    async delete(id: string): Promise<void> {
        this.subscriptions = this.subscriptions.filter(subscription => subscription.id !== id);
    }
}
