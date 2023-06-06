"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef, useTransition } from "react";
import { createTodo } from "@/actions/todos";
import { useAtom } from "jotai/react";
import { itemsAtom } from "./todo-order";

export default function AddTodo() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement | null>(null);
  const textRef = useRef<HTMLInputElement | null>(null);

  const [items, setItems] = useAtom(itemsAtom);

  function onAdd() {
    if (!textRef.current?.value) return;
    startTransition(async () => {
      await createTodo(textRef.current?.value as string).then((res) => {
        setItems([...items, res]);
      });
      formRef.current?.reset();
    });
  }

  return (
    <form ref={formRef} className="max-w-sm space-x-2 flex items-center">
      <Input
        name="text"
        type="text"
        ref={textRef}
        placeholder="here to go"
        className="flex-1"
      />
      <Button
        formAction={onAdd}
        variant={"default"}
        disabled={isPending}
        size={"sm"}
      >
        Add Task
      </Button>
    </form>
  );
}
