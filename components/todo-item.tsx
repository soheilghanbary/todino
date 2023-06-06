"use client";
import dayjs from "dayjs";
import { Button } from "./ui/button";
import { Todo } from "@prisma/client";
import { useRef, useMemo, useTransition } from "react";
import revalidatetime from "dayjs/plugin/relativeTime";
import { doneTodo, removeTodo, updateText } from "@/actions/todos";
import { itemsAtom } from "./todo-order";
import { useAtom } from "jotai/react";

dayjs.extend(revalidatetime);

export default function TodoItem({ done, text, id, published }: Todo) {
  const [isPending, startTransition] = useTransition();
  const day = useMemo(() => dayjs(published), [published]);
  const textRef = useRef<HTMLSpanElement | null>(null);

  const [items, setItems] = useAtom(itemsAtom);

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      textRef.current?.blur();
    }
  };

  return (
    <div className="p-2 border rounded-md text-sm flex flex-col space-y-2 max-w-2xl justify-between bg-secondary">
      <h2 className={done ? "line-through" : ""}>
        #{" "}
        <span
          ref={textRef}
          suppressContentEditableWarning
          contentEditable
          onBlur={(e) =>
            startTransition(async () => {
              await updateText(id, e.target.innerText);
            })
          }
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {text}
        </span>
      </h2>
      <div className="flex justify-between items-center flex-row-reverse">
        <p className="text-muted-foreground text-xs">{day.fromNow()}</p>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              startTransition(async () => {
                await doneTodo(id, done).then((res) => {
                  setItems(
                    items.map((item) => {
                      if (item.id === res.id) {
                        return { ...res };
                      } else {
                        return item;
                      }
                    })
                  );
                });
              });
            }}
            disabled={isPending}
            variant={"default"}
            size={"sm"}
            className="text-xs"
          >
            {done ? "UnComplete" : "Complete"}
          </Button>
          <Button
            onClick={() => {
              startTransition(async () => {
                await removeTodo(id).then((res) => {
                  setItems(items.filter((item) => item.id !== res.id));
                });
              });
            }}
            variant={"destructive"}
            size={"sm"}
            disabled={isPending}
            className="text-xs"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
