"use client"

export interface UserProps {
  name: string
  username: string
  email: string
  phone: string
  website: string
}

export default function User({name, username, email, phone, website}: UserProps) {
  return (
    <li>
      <ul>
        <li>Name: {name}</li>
        <li>Username: {username}</li>
        <li>Email: {email}</li>
        <li>Phone: {phone}</li>
        <li>Website: {website}</li>
      </ul>
    </li>
  )
}
