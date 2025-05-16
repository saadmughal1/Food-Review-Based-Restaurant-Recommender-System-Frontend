import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-user-management',
  imports: [NgFor, NgIf,FormsModule],
  templateUrl: './admin-user-management.component.html',
  styleUrl: './admin-user-management.component.css'
})
export class AdminUserManagementComponent implements OnInit {

  users: User[] = []
  filteredUsers: User[] = []
  loading = true
  searchQuery = ""

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers(): void {
    this.loading = true
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users
        this.applyFilter()
        this.loading = false
      },
      error: (error) => {
        console.error("Error loading users", error)
        this.loading = false
      },
    })
  }

  applyFilter(): void {
    if (!this.searchQuery.trim()) {
      this.filteredUsers = [...this.users]
      return
    }

    const query = this.searchQuery.toLowerCase()
    this.filteredUsers = this.users.filter(
      (user) =>
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        (user.firstName && user.firstName.toLowerCase().includes(query)) ||
        (user.lastName && user.lastName.toLowerCase().includes(query)),
    )
  }

  onSearch(): void {
    this.applyFilter()
  }

  deleteUser(id: number): void {
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter((u) => u.id !== id)
          this.applyFilter()
        },
        error: (error) => {
          console.error("Error deleting user", error)
        },
      })
    }
  }

  toggleAdminStatus(user: User): void {
    const updatedUser: User = {
      ...user,
      isAdmin: !user.isAdmin,
    }

    this.userService.updateUser(updatedUser).subscribe({
      next: (updated) => {
        const index = this.users.findIndex((u) => u.id === updated.id)
        if (index !== -1) {
          this.users[index] = updated
          this.applyFilter()
        }
      },
      error: (error) => {
        console.error("Error updating user", error)
      },
    })
  }

}
