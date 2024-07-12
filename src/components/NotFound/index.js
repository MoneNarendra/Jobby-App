import './index.css'

const NotFound = () => (
  <div className="not-found-continaer">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="not-fount-img"
    />
    <h1 className="error-headig">Page Not Found</h1>
    <p className="error-dis">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
