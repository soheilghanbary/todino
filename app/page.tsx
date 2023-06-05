import AddTodo from "@/components/add-todo";
import TodoList from "@/components/todo-list";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div>
      <AddTodo />
      <Suspense fallback={<p>Loading todos...</p>}>
        {/* @ts-ignore Async Component */}
        <TodoList />
      </Suspense>
    </div>
  );
}
