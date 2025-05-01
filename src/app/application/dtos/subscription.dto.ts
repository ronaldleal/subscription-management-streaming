import { SubscriptionStatus } from "src/app/core/enums/subscription-status.enum";

export interface SubscriptionDTO {
    id: string;
    name: string;
    showDetails?: boolean;
    status: SubscriptionStatus;
  }