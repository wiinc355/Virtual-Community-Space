const BASE_URL = 'http://localhost:3000'

const EventsAPI = {
  getAllEvents: async () => {
    const response = await fetch(`${BASE_URL}/api/events`)
    if (!response.ok) throw new Error(`Failed to fetch events: ${response.statusText}`)
    return response.json()
  },
  getEventsByLocation: async (locationId) => {
    const response = await fetch(`${BASE_URL}/api/events/location/${locationId}`)
    if (!response.ok) throw new Error(`Failed to fetch location events: ${response.statusText}`)
    return response.json()
  },
  getEventsById: async (id) => {
    const response = await fetch(`${BASE_URL}/api/events/${id}`)
    if (!response.ok) throw new Error(`Failed to fetch event: ${response.statusText}`)
    return response.json()
  }
}

export default EventsAPI
