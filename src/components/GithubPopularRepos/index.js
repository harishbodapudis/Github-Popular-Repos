import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {displayInfo: '', initialCategory: 'ALL', fetchStatus: 'LOADER'}

  componentDidMount = () => {
    this.getLanguageChannelsInfo()
  }

  getLanguageChannelsInfo = async () => {
    const {initialCategory} = this.state

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${initialCategory}`
    const response = await fetch(apiUrl)

    console.log(response)

    if (response.ok) {
      const resData = await response.json()
      const repos = {popularRepos: resData.popular_repos}
      const {popularRepos} = repos
      const popularReposData = popularRepos.map(items => ({
        id: items.id,
        name: items.name,
        avatarUrl: items.avatar_url,
        forksCount: items.forks_count,
        issuesCount: items.issues_count,
        starsCount: items.stars_count,
      }))
      this.setState({displayInfo: popularReposData, fetchStatus: 'SUCCESS'})
    } else {
      console.log('fail')
      this.setState({fetchStatus: 'FAILURE'})
    }
  }

  getLanguageId = id => {
    this.setState(
      {initialCategory: id, displayInfo: '', fetchStatus: 'LOADER'},
      this.getLanguageChannelsInfo,
    )
  }

  languageDetailsBlock = () => {
    const {displayInfo} = this.state

    return (
      <div className="info-card">
        <ul className="data-container">
          {displayInfo.map(arr => (
            <RepositoryItem key={arr.id} details={arr} />
          ))}
        </ul>
      </div>
    )
  }

  fetchFailedCard = () => (
    <div className="info-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
        className="failure-view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  loaderCard = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderData = () => {
    const {fetchStatus} = this.state
    switch (fetchStatus) {
      case 'SUCCESS':
        return this.languageDetailsBlock()
      case 'FAILURE':
        return this.fetchFailedCard()
      default:
        return this.loaderCard()
    }
  }

  render() {
    const {displayInfo, initialCategory, fetchStatus} = this.state
    console.log(displayInfo, languageFiltersData, fetchStatus)
    return (
      <div className="Main-container">
        <h1 className="heading">Popular</h1>
        <ul className="languages-container">
          {languageFiltersData.map(item => (
            <LanguageFilterItem
              key={item.id}
              data={item}
              getLanguageId={this.getLanguageId}
              initialCategory={initialCategory}
            />
          ))}
        </ul>
        {this.renderData()}
      </div>
    )
  }
}

export default GithubPopularRepos
