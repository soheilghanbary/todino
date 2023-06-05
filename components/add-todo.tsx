"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef, useTransition } from "react";
import { createTodo } from "@/actions/todos";

export default function AddTodo() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement | null>(null);
  const textRef = useRef<HTMLInputElement | null>(null);

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
        formAction={() => {
          startTransition(async () => {
            await createTodo(textRef.current?.value as string);
            formRef.current?.reset();
          });
        }}
        variant={"default"}
        disabled={isPending}
        size={"sm"}
      >
        {isPending ? "Adding" : "Add Task"}
      </Button>
    </form>
  );
}
