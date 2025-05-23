import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';



export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "restaurants", component: RestaurantCardComponent },
  { path: "restaurants/:id", component: RestaurantDetailComponent },
  { path: "profile", component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: "recommendations", component: RecommendationsComponent, canActivate: [AuthGuard] },

  { path: "**", redirectTo: "" },
]
