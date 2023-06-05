import { Button } from "../ui/button";
import ModeToggle from "./mode-toggle";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center pb-4 mb-4 border-b">
        <h3 className="font-semibold text-2xl">Todino</h3>
        <ModeToggle />
    </nav>
  )
}
