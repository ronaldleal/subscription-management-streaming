import { SubscriptionDTO } from "./subscription.dto";

export interface UserDTO {
    id: number; 
    username: string; 
    password: string; 
    subscription: SubscriptionDTO | null; 
    pendingSubscription?: SubscriptionDTO | null; 
  }