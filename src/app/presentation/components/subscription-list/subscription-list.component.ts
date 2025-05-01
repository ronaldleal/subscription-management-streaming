import { Component, Input, OnInit } from '@angular/core';
import { SubscriptionDTO } from '../../../application/dtos/subscription.dto';
import { SubscriptionService } from 'src/app/application/services/subscription/subscription.service';


@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {
  subscriptions: SubscriptionDTO[] = [];
  showAllDetails: boolean = false; 

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.subscriptionService.getSubscriptions().subscribe((data: SubscriptionDTO[]) => {
      this.subscriptions = data; 
    });
  }

  toggleAllDetails(): void {
    this.showAllDetails = !this.showAllDetails; 
  }
}