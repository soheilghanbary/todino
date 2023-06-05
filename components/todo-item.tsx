"use client";
import { doneTodo, removeTodo } from "@/actions/todos";
import { Button } from "./ui/button";
import { Todo } from "@prisma/client";
import { useTransition } from "react";
import { useMemo } from 'react' 
import dayjs from "dayjs";
import revalidatetime from "dayjs/plugin/relativeTime";

dayjs.extend(revalidatetime);

export default function TodoItem({ done, text, id , published }: Todo) {
  const [isPending, startTransition] = useTransition();
  const day = useMemo(() => dayjs(published), [published]);
  return (
    <li className="p-4 border rounded-md text-sm flex flex-col gap-4 max-w-xl justify-between">
      <span className={done ? "line-through" : ""}># {text}</span>
      <div className="flex justify-between items-center flex-row-reverse">
        <p className="text-muted-foreground text-xs">{day.fromNow()}</p>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              startTransition(async () => {
                await doneTodo(id, done);
              });
            }}
            disabled={isPending}
            variant={"outline"}
            size={"sm"}
          >
            { done ? 'UnComplete' : 'Complete'}
          </Button>
          <Button
            onClick={() => {
              startTransition(async () => {
                await removeTodo(id);
              });
            }}
            variant={"destructive"}
            size={"sm"}
            disabled={isPending}
          >
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}
