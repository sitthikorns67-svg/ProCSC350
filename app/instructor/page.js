'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './createCourse.module.css'

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
  <div className={styles.container}>
    <div className={styles.inner}>

      <h1 className={styles.title}>Create New Course</h1>

      {/* Search by Instructor ID */}
      <h2 className={styles.sectionTitle}>All Courses by Instructor ID</h2>
      <div className={styles.searchRow}>
        <input
          className={styles.inputText}
          type="number"
          value={instructorSearchId}
          onChange={(e) => setInstructorSearchId(e.target.value)}
          placeholder="Enter instructor ID"
          onKeyDown={(e) => e.key === 'Enter' && handleSearchByInstructor()}
        />
        <button className={styles.buttonSearch} onClick={handleSearchByInstructor} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* แสดงผลการค้นหา */}
      {courses.length > 0 && (
        <div>
          {courses.map((c) => (
            <div className={styles.courseCard} key={c.id}>
              <p className={styles.courseCardTitle}>ID: {c.id} — {c.title}</p>
              <p className={styles.courseCardDesc}>{c.description}</p>
              <div className={styles.courseCardActions}>
                <span className={`${styles.badge} ${c.is_published ? styles.badgePublished : styles.badgeDraft}`}>
                  {c.is_published ? 'Published' : 'Draft'}
                </span>
                <button className={styles.buttonEdit} onClick={() => router.push(`/instructor/lesson/${c.id}`)}>Edit</button>
                <button className={styles.buttonDelete} onClick={() => handleDelete(c.id)}>Delete</button>
              </div>
              {c.thumbnail_url && (
                <img className={styles.thumbnailPreview} src={c.thumbnail_url} alt={c.title} width={200} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* ไม่พบ course */}
      {courses.length === 0 && instructorSearchId && !loading && (
        <p>No courses found for instructor ID: {instructorSearchId}</p>
      )}

      <hr className={styles.divider} />

      {/* Create Form */}
      <div className={styles.form}>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Instructor ID <span className={styles.required}>*</span></label>
          <input
            className={styles.inputNumber}
            type="number"
            name="instructor_id"
            value={form.instructor_id}
            onChange={handleChange}
            placeholder="Enter instructor ID"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Title <span className={styles.required}>*</span></label>
          <input
            className={styles.inputText}
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Course title"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Description</label>
          <textarea
            className={styles.textarea}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Course description"
            rows={4}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Thumbnail URL</label>
          <input
            className={styles.inputText}
            type="text"
            name="thumbnail_url"
            value={form.thumbnail_url}
            onChange={handleChange}
            placeholder="https://..."
          />
          {form.thumbnail_url && (
            <img className={styles.thumbnailPreview} src={form.thumbnail_url} alt="preview" width={200} />
          )}
        </div>

        <div className={styles.checkboxRow}>
          <input
            type="checkbox"
            id="is_published"
            name="is_published"
            checked={form.is_published}
            onChange={handleChange}
          />
          <label htmlFor="is_published">Publish immediately</label>
        </div>

        {error && <p className={styles.error}>Error: {error}</p>}

        <div className={styles.buttonGroup}>
          <button className={styles.buttonCancel} onClick={() => router.back()} disabled={loading}>
            Cancel
          </button>
          <button className={styles.buttonSubmit} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creating...' : 'Create Course'}
          </button>
        </div>

      </div>
    </div>
  </div>
)
}