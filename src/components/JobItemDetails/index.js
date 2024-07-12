import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoStar, IoLocationSharp, IoBag} from 'react-icons/io5'
import {HiOutlineExternalLink} from 'react-icons/hi'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const constStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class JobItemDetails extends Component {
  state = {jobItemStatus: constStatus.initial, jobDetails: '', similarJobs: ''}

  componentDidMount() {
    this.getJobItemDetails()
  }

  modifiedDetails = details => ({
    companyLogoUrl: details.company_logo_url,
    companyWebsiteUrl: details.company_website_url,
    employmentType: details.employment_type,
    id: details.id,
    jobDescription: details.job_description,
    location: details.location,
    packagePerAnnum: details.package_per_annum,
    rating: details.rating,
    lifeAtCompany: details.life_at_company,
    skills: details.skills,
    title: details.title,
  })

  getJobItemDetails = async () => {
    this.setState({jobItemStatus: constStatus.loading})
    const {match} = this.props
    const {params} = match

    const jobDetailsUrl = `https://apis.ccbp.in/jobs/${params.id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobDetilResponse = await fetch(jobDetailsUrl, options)

    if (jobDetilResponse.ok) {
      const data = await jobDetilResponse.json()
      const jobDetails = this.modifiedDetails(data.job_details)
      this.setState({
        jobDetails,
        jobItemStatus: constStatus.success,
        similarJobs: data.similar_jobs,
      })
    } else {
      this.setState({jobItemStatus: constStatus.failed})
    }
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      skills,
      companyWebsiteUrl,
      lifeAtCompany,
    } = jobDetails

    return (
      <div className="each-job-item">
        <div className="job-logo-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
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
        <div className="discription-container">
          <h1 className="description-heading">Description</h1>
          <a
            href={companyWebsiteUrl}
            target="_blank"
            rel="noreferrer"
            className="link-ele"
          >
            <div className="link-container">
              <h1 className="description-heading visit-heading">Visit</h1>
              <HiOutlineExternalLink className="icons link-icon" />
            </div>
          </a>
        </div>
        <p className="description">{jobDescription}</p>
        <h1 className="description-heading">Skills</h1>
        <ul className="skills-container">
          {skills.map(eachSkill => (
            <li key={eachSkill.name} className="skills-item">
              <img
                src={eachSkill.image_url}
                alt={eachSkill.name}
                className="skill-img"
              />
              <h1 className="skill-name">{eachSkill.name}</h1>
            </li>
          ))}
        </ul>
        <h1 className="description-heading">Life at Company</h1>
        <div className="compnay-life-container">
          <p className="description company-life-dis">
            {lifeAtCompany.description}
          </p>
          <img
            src={lifeAtCompany.image_url}
            alt="Life at Company"
            className="compnay-life-img"
          />
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state
    return (
      <>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="similar-job-list-container">
          {similarJobs.map(eachJob => (
            <li key={eachJob.id} className="similar-job-card">
              <div className="job-logo-container">
                <img
                  src={eachJob.company_logo_url}
                  alt="similar job company logo"
                  className="comapny-logo"
                />
                <div className="job-name-rating-container">
                  <h1 className="job-title">{eachJob.title}</h1>
                  <div className="rating-container">
                    <IoStar className="star-icon" />
                    <p className="icons-details">{eachJob.rating}</p>
                  </div>
                </div>
              </div>
              <h1 className="description-heading">Description</h1>
              <p className="description">{eachJob.job_description}</p>
              <div className="location-job-type-container">
                <IoLocationSharp className="icons" />
                <p className="icons-details">{eachJob.location}</p>
                <IoBag className="icons" />
                <p className="icons-details">{eachJob.employment_type}</p>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  retryBtn = () => {
    this.getJobItemDetails()
  }

  failedView = () => (
    <>
      <Header />
      <div className="failure-loader-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failed-img"
        />
        <h1 className="error-headig">Oops! Something Went Wrong</h1>
        <p className="error-dis">
          We cannot seem to find the page you are looking for.
        </p>
        <button type="button" className="retry-btn" onClick={this.retryBtn}>
          Retry
        </button>
      </div>
    </>
  )

  renderLoaderView = () => (
    <>
      <Header />
      <div className="failure-loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  renderSuccessView = () => (
    <>
      <Header />
      <div className="jobs-details-container">
        <div className="job-details-inner-container">
          {this.renderJobDetails()}
          {this.renderSimilarJobs()}
        </div>
      </div>
    </>
  )

  renderResult = () => {
    const {jobItemStatus} = this.state
    switch (jobItemStatus) {
      case constStatus.loading:
        return this.renderLoaderView()
      case constStatus.success:
        return this.renderSuccessView()
      case constStatus.failed:
        return this.failedView()
      default:
        return null
    }
  }

  render() {
    return this.renderResult()
  }
}

export default JobItemDetails
