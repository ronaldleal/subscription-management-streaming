import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  
import { SubscriptionDTO } from '../../dtos/subscription.dto';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://localhost:3000/subscriptions';  

  constructor(private http: HttpClient) {}

  getSubscriptions(): Observable<SubscriptionDTO[]> {
    return this.http.get<SubscriptionDTO[]>(this.apiUrl);  
  }

  cancelSubscription(userId: number): Observable<any> {
    const apiUrl = 'http://localhost:3000/users'; // Asegúrate de que apunte a la colección correcta
    return this.http.patch(`${apiUrl}/${userId}`, { subscription: null });
  }

  updateSubscription(userId: number, subscription: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}`, { subscription }); 
  }
  subscribeToPlan(plan: any): Observable<any> {
    return this.http.post(this.apiUrl, { planId: plan.id, planName: plan.name, price: plan.price });
  }

  subscribeUser(userId: number, subscription: any): Observable<any> {
    const apiUrl = 'http://localhost:3000/users';
    return this.http.patch(`${apiUrl}/${userId}`, { subscription });
  }

  calculateDiscountedPrice(subscription: SubscriptionDTO, paymentType: string): number {
    let discountedPrice = subscription.price;
  
    if (paymentType === 'yearly') {
      discountedPrice = subscription.price * 0.9; // Aplica un 10% de descuento
    }
  
    return discountedPrice;
  }
}
