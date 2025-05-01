import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './presentation/pages/app.component';
import { SubscriptionDetailComponent } from './presentation/components/subscription-detail/subscription-detail.component';
import { SubscriptionListComponent } from './presentation/components/subscription-list/subscription-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SubscriptionPlansComponent } from './presentation/components/subscription-plans/subscription-plans.component';
import { HomeComponent } from './presentation/components/home/home.component';
import { LoginComponent } from './presentation/components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    SubscriptionDetailComponent,
    SubscriptionListComponent,
    LoginComponent,
    SubscriptionPlansComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
