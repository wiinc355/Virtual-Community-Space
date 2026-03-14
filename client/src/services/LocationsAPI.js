const BASE_URL = 'http://localhost:3000'

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
  }
}

export default LocationsAPI
