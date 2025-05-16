import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, type Observable, of } from "rxjs"
import { tap } from "rxjs/operators"
import { User } from "./user"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "api/auth" // Replace with your actual API URL
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  public currentUser$ = this.currentUserSubject.asObservable()

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser))
    }
  }

  login(username: string, password: string): Observable<User> {
    // In a real app, this would make an HTTP request to your backend
    // For now, we'll simulate a successful login with mock data
    return of({
      id: 1,
      username,
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
      isAdmin: username === "admin", // Make 'admin' username an admin for testing
    }).pipe(
      tap((user) => {
        localStorage.setItem("currentUser", JSON.stringify(user))
        this.currentUserSubject.next(user)
      }),
    )

    // Actual implementation would be:
    // return this.http.post<User>(`${this.apiUrl}/login`, { username, password })
    //   .pipe(
    //     tap(user => {
    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //       this.currentUserSubject.next(user);
    //     })
    //   );
  }

  register(user: User): Observable<User> {
    // Simulate registration
    return of({
      ...user,
      id: Math.floor(Math.random() * 1000),
    }).pipe(
      tap((newUser) => {
        localStorage.setItem("currentUser", JSON.stringify(newUser))
        this.currentUserSubject.next(newUser)
      }),
    )

    // Actual implementation:
    // return this.http.post<User>(`${this.apiUrl}/register`, user)
    //   .pipe(
    //     tap(newUser => {
    //       localStorage.setItem('currentUser', JSON.stringify(newUser));
    //       this.currentUserSubject.next(newUser);
    //     })
    //   );
  }

  logout(): void {
    localStorage.removeItem("currentUser")
    this.currentUserSubject.next(null)
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value
  }

  isLoggedIn(): boolean {
    return !!this.currentUser
  }

  isAdmin(): boolean {
    return this.currentUser?.isAdmin || false
  }

  updateUserProfile(user: User): Observable<User> {
    // Simulate profile update
    const updatedUser = { ...this.currentUser, ...user }
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
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
