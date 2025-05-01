import { SubscriptionStatus } from "src/app/core/enums/subscription-status.enum";

export interface SubscriptionDTO {
    id: string;
    name: string;
    status: SubscriptionStatus;
    price: number;
    description?: string;
    discount?: number;
    startDate: string; // Fecha de inicio de la suscripción
    endDate: string;
  }