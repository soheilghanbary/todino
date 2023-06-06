"use server";
import { db } from "@/lib/db";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createTodo(text: string) {
  const created = await db.todo.create({
    data: {
      text,
    },
  });
  revalidatePath("/");
  return created
}

export async function removeTodo(id: string) {
  const deleted = await db.todo.delete({ where: { id } });
  revalidatePath("/");
  return deleted
}

export async function doneTodo(id: string, done: boolean) {
  const doned = await db.todo.update({ where: { id }, data: { done: !done } });
  revalidatePath("/");
  return doned
}

export async function updateText(id: string, text: string) {
  await db.todo.update({ where: { id }, data: { text } });
  revalidatePath("/");
}

export async function updateTodos(todos: Todo[]) {
  console.log(todos)
  // await db.todo.updateMany({ data: todos });
  revalidatePath("/");
}
