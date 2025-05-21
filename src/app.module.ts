import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http"
import { RouterModule } from "@angular/router"

import { AppComponent } from "./app/app.component"
import { HeaderComponent } from "./app/shared/components/header/header.component"
import { FooterComponent } from "./app/shared/components/footer/footer.component"
import { HomeComponent } from "./app/home/home.component"
import { LoginComponent } from "./app/login/login.component"
import { RegisterComponent } from "./app/register/register.component"
import { RestaurantCardComponent } from "./app/components/restaurant-card/restaurant-card.component"
import { RestaurantDetailComponent } from "./app/restaurant-detail/restaurant-detail.component"
import { ReviewFormComponent } from "./app/review-form/review-form.component"
import { UserProfileComponent } from "./app/user-profile/user-profile.component"
import { RecommendationsComponent } from "./app/recommendations/recommendations.component"
import { RestaurantListComponent } from "./app/restaurant-list/restaurant-list.component"
import { ReviewListComponent } from "./app/review-list/review-list.component"
import { StarRatingComponent } from "./app/components/star-rating/star-rating.component"
import { AuthGuard } from "./app/auth.guard"
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
    RecommendationsComponent,
    ReviewListComponent,
    StarRatingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [AuthGuard,
    provideHttpClient(withInterceptorsFromDi()),
  ], bootstrap: [AppComponent],
})
export class AppModule { }
