import {Link} from 'react-router-dom'
import {IoStar, IoLocationSharp, IoBag} from 'react-icons/io5'

import './index.css'

const JobCard = props => {
  const {eachJob} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = eachJob
  return (
    <Link to={`/jobs/${id}`} className="link-ele">
      <li className="each-job-item">
        <div className="job-logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="comapny-logo"
          />
          <div className="job-name-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <IoStar className="star-icon" />
              <p className="icons-details">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-jobtype-salary-container">
          <div className="location-job-type-container">
            <IoLocationSharp className="icons" />
            <p className="icons-details">{location}</p>
            <IoBag className="icons" />
            <p className="icons-details">{employmentType}</p>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <h1 className="description-heading">Description:</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
