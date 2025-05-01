import { Component, Input } from '@angular/core';
import { SubscriptionDTO } from '../../../application/dtos/subscription.dto';


@Component({
  selector: 'app-subscription-detail',
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['./subscription-detail.component.scss']
})
export class SubscriptionDetailComponent {
  // @Input() subscription!: SubscriptionDTO;

  // subscriptions: SubscriptionDTO[] = [];

  // constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    // this.loadSubscriptions();
  }

  // loadSubscriptions(): void {
  //   this.subscriptionService.getSubscriptions().subscribe((data: SubscriptionDTO[]) => {
  //     this.subscriptions = data;
  //   });
  // }

  // cancelSubscription(id: string): void {
  //   this.subscriptionService.cancelSubscription(id).subscribe(() => {
  //     this.loadSubscriptions();
  //   });
  // }

  // updateSubscription(): void {
  //   console.log('Update subscription logic goes here');
  //   // Implementa la lógica para actualizar la suscripción
  // }
}