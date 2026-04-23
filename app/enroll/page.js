'use client'
import React, { useState, useEffect } from 'react'

const navLinks = ['Home', 'Enroll', 'About Me', 'Course', 'Login']

// mock student_id ก่อน ปกติดึงจาก session/auth
const STUDENT_ID = 1

export default function Page() {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeLink, setActiveLink] = useState('Enroll')

  useEffect(() => {
    async function fetchEnrollments() {
      try {
        const res = await fetch(
          `https://online-cours-api-puap.vercel.app/api/enrollments?student_id=${STUDENT_ID}`
        )
        if (!res.ok) throw new Error('โหลดข้อมูลไม่สำเร็จ')
        const data = await res.json()
        setEnrollments(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchEnrollments()
  }, [])

  return (
    <div>
      {/* NAV */}
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

      {/* HEADER */}
      <div>
        <h1>คอร์สที่ลงทะเบียนแล้ว</h1>
      </div>

      {/* CONTENT */}
      {loading && <p>กำลังโหลด...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && enrollments.length === 0 && (
        <p>ยังไม่มีคอร์สที่ลงทะเบียน</p>
      )}

      {/* ENROLLMENT LIST */}
      <div>
        {enrollments.map(enroll => (
          <div key={enroll.id}>
            <h2>{enroll.courses?.title ?? enroll.course_id}</h2>
            <p>{enroll.courses?.description}</p>
            <p>ผู้สอน: {enroll.courses?.users?.full_name}</p>
            <p>ลงทะเบียนเมื่อ: {new Date(enroll.enrolled_at).toLocaleDateString('th-TH')}</p>
            <p>
              สถานะ: {enroll.completed_at ? '✅ เรียนจบแล้ว' : '📚 กำลังเรียน'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

