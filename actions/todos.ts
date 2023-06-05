"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createTodo(text: string) {
  await db.todo.create({
    data: {
      text,
    },
  });
  revalidatePath("/");
}

export async function removeTodo(id: string) {
  await db.todo.delete({ where: { id } });
  revalidatePath("/");
}

export async function doneTodo(id: string, done: boolean) {
  await db.todo.update({ where: { id }, data: { done: !done } });
  revalidatePath("/");
}

export async function updateText(id: string, text: string) {
  await db.todo.update({ where: { id }, data: { text } });
  revalidatePath("/");
}
