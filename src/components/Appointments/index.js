import './index.css'

import {format} from 'date-fns'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

const obj = [
  {
    id: uuidv4(),
    title: 'Dentist',
    date: format(new Date(), 'dd MMMM yyyy, EEEE'),
    isStarred: false,
  },
]

console.log(obj[0].date)

class Appointments extends Component {
  state = {title: '', date: '', appointmentList: [], isStarredActive: false}

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onDateChange = event => {
    this.setState({date: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title === '' || date === '') {
      return
    }
    const newAppointment = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }
    this.setState(prevState => ({
      title: '',
      date: '',
      appointmentList: [...prevState.appointmentList, newAppointment],
    }))
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStarred = () => {
    this.setState(prevState => ({isStarredActive: !prevState.isStarredActive}))
  }

  render() {
    const {title, date, appointmentList, isStarredActive} = this.state
    let filteredList = []
    if (isStarredActive) {
      filteredList = appointmentList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    } else {
      filteredList = appointmentList
    }
    const starredCLass = isStarredActive ? 'starred' : ''
    return (
      <div className="bg-container">
        <div className="card">
          <div className="form-container">
            <form className="form">
              <h1 className="heading">Add Appointment</h1>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                className="input"
                type="text"
                id="title"
                value={title}
                placeholder="Title"
                onChange={this.onTitleChange}
              />
              <label className="label" htmlFor="date">
                DATE
              </label>
              <input
                className="input"
                type="date"
                id="date"
                value={date}
                onChange={this.onDateChange}
              />
              <button
                className="add-btn"
                type="submit"
                onClick={this.addAppointment}
              >
                Add
              </button>
            </form>
            {window.innerWidth > 767 ? (
              <img
                alt="appointments"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="image"
              />
            ) : null}
          </div>
          <hr className="ruler" />
          <div className="sub-heading-btn-container">
            <h1 className="heading">Appointments</h1>
            <button
              className={`starred-btn ${starredCLass}`}
              type="button"
              onClick={this.onClickStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {filteredList.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
