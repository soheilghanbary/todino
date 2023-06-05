import React from "react";
import { db } from "@/lib/db";
import TodoItem from "./todo-item";

export default async function TodoList() {
  const todos = await db.todo.findMany();
  return (
    <ul className="space-y-2 mt-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
}

