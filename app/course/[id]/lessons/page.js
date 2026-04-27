'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import styles from './lessons.module.css'

export default function Page() {
  const { id } = useParams()
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLessons() {
      if (!id) return

      const res = await fetch(`/api/courses/${id}/lessons`)
      const json = await res.json()

      setLessons(json.data) // เอาทุกตัว
      setLoading(false)
    }

    fetchLessons()
  }, [id])

  const getEmbedUrl = (url) => {
    if (!url) return ""

    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0]
      return `https://www.youtube.com/embed/${videoId}`
    }

    if (url.includes("watch?v=")) {
      const videoId = url.split("watch?v=")[1].split("&")[0]
      return `https://www.youtube.com/embed/${videoId}`
    }

    return url
  }

  if (loading) return <h2>Loading...</h2>

    return (
    <div className={styles['lessons-page']}>
      <h1 className={styles['page-title']}>Lessons</h1>

      {lessons.map((lesson) => (
        <div key={lesson.id} className={styles['lesson-card']}>
          <h2 className={styles['lesson-title']}>{lesson.title}</h2>

          <div className={styles['video-wrapper']}>
            <iframe
              width="100%"
              height="450"
              src={getEmbedUrl(lesson.video_url)}
              title={lesson.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          <p className={styles['lesson-content']}>{lesson.content}</p>
          <hr className={styles['lesson-divider']} />
        </div>
      ))}
    </div>
  )
}