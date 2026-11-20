import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import { PlusIcon, ListIcon, PackageIcon } from '../Icons/Icons'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='add' className="sidebar-option">
          <PlusIcon size={22} />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='list' className="sidebar-option">
          <ListIcon size={22} />
          <p>List Items</p>
        </NavLink>
        <NavLink to='orders' className="sidebar-option">
          <PackageIcon size={22} />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
