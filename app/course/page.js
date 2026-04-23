'use client'
import React, { useState, useEffect } from 'react'

const navLinks = ['Home', 'Enroll', 'About Me', 'Course', 'Login']

export default function Page() {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeLink, setActiveLink] = useState('Course')

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('https://online-cours-api-puap.vercel.app/api/courses')
        const data = await res.json()
        setCourses(data)
      } catch (err) {
        setError('โหลดข้อมูลไม่สำเร็จ: ' + err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  function handleEnroll(course) {
    alert('ลงทะเบียนคอร์ส: ' + course.title)
  }

  return (
    <div>
      <nav>
        <a href="#">LearnFlow</a>
        <ul>
          {navLinks.map(link => (
            <li key={link}>
              <button onClick={() => setActiveLink(link)}>
                {link}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <h1>คอร์สเรียนทั้งหมด</h1>
        <input
          type="text"
          placeholder="ค้นหาคอร์สจากชื่อ..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading && <p>กำลังโหลด...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && filtered.length === 0 && (
        <p>ไม่พบคอร์สที่ค้นหา</p>
      )}

      <div>
        {filtered.map(course => (
          <div key={course.id}>
            {course.thumbnail_url && (
              <img src={course.thumbnail_url} alt={course.title} width={200} />
            )}
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>ผู้สอน: {course.users?.full_name}</p>
            <button onClick={() => handleEnroll(course)}>
              Enroll / ลงทะเบียนเรียน
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

