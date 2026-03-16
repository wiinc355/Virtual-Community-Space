import React from 'react'
import { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import '../css/Events.css'

const Events = () => {
  const [events, setEvents] = useState([])
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('all')

  useEffect(() => {
    ;(async () => {
      try {
        const [eventsData, locationsData] = await Promise.all([
          EventsAPI.getAllEvents(),
          LocationsAPI.getAllLocations()
        ])

        setEvents(eventsData)
        setLocations(locationsData)
      } catch (error) {
        console.error('Failed to load events:', error)
      }
    })()
  }, [])

  const filteredEvents =
    selectedLocation === 'all'
      ? events
      : events.filter(event => String(event.location) === selectedLocation)

  return (
    <div className='events-page'>
      <div className='events-controls'>
        <select
          className='location-filter header-action'
          id='location-filter'
          value={selectedLocation}
          onChange={(event) => setSelectedLocation(event.target.value)}
        >
          <option value='all'>See events at...</option>
          {locations.map(location => (
            <option key={location.id} value={String(location.id)}>
              {location.name}
            </option>
          ))}
        </select>

        <button
          className='show-all-events-btn header-action'
          type='button'
          onClick={() => setSelectedLocation('all')}
        >
          Show All Events
        </button>
      </div>

      <div className='events-grid'>
        {filteredEvents.length > 0
          ? filteredEvents.map(event => (
              <Event
                key={event.id}
                id={event.id}
                title={event.title}
                event_date={event.event_date}
                event_time={event.event_time}
                image={event.image}
              />
            ))
          : <p className='events-empty'>No events found for this location.</p>
        }
      </div>
    </div>
  )
}

export default Events
