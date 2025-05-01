import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/application/services/auth/auth.service';
import { SubscriptionService } from 'src/app/application/services/subscription/subscription.service';


@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.scss']
})
export class SubscriptionPlansComponent implements OnInit {
  constructor(private subscriptionService: SubscriptionService,
              private authService: AuthService // Inyecta el servicio de autenticación
  ) {}

subscribeToPlan(plan: any): void {
  const currentUser = this.authService.getCurrentUser(); // Obtén el usuario actual
  if (!currentUser) {
    alert('Debes iniciar sesión para suscribirte a un plan.');
    return;
  }

  // Actualiza la suscripción del usuario
  this.subscriptionService.subscribeUser(currentUser.id, plan).subscribe(
    (response) => {
      alert(`Te has suscrito exitosamente al plan ${plan.name}.`);
      currentUser.subscription = plan; // Actualiza la suscripción localmente
      this.authService.updateCurrentUser(currentUser); // Guarda los cambios en localStorage
    },
    (error) => {
      console.error('Error al suscribirse al plan:', error);
      alert('Ocurrió un error al intentar suscribirte. Intenta nuevamente.');
    }
  );
}
  plans: any[] = []; // Array para almacenar los planes



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
  }
}