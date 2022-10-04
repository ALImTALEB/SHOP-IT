import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
  <nav id="sidebar">
    <ul className="list-unstyled components">
      <li>
        <Link to="/dashboard"><i className="fas fa-tachometer-alt" /> Dashboard</Link>
      </li>
      <li>
        <Link to="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i className="fab fa-product-hunt" /> Products</Link>
        <ul className="collapse list-unstyled" id="productSubmenu">
          <li>
            <Link to="/admin/products"><i className="fas fa-clipboard-list" /> All</Link>
          </li>
          <li>
            <Link to="/admin/product"><i className="fas fa-plus" /> Create</Link>
          </li>
        </ul>
      </li>
      <li>
        <Link to="/admin/orders"><i className="fas fa-shopping-basket" /> Orders</Link>
      </li>
      <li>
        <Link to="/admin/users"><i className="fas fa-users" /> Users</Link>
      </li>
      <li>
        <Link to="/admin/reviews"><i className="fas fa-star" /> Reviews</Link>
      </li>
    </ul>
  </nav>
</div>

  )
}

export default Sidebar