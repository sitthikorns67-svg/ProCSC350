'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import styles from './createLesson.module.css'

export default function CreateLessonPage() {
  const { id } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    title: '',
    video_url: '',
    content: '',
    position: '',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit() {
    if (!form.title) {
      setError('Title is required')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/courses/${id}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          video_url: form.video_url,
          content: form.content,
          position: Number(form.position) || 0,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push('/instructor')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

 return (
  <div className={styles.container}>
    <div className={styles.inner}>
      <h1 className={styles.title}>Add Lesson to Course ID: {id}</h1>

      <div className={styles.form}>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Title *</label>
          <input
            className={styles.inputText}
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Lesson title"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Video URL</label>
          <input
            className={styles.inputText}
            type="text"
            name="video_url"
            value={form.video_url}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Content</label>
          <textarea
            className={styles.textarea}
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Lesson content"
            rows={5}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Position</label>
          <input
            className={styles.inputNumber}
            type="number"
            name="position"
            value={form.position}
            onChange={handleChange}
            placeholder="0"
          />
        </div>

        {error && <p className={styles.error}>Error: {error}</p>}

        <div className={styles.buttonGroup}>
          <button className={styles.buttonCancel} onClick={() => router.back()} disabled={loading}>
            Cancel
          </button>
          <button className={styles.buttonSubmit} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Adding...' : 'Add Lesson'}
          </button>
        </div>

      </div>
    </div>
  </div>
)
}