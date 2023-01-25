// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {data, getLanguageId, initialCategory} = props
  const {id, language} = data

  const getInfo = () => {
    getLanguageId(id)
  }

  const active = initialCategory === id ? 'on-active' : ''
  return (
    <li className="language-btn">
      <button className={`lang-btn ${active}`} type="button" onClick={getInfo}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
