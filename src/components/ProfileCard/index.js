import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const constStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class ProfileCard extends Component {
  state = {
    profileDetails: '',
    profileDetailsStatus: constStatus.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileDetailsStatus: constStatus.loading})
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileUrl, options)

    if (response.ok) {
      const data = await response.json()

      this.setState({
        profileDetails: data.profile_details,
        profileDetailsStatus: constStatus.success,
      })
    } else {
      this.setState({profileDetailsStatus: constStatus.failed})
    }
  }

  loaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retry = () => {
    this.getProfileDetails()
  }

  failedView = () => (
    <div className="loader-container">
      <button type="button" className="retry-btn" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  profileView = () => {
    const {profileDetails} = this.state

    return (
      <div className="profile">
        <img
          src={profileDetails.profile_image_url}
          alt="profile"
          className="profile-img"
        />
        <h1 className="profile-name">{profileDetails.name}</h1>
        <p className="profile-bio">{profileDetails.short_bio}</p>
      </div>
    )
  }

  renderResponse = () => {
    const {profileDetailsStatus} = this.state
    switch (profileDetailsStatus) {
      case constStatus.loading:
        return this.loaderView()
      case constStatus.success:
        return this.profileView()
      case constStatus.failed:
        return this.failedView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="left-eachsection-container">
          {this.renderResponse()}
        </div>
        <hr className="hr-line" />
      </>
    )
  }
}

export default ProfileCard
