// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {name, id, avatarUrl, forksCount, issuesCount, starsCount} = details

  return (
    <li className="frame-work-box">
      <img src={avatarUrl} alt={name} className="lang-logo" />
      <h1 className="frame-work-name">{name}</h1>
      <div className="stars-block">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stars-img"
        />
        <p>{starsCount} stars</p>
      </div>

      <div className="forks-block">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="forks-img"
        />
        <p>{forksCount} forks</p>
      </div>

      <div className="open-issues-block">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="issues-img"
        />
        <p>{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
