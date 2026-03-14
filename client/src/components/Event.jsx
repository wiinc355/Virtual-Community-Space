import React from 'react'
import unitygrid from '../assets/unitygrid.jpg'
import '../css/Event.css'

const formatTime = (t) => {
    if (!t) return ''
    const h = Math.floor(t / 100)
    const m = String(t % 100).padStart(2, '0')
    const period = h >= 12 ? 'PM' : 'AM'
    const hour = h > 12 ? h - 12 : h === 0 ? 12 : h
    return `${hour}:${m} ${period}`
}

const formatRemaining = (dateStr) => {
    if (!dateStr) return ''
    const now = new Date()
    const eventDate = new Date(dateStr)
    const diff = eventDate - now
    if (diff < 0) return 'Event has passed'
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Today!'
    return `${days} day${days === 1 ? '' : 's'} away`
}

const Event = ({ id, title, date, event_date, time, event_time, image }) => {
    const displayDate = date || event_date
    const displayTime = time || event_time

    return (
        <article className='event-information'>
            <img
                src={image}
                alt={title}
                onError={(event) => {
                    event.currentTarget.onerror = null
                    event.currentTarget.src = unitygrid
                }}
            />
            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {displayDate && new Date(displayDate).toLocaleDateString()} <br /> {formatTime(displayTime)}</p>
                    <p id={`remaining-${id}`}>{formatRemaining(displayDate)}</p>
                </div>
            </div>
        </article>
    )
}

export default Event
