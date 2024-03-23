import React from 'react'

const KEYS = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L",
    "Z", "X", "C", "V", "B", "N", "M"
    
]

const Keyboard = () => {
  return (
    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))", gap: ".5rem"}}>
        {KEYS.map((key, i) => (
            <button key={i}  className='bg-gray-300 text-gray-800 font-bold text-2xl p-4 rounded-lg hover:enabled:bg-blue-950 hover:enabled:text-gray-300 focus:enabled:bg-blue-950 focus:enabled:text-gray-300 active:bg-indigo-600 disabled:opacity-30'>
                {key}
            </button>
        ))}
    </div>
  )
}

export default Keyboard