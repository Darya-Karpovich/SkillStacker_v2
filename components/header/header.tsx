"use client";

import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  return (
    <div className="py-4 flex items-center justify-between">
      <span>Skill-Stacker</span>
      <ThemeToggle />
    </div>
  );
};
