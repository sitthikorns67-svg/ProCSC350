'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

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
    <div>
      <h1>Add Lesson to Course ID: {id}</h1>

      <div>
        <label>Title *</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Lesson title"
        />
      </div>

      <div>
        <label>Video URL</label>
        <input
          type="text"
          name="video_url"
          value={form.video_url}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div>
        <label>Content</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Lesson content"
          rows={5}
        />
      </div>

      <div>
        <label>Position</label>
        <input
          type="number"
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="0"
        />
      </div>

      {error && <p>Error: {error}</p>}

      <button onClick={() => router.back()} disabled={loading}>Cancel</button>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Adding...' : 'Add Lesson'}
      </button>
    </div>
  )
}