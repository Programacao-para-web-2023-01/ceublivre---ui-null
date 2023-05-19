"use client"

export interface TaskProps {
  id: number
  title: string
  checked: boolean
}

export default function Task({id, title, checked}: TaskProps) {
  return (
    <li>
      <input type="checkbox" name={title} defaultChecked={checked} id={"task_" + id} />
      <label style={{marginLeft: 0.5 + "rem"}} htmlFor={"task_" + id}>{title}</label>
    </li>
  )
}
