import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { Navigate } from 'react-router-dom'

function Button({ bgColor, icon, bgHoverColor, log, color, size, text, width, borderRadius, }) {
  
  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'

  }

 const {setIsClicked, initialState} = useStateContext()
  return (
    <div>
      <button
        type='button'
        onClick={logout}        
        style={{ backgroudColor: bgColor, color, borderRadius }}
        className={`text-${size} p-3 hover:drop-shadow-xl w-${width} ${log} hover:bg-${bgHoverColor}`}        
        
>
        {icon} {text}

      </button>
    </div>
  )
}

export default Button