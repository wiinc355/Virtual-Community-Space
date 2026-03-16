import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import '../css/AdminDashboard.css'

const EMPTY_EVENT = { title: '', event_date: '', event_time: '', location: '', image: '' }
const EMPTY_LOCATION = { name: '', address: '', city: '', state: '', zip: '', image: '' }

const toDateInputValue = (value) => {
  if (!value) return ''
  if (typeof value === 'string' && value.includes('T')) return value.slice(0, 10)
  return String(value).slice(0, 10)
}

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [activeType, setActiveType] = useState('locations')
  const [events, setEvents] = useState([])
  const [locations, setLocations] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState(EMPTY_LOCATION)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    if (!token) {
      navigate('/admin/login')
      return
    }

    ;(async () => {
      try {
        const [eventsData, locationsData] = await Promise.all([
          EventsAPI.getAllEvents(),
          LocationsAPI.getAllLocations()
        ])
        setEvents(eventsData)
        setLocations(locationsData)
      } catch {
        setErrorMessage('Failed to load admin data')
      }
    })()
  }, [navigate, token])

  const sortedItems = useMemo(() => {
    if (activeType === 'locations') {
      return [...locations].sort((a, b) => a.name.localeCompare(b.name))
    }
    return [...events].sort((a, b) => a.title.localeCompare(b.title))
  }, [activeType, events, locations])

  const selectedItem = useMemo(
    () => (selectedId !== null ? sortedItems.find((item) => item.id === selectedId) || null : null),
    [selectedId, sortedItems]
  )

  useEffect(() => {
    if (isAdding) {
      setFormData(activeType === 'locations' ? EMPTY_LOCATION : EMPTY_EVENT)
      return
    }
    if (!selectedItem) {
      setFormData(activeType === 'locations' ? EMPTY_LOCATION : EMPTY_EVENT)
      return
    }
    const base = { ...selectedItem }
    if (activeType === 'events') base.event_date = toDateInputValue(base.event_date)
    setFormData(base)
  }, [activeType, selectedItem, isAdding])

  useEffect(() => {
    setSelectedId(null)
    setIsAdding(false)
    setErrorMessage('')
  }, [activeType])

  const handleSelect = (item) => {
    setSelectedId(item.id)
    setIsAdding(false)
    setErrorMessage('')
  }

  const handleAddClick = () => {
    setSelectedId(null)
    setIsAdding(true)
    setErrorMessage('')
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const authError = (error) =>
    error.message.includes('403') || error.message.includes('401')

  const handleSave = async () => {
    setIsSaving(true)
    setErrorMessage('')

    try {
      if (activeType === 'locations') {
        if (isAdding) {
          const created = await LocationsAPI.createLocation(formData, token)
          setLocations((prev) => [...prev, created])
          setSelectedId(created.id)
        } else {
          const updated = await LocationsAPI.updateLocation(selectedItem.id, formData, token)
          setLocations((prev) => prev.map((loc) => (loc.id === updated.id ? updated : loc)))
          setSelectedId(updated.id)
        }
      } else {
        const payload = {
          ...formData,
          event_time: Number(formData.event_time),
          location: Number(formData.location)
        }
        if (isAdding) {
          const created = await EventsAPI.createEvent(payload, token)
          setEvents((prev) => [...prev, created])
          setSelectedId(created.id)
        } else {
          const updated = await EventsAPI.updateEvent(selectedItem.id, payload, token)
          setEvents((prev) => prev.map((ev) => (ev.id === updated.id ? updated : ev)))
          setSelectedId(updated.id)
        }
      }
      setIsAdding(false)
    } catch (error) {
      if (authError(error)) { handleLogout(); return }
      setErrorMessage(isAdding ? 'Failed to create item' : 'Failed to update item')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedItem) return
    setIsSaving(true)
    setErrorMessage('')

    try {
      if (activeType === 'locations') {
        await LocationsAPI.deleteLocation(selectedItem.id, token)
        setLocations((prev) => prev.filter((loc) => loc.id !== selectedItem.id))
      } else {
        await EventsAPI.deleteEvent(selectedItem.id, token)
        setEvents((prev) => prev.filter((ev) => ev.id !== selectedItem.id))
      }
      setSelectedId(null)
    } catch (error) {
      if (authError(error)) { handleLogout(); return }
      setErrorMessage('Failed to delete item')
    } finally {
      setIsSaving(false)
    }
  }

  const detailTitle = isAdding
    ? `New ${activeType === 'locations' ? 'Location' : 'Event'}`
    : selectedItem
      ? (activeType === 'locations' ? selectedItem.name : selectedItem.title)
      : null

  return (
    <div className='admin-dashboard-page'>

      {/* Column 1 – navigation */}
      <nav className='admin-nav'>
        <div className='admin-nav-top'>
          <button
            type='button'
            className={activeType === 'locations' ? 'active' : ''}
            onClick={() => setActiveType('locations')}
          >
            Locations
          </button>
          <button
            type='button'
            className={activeType === 'events' ? 'active' : ''}
            onClick={() => setActiveType('events')}
          >
            Events
          </button>
        </div>
      </nav>

      {/* Column 2 – sorted list as links */}
      <ul className='admin-list-col'>
        {sortedItems.map((item) => (
          <li key={item.id}>
            <a
              href='#'
              className={selectedId === item.id && !isAdding ? 'selected' : ''}
              onClick={(e) => { e.preventDefault(); handleSelect(item) }}
            >
              {activeType === 'locations' ? item.name : item.title}
            </a>
          </li>
        ))}
      </ul>

      {/* Column 3 – detail / add panel */}
      <section className='admin-detail-col'>
        <div className='admin-detail-header'>
          <h3>{detailTitle || `Select a ${activeType === 'locations' ? 'location' : 'event'}`}</h3>
          <button type='button' className='add-btn' onClick={handleAddClick}>+ Add</button>
        </div>

        {(selectedItem || isAdding) && (
          <>
            {activeType === 'locations' && (
              <div className='admin-form'>
                <label htmlFor='name'>Name</label>
                <input id='name' name='name' value={formData.name || ''} onChange={handleInputChange} />

                <label htmlFor='address'>Address</label>
                <input id='address' name='address' value={formData.address || ''} onChange={handleInputChange} />

                <label htmlFor='city'>City</label>
                <input id='city' name='city' value={formData.city || ''} onChange={handleInputChange} />

                <label htmlFor='state'>State</label>
                <input id='state' name='state' value={formData.state || ''} onChange={handleInputChange} />

                <label htmlFor='zip'>Zip</label>
                <input id='zip' name='zip' value={formData.zip || ''} onChange={handleInputChange} />

                <label htmlFor='image'>Image URL</label>
                <input id='image' name='image' value={formData.image || ''} onChange={handleInputChange} />
              </div>
            )}

            {activeType === 'events' && (
              <div className='admin-form'>
                <label htmlFor='title'>Title</label>
                <input id='title' name='title' value={formData.title || ''} onChange={handleInputChange} />

                <label htmlFor='event_date'>Date</label>
                <input id='event_date' name='event_date' type='date' value={formData.event_date || ''} onChange={handleInputChange} />

                <label htmlFor='event_time'>Time (HHMM)</label>
                <input id='event_time' name='event_time' type='number' value={formData.event_time || ''} onChange={handleInputChange} />

                <label htmlFor='location'>Location ID</label>
                <input id='location' name='location' type='number' value={formData.location || ''} onChange={handleInputChange} />

                <label htmlFor='image'>Image URL</label>
                <input id='image' name='image' value={formData.image || ''} onChange={handleInputChange} />
              </div>
            )}

            <div className='admin-action-row'>
              <button type='button' onClick={handleSave} disabled={isSaving}>
                {isAdding ? 'Save' : 'Update'}
              </button>
              {!isAdding && (
                <button type='button' onClick={handleDelete} disabled={isSaving}>Delete</button>
              )}
              {isAdding && (
                <button type='button' onClick={() => setIsAdding(false)} disabled={isSaving}>Cancel</button>
              )}
            </div>

            {errorMessage && <small className='admin-error'>{errorMessage}</small>}
          </>
        )}
      </section>
    </div>
  )
}

export default AdminDashboard
