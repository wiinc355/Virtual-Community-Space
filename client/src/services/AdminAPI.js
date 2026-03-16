const BASE_URL = 'http://localhost:3000'

const AdminAPI = {
  login: async (username, password) => {
    const response = await fetch(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })

    if (!response.ok) {
      throw new Error('Invalid username or password')
    }

    return response.json()
  }
}

export default AdminAPI
