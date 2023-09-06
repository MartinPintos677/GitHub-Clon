import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import '../Css/Header.css'

const Header = () => {
  return (
    <div className="header-full">
      <div className="elements">
        <div className="">
          <FontAwesomeIcon icon={faGithub} className="github-logo" />
        </div>
        <div className="">
          <div className="search-panels">
            <div className="search-group">
              <input
                required
                type="text"
                name="text"
                autoComplete="on"
                className="input"
              />
              <label className="enter-label">
                Buscar usuario o repositorio
              </label>
              <div className="btn-box">
                <button className="btn-search">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                    <circle id="svg-circle" cx="208" cy="208" r="144"></circle>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="line-header"></div>
    </div>
  )
}

export default Header
