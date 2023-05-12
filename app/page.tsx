"use client"

import { useEffect, useState } from 'react'
import { clearInterval } from 'timers';
import Contador from './components/Contador';
import Reset from './components/Reset';
import Clock from './components/Clock';
import Task from './components/Task';
import User from './components/User';

interface TaskType {
  userId: number
  id: number
  title: string
  completed: boolean
}

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

export default function Home() {
  const [contador, setContador] = useState(0);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [users, setUsers] = useState<UsersType[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response: Response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response: Response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {setContador((atual: number) => atual + 1)}, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Contador
        contador={contador}
        onIncrement={() => {setContador(contador + 1)}}
      />
      <Reset
        reset={() => {setContador(0)}}
      />
      <Clock />

      {/* <ul>
        {tasks.map(t => (
          <Task 
            key={t.id}
            id={t.id}
            title={t.title}
            checked={t.completed}
          />
        ))}
      </ul> */}

      {/* <ul>
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
      </ul> */}
    </main>
  )
}
