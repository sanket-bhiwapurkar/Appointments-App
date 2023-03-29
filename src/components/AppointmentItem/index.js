import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {id, title, date, isStarred} = appointmentDetails

  const onStarClicked = () => {
    toggleStar(id)
  }

  const starUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointment-container">
      <div className="title-container">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star-btn"
          data-testid="star"
          onClick={onStarClicked}
        >
          <img src={starUrl} alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
