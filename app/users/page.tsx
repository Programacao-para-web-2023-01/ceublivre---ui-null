"use client"

import { useEffect, useState } from "react";
import User from "../components/User";

interface UsersType {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: number,
      lng: number
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

export default function TaskID() {
  const [users, setUsers] = useState<UsersType[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response: Response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        {users.map((u) => (
          <>
            <User
              name={u.name}
              username={u.username}
              email={u.email}
              phone={u.phone}
              website={u.website}
              />
            <br />
          </>
        ))}
      </ul>
    </main>
  )
}
