import { ReactNode } from "react";
import Navbar from "./navbar";
import Provider from "./provider";

interface Props {
  children: ReactNode;
}
export default function LayoutContent({ children }: Props) {
  return (
    <Provider>
      <section className="container max-w-2xl mx-auto p-4">
        <Navbar />
        {children}
      </section>
    </Provider>
  );
}
