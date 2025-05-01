import { SubscriptionStatus } from "src/app/core/enums/subscription-status.enum";


export class SubscriptionEntity {
    constructor(
        public id: string,
        public name: string,
        public status: SubscriptionStatus,
    ) {}

    updateSubscription(type: string, price: number, name: string): void {
        this.name = name;
    }

    cancelSubscription(): void {
        this.status = SubscriptionStatus.Cancelled;
    }
}