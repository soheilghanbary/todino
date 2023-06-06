import React from "react";
import { db } from "@/lib/db";
import TodoOrder from "./todo-order";

export default async function TodoList() {
  const todos = await db.todo.findMany();
  return <TodoOrder todos={todos} />;
}
