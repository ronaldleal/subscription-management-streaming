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
  selectedPaymentTypes: { [planId: string]: string } = {}; // Estado de selección por plan

  constructor(
    private subscriptionService: SubscriptionService,
    private authService: AuthService // Inyecta el servicio de autenticación
  ) {}

  subscribeToPlan(plan: SubscriptionDTO): void {
    const currentUser = this.authService.getCurrentUser(); // Obtén el usuario actual
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
      this.authService.updateCurrentUser(currentUser); // Guarda los cambios en localStorage
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
        currentUser.subscription = subscription; // Actualiza la suscripción localmente
        this.authService.updateCurrentUser(currentUser); // Guarda los cambios en localStorage
      },
      (error) => {
        console.error('Error al suscribirse al plan:', error);
        alert('Ocurrió un error al intentar suscribirte. Intenta nuevamente.');
      }
    );
  }

  getDiscountedPrice(plan: SubscriptionDTO): number {
    const paymentType = this.selectedPaymentTypes[plan.id];
    return paymentType === 'yearly' ? plan.price * 0.9 : plan.price; // 10% de descuento para anual
  }

  ngOnInit(): void {
    this.subscriptionService.getSubscriptions().subscribe(
      (plans) => {
        this.plans = plans; // Asigna los planes obtenidos al array
        console.log('Plans loaded:', this.plans); // Depuración
      },
      (error) => {
        console.error('Error loading plans:', error);
      }
    );
    this.currentUser = this.authService.getCurrentUser(); // Obtén el usuario actual
  
    if (this.currentUser?.pendingSubscription) {
      this.currentUser.subscription = this.currentUser.pendingSubscription;
      this.currentUser.pendingSubscription = null; // Limpia la suscripción pendiente
      this.authService.updateCurrentUser(this.currentUser); // Guarda los cambios en localStorage
      alert('Tu cambio de suscripción se ha aplicado.');
    }
  }

  calculateRefund(subscription: SubscriptionDTO): number {
    const currentDate = new Date();
    const subscriptionStartDate = new Date(subscription.startDate); // Asegúrate de que `startDate` esté disponible en el objeto de suscripción
    const subscriptionEndDate = new Date(subscription.endDate); // Asegúrate de que `endDate` esté disponible en el objeto de suscripción
  
    const totalDays = (subscriptionEndDate.getTime() - subscriptionStartDate.getTime()) / (1000 * 60 * 60 * 24);
    const daysUsed = (currentDate.getTime() - subscriptionStartDate.getTime()) / (1000 * 60 * 60 * 24);
  
    const remainingDays = totalDays - daysUsed;
  
    // Política de reembolso: 50% si se cancela antes de la mitad del período
    if (daysUsed <= totalDays / 2) {
      return subscription.price * 0.5; // Reembolsa el 50% del precio
    }
  
    return 0; // No hay reembolso si se cancela después de la mitad del período
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
  
    // Calcular el reembolso parcial
    const refundAmount = this.calculateRefund(this.currentUser.subscription);
  
    // Confirmar la cancelación con el usuario
    const confirmCancel = confirm(
      `Se te reembolsará $${refundAmount.toFixed(2)} por cancelar tu suscripción. ¿Deseas continuar?`
    );
  
    if (!confirmCancel) {
      return; // El usuario decidió no cancelar
    }
  
    // Realizar la cancelación
    this.subscriptionService.cancelSubscription(this.currentUser.id).subscribe(
      (response) => {
        alert(`Tu suscripción ha sido cancelada. Se te ha reembolsado $${refundAmount.toFixed(2)}.`);
        this.currentUser.subscription = null; // Elimina la suscripción localmente
        this.authService.updateCurrentUser(this.currentUser); // Guarda los cambios en localStorage
      },
      (error) => {
        console.error('Error al cancelar la suscripción:', error);
        alert('Ocurrió un error al intentar cancelar tu suscripción. Intenta nuevamente.');
      }
    );
  }
}
