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

  cancelSubscription(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); 
  }

  subscribeToPlan(plan: any): Observable<any> {
    return this.http.post(this.apiUrl, { planId: plan.id, planName: plan.name, price: plan.price });
  }

  subscribeUser(userId: number, subscription: any): Observable<any> {
    const apiUrl = 'http://localhost:3000/users';
    return this.http.patch(`${apiUrl}/${userId}`, { subscription });
  }
}
