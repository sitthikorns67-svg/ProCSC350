'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './course.module.css'

export default function Page() {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses")
        const data = await res.json()
        setCourses(data)
      } catch (error) {
        console.log("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleLessons = (courseId) => {
    router.push(`/course/${courseId}/lessons`)
  }


  return (
  <div>

    {/* ===== Navbar ===== */}
    <nav className={styles.navbar}>
      <div>
        <ul className={styles.navList}>
          {/* ลิงก์นำทางแต่ละหน้า */}
          <li><a className={styles.navLink} href="/home">Home</a></li>
          <li><a className={styles.navLink} href="/course">Courses</a></li>
          <li><a className={styles.navLink} href="/about">About</a></li>
        </ul>
      </div>
    </nav>

    {/* ===== Header ===== */}
    <div className={styles.header}>
      <h1 className={styles.headerTitle}>Course List</h1>
      <p className={styles.headerDesc}>ค้นหารายวิชาที่คุณต้องการเรียน</p>

      {/* ช่องค้นหา — อัปเดต state search ทุกครั้งที่พิมพ์ */}
      <input
        className={styles.searchBox}
        type="text"
        placeholder="Search course title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* ===== Course List ===== */}
    <div className={styles.courseContainer}>

      {/* กำลังโหลดข้อมูลจาก API */}
      {loading ? (
        <h2 className={styles.loading}>Loading...</h2>

      ) : filteredCourses.length === 0 ? (
        /* ไม่พบ course ที่ตรงกับคำค้นหา */
        <h2 className={styles.loading}>No course found</h2>

      ) : (
        /* แสดง course card ทั้งหมดที่กรองแล้ว */
        filteredCourses.map(course => (
          <div className={styles.courseCard} key={course.id}>

            {/* แสดง thumbnail เฉพาะเมื่อมี URL */}
            {course.thumbnail_url && (
              <img
                className={styles.thumbnail}
                src={course.thumbnail_url}
                alt={course.title}
                width={500}
                height={300}
              />
            )}

            <div className={styles.cardBody}>
              {/* ชื่อ course */}
              <h2 className={styles.cardTitle}>{course.title}</h2>

              {/* ชื่อ instructor — ถ้าไม่มีให้แสดง "Unknown" */}
              <p className={styles.teacher}>
                Instructor: {course.users?.full_name || 'Unknown'}
              </p>

              {/* คำอธิบาย course */}
              <p className={styles.desc}>{course.description}</p>
            </div>

            {/* ปุ่ม Enroll — กดแล้วไปหน้า lessons ของ course นั้น */}
            <button
              className={styles.enrollBtn}
              onClick={() => handleLessons(course.id)}
            >
              Enroll
            </button>

          </div>
        ))
      )}

    </div>
  </div>
)
}