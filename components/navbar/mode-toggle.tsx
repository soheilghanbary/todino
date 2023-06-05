"use client";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return (
    <Button size={"sm"} variant={"default"} onClick={toggleTheme}>
      Theme
    </Button>
  );
}
