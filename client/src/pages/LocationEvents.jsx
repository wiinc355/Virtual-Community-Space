import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import '../css/LocationEvents.css'

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])

    useEffect(() => {
        ;(async () => {
            try {
                const [locationData, eventData] = await Promise.all([
                    LocationsAPI.getLocationById(index),
                    EventsAPI.getEventsByLocation(index)
                ])

                setLocation(locationData)
                setEvents(eventData)
            } catch (error) {
                console.error('Failed to load location details:', error)
            }
        })()
    }, [index])

    if (!location) {
        return (
            <div className='location-events'>
                <main>
                    <h2>Loading location...</h2>
                </main>
            </div>
        )
    }

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} alt={location.name} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
                {
                    events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            event_date={event.event_date}
                            event_time={event.event_time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents