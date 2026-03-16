const BASE_URL = 'http://localhost:3000'

const getAdminHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
})

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
  getEventById: async (id) => {
    const response = await fetch(`${BASE_URL}/api/events/${id}`)
    if (!response.ok) throw new Error(`Failed to fetch event: ${response.statusText}`)
    return response.json()
  },
  createEvent: async (payload, token) => {
    const response = await fetch(`${BASE_URL}/api/events`, {
      method: 'POST',
      headers: getAdminHeaders(token),
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`Failed to create event: ${response.statusText}`)
    }

    return response.json()
  },
  updateEvent: async (id, payload, token) => {
    const response = await fetch(`${BASE_URL}/api/events/${id}`, {
      method: 'PUT',
      headers: getAdminHeaders(token),
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`Failed to update event: ${response.statusText}`)
    }

    return response.json()
  },
  deleteEvent: async (id, token) => {
    const response = await fetch(`${BASE_URL}/api/events/${id}`, {
      method: 'DELETE',
      headers: getAdminHeaders(token)
    })

    if (!response.ok) {
      throw new Error(`Failed to delete event: ${response.statusText}`)
    }
  }
}

export default EventsAPI
