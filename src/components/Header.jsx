import React from 'react'

const Header = ({category, title, description}) => {
  return (
    <div className='mb-10'>
      <p className='text-gray-400'>
      {category}
      </p>

      <p className='text-2xl font-bold tracking-tight text-slate-900'>
        {title}
      </p>

      <p className='mt-8 text-gray-700 font-medium'>
{description}
      </p>
    </div>
  )
}

export default Header
