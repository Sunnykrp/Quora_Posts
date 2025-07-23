import React from "react";

const Navbar = () => {
  return (
    <div className="flex-1 justify-between items-center p-4  ">
    <nav>
      <ul className="flex justify-center gap-6 text-lg">
        <li><a href="/">Home</a></li>
        <li><a href="/signup">Signup</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
    </div>
  );
}
export default Navbar;