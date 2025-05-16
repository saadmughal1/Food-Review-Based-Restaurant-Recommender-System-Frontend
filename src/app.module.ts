import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http"
import { RouterModule } from "@angular/router"

import { AppComponent } from "./app/app.component"
import { HeaderComponent } from "./app/header/header.component"
import { FooterComponent } from "./app/footer/footer.component"
import { HomeComponent } from "./app/home/home.component"
import { LoginComponent } from "./app/login/login.component"
import { RegisterComponent } from "./app/register/register.component"
import { RestaurantCardComponent } from "./app/restaurant-card/restaurant-card.component"
import { RestaurantDetailComponent } from "./app/restaurant-detail/restaurant-detail.component"
import { ReviewFormComponent } from "./app/review-form/review-form.component"
import { UserProfileComponent } from "./app/user-profile/user-profile.component"
import { AdminDashboardComponent } from "./app/admin-dashboard/admin-dashboard.component"
import { RecommendationsComponent } from "./app/recommendations/recommendations.component"
import { RestaurantListComponent } from "./app/restaurant-list/restaurant-list.component"
import { ReviewListComponent } from "./app/review-list/review-list.component"
import { StarRatingComponent } from "./app/star-rating/star-rating.component"
import { AdminRestaurantManagementComponent } from "./app/admin-restaurant-management/admin-restaurant-management.component"
import { AdminUserManagementComponent } from "./app/admin-user-management/admin-user-management.component"
import { AuthGuard } from "./app/auth.guard"
import { AdminGuard } from "./app/admin.guard"
import { routes } from "./app/app.routes"

NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RestaurantCardComponent,
    ReviewFormComponent,
    RestaurantListComponent,
    RestaurantDetailComponent,
    UserProfileComponent,
    AdminDashboardComponent,
    RecommendationsComponent,
    ReviewListComponent,
    StarRatingComponent,
    AdminRestaurantManagementComponent,
    AdminUserManagementComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ AuthGuard, AdminGuard,
    provideHttpClient(withInterceptorsFromDi()),
  ],  bootstrap: [AppComponent],
})
export class AppModule {}
