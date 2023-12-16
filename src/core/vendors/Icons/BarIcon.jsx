import React from 'react'

const BarIcon = ({className,handleSidebar,id}) => {
  return (
    <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    style={{ fill: "none" }}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={handleSidebar}
    

>
    <path
        d="M21.97 15V9C21.97 4 19.97 2 14.97 2H8.96997C3.96997 2 1.96997 4 1.96997 9V15C1.96997 20 3.96997 22 8.96997 22H14.97C19.97 22 21.97 20 21.97 15Z"
        stroke="#6B7280"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
    <path
        d="M7.96997 2V22"
        stroke="#6B7280"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
    <path
        d="M14.97 9.44L12.41 12L14.97 14.56"
        stroke="#6B7280"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
</svg>
  )
}

export default BarIcon