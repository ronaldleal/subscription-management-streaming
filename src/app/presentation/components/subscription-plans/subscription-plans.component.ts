import { Component, OnInit } from '@angular/core';
import { SubscriptionDTO } from 'src/app/application/dtos/subscription.dto';
import { AuthService } from 'src/app/application/services/auth/auth.service';
import { SubscriptionService } from 'src/app/application/services/subscription/subscription.service';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.scss'],
})
export class SubscriptionPlansComponent implements OnInit {
  plans: any[] = [];
  currentUser: any;
  selectedPaymentTypes: { [planId: string]: string } = {}; 

  constructor(
    private subscriptionService: SubscriptionService,
    private authService: AuthService
  ) {}

  subscribeToPlan(plan: SubscriptionDTO): void {
    const currentUser = this.authService.getCurrentUser(); 
    if (!currentUser) {
      alert('Debes iniciar sesión para suscribirte a un plan.');
      return;
    }
  
    // Verifica si el usuario ya tiene una suscripción activa
    if (currentUser.subscription) {
      alert('Ya tienes una suscripción activa. El cambio de plan se aplicará al siguiente período.');
      const paymentType = this.selectedPaymentTypes[plan.id];
      const discountedPrice = this.getDiscountedPrice(plan);
  
      // Crea un objeto de suscripción pendiente
      const pendingSubscription = {
        ...plan,
        price: discountedPrice,
        paymentType,
      };
  
      // Actualiza la suscripción pendiente del usuario
      currentUser.pendingSubscription = pendingSubscription;
      this.authService.updateCurrentUser(currentUser);
      alert(`El cambio al plan ${plan.name} se aplicará al siguiente período.`);
      return;
    }
  
    // Si no hay una suscripción activa, permite la suscripción inmediata
    const paymentType = this.selectedPaymentTypes[plan.id];
    const discountedPrice = this.getDiscountedPrice(plan);
  
    const subscription = {
      ...plan,
      price: discountedPrice,
      paymentType,
    };
  
    this.subscriptionService.subscribeUser(currentUser.id, subscription).subscribe(
      (response) => {
        alert(`Te has suscrito exitosamente al plan ${plan.name} con un precio de $${discountedPrice}.`);
        currentUser.subscription = subscription; 
        this.authService.updateCurrentUser(currentUser); 
      },
      (error) => {
        console.error('Error al suscribirse al plan:', error);
        alert('Ocurrió un error al intentar suscribirte. Intenta nuevamente.');
      }
    );
  }

  getDiscountedPrice(plan: SubscriptionDTO): number {
    const paymentType = this.selectedPaymentTypes[plan.id];
    return paymentType === 'yearly' ? plan.price * 0.9 : plan.price; 
  }

  ngOnInit(): void {
    this.subscriptionService.getSubscriptions().subscribe(
      (plans) => {
        this.plans = plans; 
        console.log('Plans loaded:', this.plans);
      },
      (error) => {
        console.error('Error loading plans:', error);
      }
    );
    this.currentUser = this.authService.getCurrentUser();
  
    if (this.currentUser?.pendingSubscription) {
      this.currentUser.subscription = this.currentUser.pendingSubscription;
      this.currentUser.pendingSubscription = null; 
      this.authService.updateCurrentUser(this.currentUser); 
      alert('Tu cambio de suscripción se ha aplicado.');
    }
  }

  calculateRefund(subscription: SubscriptionDTO): number {
    const currentDate = new Date();
    const subscriptionStartDate = new Date(subscription.startDate);
    const subscriptionEndDate = new Date(subscription.endDate); 
  
    const totalDays = (subscriptionEndDate.getTime() - subscriptionStartDate.getTime()) / (1000 * 60 * 60 * 24);
    const daysUsed = (currentDate.getTime() - subscriptionStartDate.getTime()) / (1000 * 60 * 60 * 24);
  
    const remainingDays = totalDays - daysUsed;
  
    if (daysUsed <= totalDays / 2) {
      return subscription.price * 0.5; 
    }
  
    return 0; 
  }
  
  cancelSubscription(): void {
    if (!this.currentUser) {
      alert('Debes iniciar sesión para cancelar tu suscripción.');
      return;
    }
  
    if (!this.currentUser.subscription) {
      alert('No tienes una suscripción activa para cancelar.');
      return;
    }
  
    const refundAmount = this.calculateRefund(this.currentUser.subscription);
  
    const confirmCancel = confirm(
      `Se te reembolsará $${refundAmount.toFixed(2)} por cancelar tu suscripción. ¿Deseas continuar?`
    );
  
    if (!confirmCancel) {
      return;
    }
  
    this.subscriptionService.cancelSubscription(this.currentUser.id).subscribe(
      (response) => {
        alert(`Tu suscripción ha sido cancelada. Se te ha reembolsado $${refundAmount.toFixed(2)}.`);
        this.currentUser.subscription = null; 
        this.authService.updateCurrentUser(this.currentUser); 
      },
      (error) => {
        console.error('Error al cancelar la suscripción:', error);
        alert('Ocurrió un error al intentar cancelar tu suscripción. Intenta nuevamente.');
      }
    );
  }
}
