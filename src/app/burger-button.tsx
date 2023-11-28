"use client";

import { useState } from "react";
import Menu from "./Menu";

const BurgerButton = () => {
  const [menuToggled, setMenuToggled] = useState<boolean>(false);
  const toggleMenu = () => {
    setMenuToggled(!menuToggled);
  };

  return (
    <div>
      <button className="h-12 w-full text-white" onClick={toggleMenu}>
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
