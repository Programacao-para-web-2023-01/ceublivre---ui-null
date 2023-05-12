"use client"

import { useEffect, useState } from "react";
import Task from "../components/Task";

interface TaskType {
  userId: number
  id: number
  title: string
  completed: boolean
}

export default function TaskID() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response: Response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        {tasks.map(t => (
          <Task 
            key={t.id}
            id={t.id}
            title={t.title}
            checked={t.completed}
          />
        ))}
      </ul>
    </main>
  )
}
