const BASE_URL = 'http://localhost:3000'

const getAdminHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
})

const LocationsAPI = {
  getAllLocations: async () => {
    const response = await fetch(`${BASE_URL}/api/locations`)
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`)
    }
    return response.json()
  },
  getLocationById: async (id) => {
    const response = await fetch(`${BASE_URL}/api/locations/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch location: ${response.statusText}`)
    }
    return response.json()
  },
  createLocation: async (payload, token) => {
    const response = await fetch(`${BASE_URL}/api/locations`, {
      method: 'POST',
      headers: getAdminHeaders(token),
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`Failed to create location: ${response.statusText}`)
    }

    return response.json()
  },
  updateLocation: async (id, payload, token) => {
    const response = await fetch(`${BASE_URL}/api/locations/${id}`, {
      method: 'PUT',
      headers: getAdminHeaders(token),
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`Failed to update location: ${response.statusText}`)
    }

    return response.json()
  },
  deleteLocation: async (id, token) => {
    const response = await fetch(`${BASE_URL}/api/locations/${id}`, {
      method: 'DELETE',
      headers: getAdminHeaders(token)
    })

    if (!response.ok) {
      throw new Error(`Failed to delete location: ${response.statusText}`)
    }
  }
}

export default LocationsAPI
