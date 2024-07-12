import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobCard from '../JobCard'
import ProfileCard from '../ProfileCard'
import {EmplymentTypeFilter, SalaryFilter, SearchSmFilter} from '../FilterGroup'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const constStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class Jobs extends Component {
  state = {
    search: '',
    allJobs: [],
    allJobsStatus: constStatus.initial,
    employments: [],
    salaryAmt: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({allJobsStatus: constStatus.loading})
    const {search, employments, salaryAmt} = this.state
    const emplymentType = employments.join(',')
    const jobUrl = `https://apis.ccbp.in/jobs?employment_type=${emplymentType}&minimum_package=${salaryAmt}&search=${search}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobsResponse = await fetch(jobUrl, options)
    if (jobsResponse.ok) {
      const jobsData = await jobsResponse.json()
      const modifiedjobsData = jobsData.jobs.map(eachJob => ({
        id: eachJob.id,
        title: eachJob.title,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
      }))
      this.setState({
        allJobs: modifiedjobsData,
        allJobsStatus: constStatus.success,
      })
    } else {
      this.setState({allJobsStatus: constStatus.failed})
    }
  }

  // Search

  onChangeUserSearch = value => {
    this.setState({search: value})
  }

  getSearch = () => {
    this.getJobs()
  }

  // Employemnet

  selctedEmployement = employmentType => {
    const {employments} = this.state
    if (employments.includes(employmentType)) {
      const removedEmployemnts = employments.filter(
        eachType => eachType !== employmentType,
      )
      this.setState({employments: removedEmployemnts}, this.getJobs)
    } else {
      this.setState(
        prevState => ({
          employments: [...prevState.employments, employmentType],
        }),
        this.getJobs,
      )
    }
  }

  // Salary

  selectSalaryAmount = salary => {
    this.setState({salaryAmt: salary}, this.getJobs)
  }

  allJobsSection = () => {
    const {allJobs} = this.state
    const jobsFinded = allJobs.length > 0
    return jobsFinded ? (
      <ul className="list-all-jobs">
        {allJobs.map(eachJob => (
          <JobCard eachJob={eachJob} key={eachJob.id} />
        ))}
      </ul>
    ) : (
      <div className="error-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="error-img"
        />
        <h1 className="error-headig">No Jobs Found</h1>
        <p className="error-dis">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  loaderView = () => (
    <div className="loader-jobs-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryBtn = () => {
    this.getJobs()
  }

  failedView = () => (
    <div className="error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="error-img"
      />
      <h1 className="error-headig">Oops! Something Went Wrong</h1>
      <p className="error-dis">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-btn" onClick={this.retryBtn}>
        Retry
      </button>
    </div>
  )

  renderResponse = () => {
    const {allJobsStatus} = this.state
    switch (allJobsStatus) {
      case constStatus.loading:
        return this.loaderView()
      case constStatus.success:
        return this.allJobsSection()
      case constStatus.failed:
        return this.failedView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-inner-container">
            <SearchSmFilter
              onChangeUserSearch={this.onChangeUserSearch}
              getSearch={this.getSearch}
              searchContainerType="SMALL"
            />
            <div className="left-section-lg-container">
              <ProfileCard />
              <EmplymentTypeFilter
                employmentTypesList={employmentTypesList}
                selctedEmployement={this.selctedEmployement}
              />
              <SalaryFilter
                salaryRangesList={salaryRangesList}
                selectSalaryAmount={this.selectSalaryAmount}
              />
            </div>
            <div className="right-section-lg-container">
              <SearchSmFilter
                onChangeUserSearch={this.onChangeUserSearch}
                getSearch={this.getSearch}
                searchContainerType="LARGE"
              />
              {this.renderResponse()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs

// typeOfEmplymentSection = () => (
//   <div className="left-eachsection-container">
//     <div className="selection-type-container">
//       <h1 className="type-heading">Type of Employment</h1>
//       <ul className="list-container">
//         {employmentTypesList.map(eachType => {
//           const onClickEmpTyp = () =>
//             this.selctedEmployement(eachType.employmentTypeId)
//           return (
//             <li
//               className="checkbox-container"
//               key={eachType.employmentTypeId}
//             >
//               <input
//                 type="checkbox"
//                 id={eachType.employmentTypeId}
//                 onClick={onClickEmpTyp}
//               />
//               <label
//                 className="label-ele"
//                 htmlFor={eachType.employmentTypeId}
//               >
//                 {eachType.label}
//               </label>
//             </li>
//           )
//         })}
//       </ul>
//     </div>
//   </div>
// )

//  typeOfSalarySection = () => (
//     <div className="left-eachsection-container">
//       <div className="selection-type-container">
//         <h1 className="type-heading">Salary Range</h1>
//         <ul className="list-container">
//           {salaryRangesList.map(eachType => {
//             const onClickSalary = () =>
//               this.selectSalaryAmount(eachType.salaryRangeId)
//             return (
//               <li className="radio-container" key={eachType.salaryRangeId}>
//                 <input
//                   type="radio"
//                   id={eachType.salaryRangeId}
//                   name="salary"
//                   onClick={onClickSalary}
//                 />
//                 <label className="label-ele" htmlFor={eachType.salaryRangeId}>
//                   {eachType.label}
//                 </label>
//               </li>
//             )
//           })}
//         </ul>
//       </div>
//     </div>
//   )
