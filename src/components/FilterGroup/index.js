import {IoIosSearch} from 'react-icons/io'

import './index.css'

export const EmplymentTypeFilter = props => {
  const {selctedEmployement, employmentTypesList} = props
  const userSelection = employmentType => {
    selctedEmployement(employmentType)
  }
  return (
    <>
      <div className="left-eachsection-container">
        <div className="selection-type-container">
          <h1 className="type-heading">Type of Employment</h1>
          <ul className="list-container">
            {employmentTypesList.map(eachType => {
              const onClickEmpTyp = () =>
                userSelection(eachType.employmentTypeId)
              return (
                <li
                  className="checkbox-container"
                  key={eachType.employmentTypeId}
                >
                  <input
                    type="checkbox"
                    id={eachType.employmentTypeId}
                    onClick={onClickEmpTyp}
                  />
                  <label
                    className="label-ele"
                    htmlFor={eachType.employmentTypeId}
                  >
                    {eachType.label}
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <hr className="hr-line" />
    </>
  )
}

export const SalaryFilter = props => {
  const {salaryRangesList, selectSalaryAmount} = props
  const userSelection = salary => {
    selectSalaryAmount(salary)
  }
  return (
    <div className="left-eachsection-container">
      <div className="selection-type-container">
        <h1 className="type-heading">Salary Range</h1>
        <ul className="list-container">
          {salaryRangesList.map(eachType => {
            const onClickSalary = () => userSelection(eachType.salaryRangeId)
            return (
              <li className="radio-container" key={eachType.salaryRangeId}>
                <input
                  type="radio"
                  id={eachType.salaryRangeId}
                  name="salary"
                  onClick={onClickSalary}
                />
                <label className="label-ele" htmlFor={eachType.salaryRangeId}>
                  {eachType.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export const SearchSmFilter = props => {
  const {onChangeUserSearch, getSearch, searchContainerType} = props

  const userSearch = event => {
    onChangeUserSearch(event.target.value)
  }

  const onEnterPressed = event => {
    if (event.key === 'Enter') {
      getSearch()
    }
  }

  const userPressSearchBtn = () => {
    getSearch()
  }

  const searchConClass =
    searchContainerType === 'SMALL' ? 'small-search-con' : 'large-search-con'

  return (
    <div className={`search-sm-container ${searchConClass}`}>
      <input
        type="search"
        className="search-input-sm"
        placeholder="Search"
        onChange={userSearch}
        onKeyDown={onEnterPressed}
        data-testid="searchButton"
      />
      <button
        className="search-button-sm"
        type="button"
        onClick={userPressSearchBtn}
        data-testid="searchButton"
      >
        <IoIosSearch label="serch" className="seach-icon-sm" />
      </button>
    </div>
  )
}
