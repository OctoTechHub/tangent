import React from 'react'

const Button = ({ children, onClick, className }: { children: React.ReactNode, onClick: () => void, className?: string }) => {
  return (
    <button
      onClick={onClick}
      className={className || "mt-2 bg-gradient-to-b from-[#D6F1FF] from-10% via-[#3B6CB7] via-60% to-[#1E3140] text-white border-none rounded-full py-3 font-semibold text-lg shadow-md w-full hover:opacity-90 transition"}
    >
      {children}
    </button>
  )
}

export default Button