"use client"

import Task from "@/app/components/Task";
import { useEffect, useState } from "react";

interface TaskType {
  userId: number
  id: number
  title: string
  completed: boolean
}

export default function TaskID({params}: {params: {id: number}}) {
  const [tasks, setTasks] = useState<TaskType>();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`)
      .then((response: Response) => response.json())
      .then((data) => setTasks(data));
  }, [params.id]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Task
        id={tasks?.id ?? 0}
        title={tasks?.title ?? ""}
        checked={tasks?.completed ?? false}
      />
    </main>
  )
}
