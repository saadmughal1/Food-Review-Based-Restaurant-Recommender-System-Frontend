import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, type Observable, of } from "rxjs"
import { tap } from "rxjs/operators"
import { LoginData, User } from "../../types"

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
          console.log(data)
          localStorage.setItem('user', JSON.stringify(data.data.user));
          localStorage.setItem('token', JSON.stringify(data.data.accessToken));
          this.currentUserSubject.next(data.data.user);
        })
      );
  }



  logout(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.currentUserSubject.next(null)
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value
  }

  isLoggedIn(): boolean {
    return !!this.currentUser
  }

  isAdmin(): boolean {
    // return this.currentUser?.isAdmin || false
    return false;
  }

  updateUserProfile(user: User): Observable<User> {
    // Simulate profile update
    const updatedUser = { ...this.currentUser, ...user }
    localStorage.setItem("user", JSON.stringify(updatedUser))
    this.currentUserSubject.next(updatedUser)
    return of(updatedUser)

    // Actual implementation:
    // return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user)
    //   .pipe(
    //     tap(updatedUser => {
    //       localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    //       this.currentUserSubject.next(updatedUser);
    //     })
    //   );
  }
}
