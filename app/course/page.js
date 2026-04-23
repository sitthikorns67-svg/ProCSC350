'use client'
import React, { useEffect, useState } from 'react'

export default function Page() {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

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

  return (
    <div>
      {/* Navbar */}
      <nav>
        <div>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Courses</a></li>
            <li><a href="#">Enroll</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>
      </nav>

      {/* Header */}
      <div className="header">
        <h1>Course List</h1>
        <p>ค้นหารายวิชาที่คุณต้องการเรียน</p>

        <input
          type="text"
          placeholder="Search course title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
      </div>

      {/* Course List */}
      <div className="course-container">
        {loading ? (
          <h2 className="loading">Loading...</h2>
        ) : filteredCourses.length === 0 ? (
          <h2 className="loading"> No course found</h2>
        ) : (
          filteredCourses.map(course => (
            <div className="course-card" key={course.id}>
              <h2>{course.title}</h2>
              {course.thumbnail_url && (
                <iframe
                  width="600px"
                  height="400px"
                  src={course.thumbnail_url.replace("youtu.be/", "www.youtube.com/embed/")}
                  title="Course Preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
              <p className="teacher">
                Instructor: {course.users?.full_name || "Unknown"}
              </p>

              <p className="desc">{course.description}</p>

              <button className="enroll-btn">
                Enroll
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}