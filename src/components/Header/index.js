import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {IoMdHome} from 'react-icons/io'
import {IoBag, IoLogOutOutline} from 'react-icons/io5'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-inner-container">
        <Link to="/" className="link-ele">
          <button type="button" className="mobile-buttons">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="nav-logo"
            />
          </button>
        </Link>
        <ul className="mobile-view-btn-container">
          <Link to="/" className="link-ele">
            <li>
              <button type="button" className="mobile-buttons">
                <IoMdHome label="home-icon" className="mobile-icons" />
              </button>
            </li>
          </Link>
          <Link to="/jobs" className="link-ele">
            <li>
              <button type="button" className="mobile-buttons">
                <IoBag label="job-icon" className="mobile-icons" />
              </button>
            </li>
          </Link>
          <li>
            <button
              type="button"
              className="mobile-buttons"
              onClick={onClickLogout}
              data-testid="searchButton"
            >
              <IoLogOutOutline label="logout-icon" className="mobile-icons" />
            </button>
          </li>
        </ul>
        <div className="large-viewbtn-container">
          <Link to="/" className="nav-text link-ele">
            Home
          </Link>
          <Link to="/jobs" className="nav-text link-ele">
            Jobs
          </Link>
        </div>
        <div className="logout-btn-container">
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
