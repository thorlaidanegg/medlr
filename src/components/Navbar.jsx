import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className="bg-blue-900 p-4 w-full ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white text-lg font-bold">Medlr</span>
        </div>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:text-blue-300">Home</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-blue-300">About</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-blue-300">Services</a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-blue-300">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
    </div>
  )
}

export default Navbar