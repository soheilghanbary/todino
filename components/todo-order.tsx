"use client";
import { Todo } from "@prisma/client";
import TodoItem from "./todo-item";
import { Reorder } from "framer-motion";
import { useEffect, useTransition } from "react";
import { updateTodos } from "@/actions/todos";
import { atom , useAtom } from "jotai";

export const itemsAtom = atom([] as Todo[])

export default function TodoOrder({ todos }: { todos: Todo[] }) {
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useAtom(itemsAtom)

  useEffect(() => {
    setItems(todos)
  },[])

  function handleReorder(orders: Todo[]) {
    startTransition(async () => {
      await updateTodos(orders);
      setItems(orders);
    });
  }

  function updateTodoList() {
    startTransition(async () => {
      await updateTodos(items);
    });
  }

  return (
    <Reorder.Group
      as="ul"
      axis="y"
      values={items}
      onReorder={handleReorder}
      onClick={updateTodoList}
      className="space-y-2 mt-4"
    >
      {items.map((todo) => (
        <Reorder.Item as="li" key={todo.id} value={todo}>
          <TodoItem {...todo} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
