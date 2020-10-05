import React from 'react'

const user = () => {
  return (
    <div className="flex justify-center h-screen w-full items-center">
      <ul className="border border-blue-500 rounded-lg p-5">
        <li><span className="font-semibold">Nombre:</span> <p className="font-thin"> Esteban Raul Sanchez Gonzalez</p></li>
        <li><span className="font-semibold">Email:</span> <p className="font-thin"> estraulsanz@gmail.com</p></li>
        <li><span className="font-semibold">Telefono:</span> <p className="font-thin"> 9511034411</p></li>
        <li><span className="font-semibold">Escuela:</span> <p className="font-thin"> UVM</p></li>
      </ul>
    </div>
  )
}

export default user
