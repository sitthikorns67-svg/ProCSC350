'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateCoursePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [courses, setCourses] = useState([])
  const [instructorSearchId, setInstructorSearchId] = useState('')

  const [form, setForm] = useState({
    instructor_id: '',
    title: '',
    description: '',
    thumbnail_url: '',
    is_published: false,
  })

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSearchByInstructor() {
    if (!instructorSearchId) return
    setLoading(true)
    setError(null)
    setCourses([])
    try {
      const res = await fetch(`/api/courses?instructor_id=${instructorSearchId}`)
      if (!res.ok) throw new Error('Failed to fetch courses')
      const data = await res.json()
      setCourses(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit() {
    if (!form.instructor_id) {
      setError('Instructor ID is required')
      return
    }
    if (!form.title) {
      setError('Title is required')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instructor_id: Number(form.instructor_id),
          title: form.title,
          description: form.description,
          thumbnail_url: form.thumbnail_url,
          is_published: form.is_published,
        }),
      })
      const data = await res.json()
      alert(`Course created`)

      if (!res.ok) throw new Error(data.error)
      router.push('/instructor')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(courseId) {
    if (!confirm(`ลบ course ID ${courseId}?`)) return
    try {
      const res = await fetch(`/api/courses/${courseId}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to delete course')
      setCourses((prev) => prev.filter((c) => c.id !== courseId))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <h1>Create New Course</h1>

      {/* Search by Instructor ID */}
      <div>
        <h2>All Courses by Instructor ID</h2>
        <input
          type="number"
          value={instructorSearchId}
          onChange={(e) => setInstructorSearchId(e.target.value)}
          placeholder="Enter instructor ID"
          onKeyDown={(e) => e.key === 'Enter' && handleSearchByInstructor()}
        />
        <button onClick={handleSearchByInstructor}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {courses.length > 0 && (
        <div>
          <p>Found {courses.length} course(s)</p>
          {courses.map((c) => (
            <div key={c.id}>
              <p>ID: {c.id}</p>
              <p>Title: {c.title}</p>
              <p>Description: {c.description}</p>
              <p>Status: {c.is_published ? 'Published' : 'Draft'}</p>
              {c.thumbnail_url && (
                <img src={c.thumbnail_url} alt={c.title} width={200} />
              )}
              <button onClick={() => router.push(`/instructor/lesson/${c.id}`)}>Edit</button>
              <button onClick={() => handleDelete(c.id)}>Delete</button>
              <hr />
            </div>
          ))}
        </div>
      )}

      {courses.length === 0 && instructorSearchId && !loading && (
        <p>No courses found for instructor ID: {instructorSearchId}</p>
      )}

      <hr />

      {/* Create Form */}
      <div>
        <label>Instructor ID *</label>
        <input
          type="number"
          name="instructor_id"
          value={form.instructor_id}
          onChange={handleChange}
          placeholder="Enter instructor ID"
        />
      </div>

      <div>
        <label>Title *</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Course title"
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange
          }
          placeholder="Course description"
          rows={4}
        />
      </div>

      <div>
        <label>Thumbnail URL</label>
        <input
          type="text"
          name="thumbnail_url"
          value={form.thumbnail_url}
          onChange={handleChange}
          placeholder="https://..."
        />
        {form.thumbnail_url && (
          <img src={form.thumbnail_url} alt="preview" width={200} />
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="is_published"
            checked={form.is_published}
            onChange={handleChange}
          />
          Publish immediately
        </label>
      </div>

      {error && <p>Error: {error}</p>}

      <button onClick={() => router.back()} disabled={loading}>
        Cancel
      </button>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Creating...' : 'Create Course'}
      </button>
    </div>
  )
}