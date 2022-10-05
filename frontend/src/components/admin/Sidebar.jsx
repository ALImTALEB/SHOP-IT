import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
  <nav id="sidebar">
    <ul className="list-unstyled components">
      <li>
        <Link to="/dashboard"><i className="fa fa-tachometer" /> Dashboard</Link>
      </li>
      <li>
        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i className="fab fa-product-hunt" /> Products</a>
        <ul className="collapse list-unstyled" id="productSubmenu">
          <li>
            <Link to="/admin/products"><i className="fa fa-clipboard" /> All</Link>
          </li>
          <li>
            <Link to="/admin/product"><i className="fa fa-plus" /> Create</Link>
          </li>
        </ul>
      </li>
      <li>
        <Link to="/admin/orders"><i className="fa fa-shopping-basket" /> Orders</Link>
      </li>
      <li>
        <Link to="/admin/users"><i className="fa fa-users" /> Users</Link>
      </li>
      <li>
        <Link to="/admin/reviews"><i className="fa fa-star" /> Reviews</Link>
      </li>
    </ul>
  </nav>
</div>

  )
}

export default Sidebar