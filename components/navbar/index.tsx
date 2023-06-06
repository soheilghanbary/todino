import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import ModeToggle from "./mode-toggle";
import { GithubIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center pb-4 mb-4 border-b">
      <h3 className="font-semibold text-2xl">Todino</h3>
      <div className="flex items-center space-x-2">
        <Link
          className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
          href={"https://github.com/soheilghanbary/todino"}
          target="_blank"
        >
          <GithubIcon className="w-5 h-5" />
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
}
