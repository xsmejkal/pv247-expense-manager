"use client";

import { useState } from "react";
import Menu from "./menu";

const BurgerButton = () => {
  const [menuToggled, setMenuToggled] = useState<boolean>(false);
  const toggleMenu = () => {
    setMenuToggled(!menuToggled);
  };

  return (
    <div>
      <button className="h-12 w-full" onClick={toggleMenu}>
        ☰ Show menu
      </button>
      {menuToggled && (
        <div className="w-screen">
          <Menu />
        </div>
      )}
    </div>
  );
};

export default BurgerButton;
