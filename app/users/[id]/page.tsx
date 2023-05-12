"use client"

import { useEffect, useState } from "react";
import User from "@/app/components/User";

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

export default function TaskID({params}: {params: {id: number}}) {
  const [users, setUsers] = useState<UsersType>();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
      .then((response: Response) => response.json())
      .then((data) => setUsers(data));
  }, [params.id]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <User
        name={users?.name ?? ""}
        username={users?.username ?? ""}
        email={users?.email ?? ""}
        phone={users?.phone ?? ""}
        website={users?.website ?? ""}
      />
    </main>
  )
}
