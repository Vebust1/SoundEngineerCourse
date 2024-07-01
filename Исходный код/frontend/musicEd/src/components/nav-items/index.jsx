import React from 'react'
import ArrowDownIcon from '../../images/icon-arrow-down.svg'
import { Link } from 'react-router-dom'

export const NavItems = ({ text = '', redir }) => {
  return (
    <div className='relative'>
        <div className='flex space-x-2 cursor-pointer'>
        <Link to={redir} className='text-white hover:text-almost-black'>{text}</Link>
        {/* <img src={ArrowDownIcon} alt="arrow" /> */}
        </div>
    </div>
  )
}
