export interface User {
  id: number
  name: string
  email: string
  role: string
}

export const users: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "administrator"
  },
  {
    id: 2,
    name: "Viewer User",
    email: "viewer@example.com",
    role: "viewer"
  }
]
