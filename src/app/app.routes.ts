import { Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRestaurantManagementComponent } from './admin-restaurant-management/admin-restaurant-management.component';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "restaurants", component: RestaurantCardComponent },
    { path: "restaurants/:id", component: RestaurantDetailComponent },
    { path: "profile", component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: "recommendations", component: RecommendationsComponent, canActivate: [AuthGuard] },
    {
      path: "admin",
      component: AdminDashboardComponent,
      canActivate: [AuthGuard, AdminGuard],
      children: [
        { path: "restaurants", component: AdminRestaurantManagementComponent },
        { path: "users", component: AdminUserManagementComponent },
      ],
    },
    { path: "**", redirectTo: "" },
  ]
