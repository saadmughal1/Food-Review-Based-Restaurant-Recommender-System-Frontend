import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, type Observable, of } from "rxjs"
import { tap } from "rxjs/operators"
import { LoginData, LogoutData, User } from "../../types"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  public currentUser$ = this.currentUserSubject.asObservable()

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser))
    }
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`/user/signup`, user)
  }

  login(user: { username: string, password: string }): Observable<LoginData> {
    return this.http.post<LoginData>(`/user/login`, user)
      .pipe(
        tap(data => {
          localStorage.setItem('user', JSON.stringify(data.data.user));
          localStorage.setItem('token', data.data.accessToken);
          this.currentUserSubject.next(data.data.user);
        })
      );
  }

  logout(): Observable<LogoutData> {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.currentUserSubject.next(null)
    return this.http.post<LogoutData>(`/user/logout`, {})
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value
  }

  isLoggedIn(): boolean {
    return !!this.currentUser
  }

  updateUserProfile(user: { email: string, firstName: string, lastName: string }): Observable<LoginData> {
    return this.http.patch<LoginData>(`/users/update`, user)
      .pipe(
        tap(updatedUser => {
          // localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          // this.currentUserSubject.next(updatedUser);
        })
      );
  }
}
