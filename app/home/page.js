'use client'

import React, { useState } from 'react'

const courses = [
  {
    id: 1,
    title: 'React & Next.js Masterclass',
    level: 'Intermediate',
    duration: '40 hrs',
    students: '12,400',
    price: '฿1,290',
    tags: ['React', 'Next.js', 'TypeScript'],
  },
  {
    id: 2,
    title: 'UI/UX Design Fundamentals',
    level: 'Beginner',
    duration: '28 hrs',
    students: '8,900',
    price: '฿990',
    tags: ['Figma', 'Prototyping', 'Design'],
  },
  {
    id: 3,
    title: 'Node.js Backend Engineering',
    level: 'Advanced',
    duration: '55 hrs',
    students: '6,200',
    price: '฿1,590',
    tags: ['Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 4,
    title: 'Python for Data Science',
    level: 'Beginner',
    duration: '35 hrs',
    students: '15,000',
    price: '฿1,090',
    tags: ['Python', 'Pandas', 'ML'],
  },
]

const navLinks = ['Home', 'Enroll', 'About Me', 'Course', 'Login']

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')

  return (
    <div>
      {/* NAV */}
      <nav>
        <a href="#">LearnFlow</a>

        <ul>
          {navLinks.map(link => (
            <li key={link}>
              <a onClick={() => { setActiveLink(link); setMenuOpen(false) }}>
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div>
          <button>Login</button>
          <button>Register</button>
        </div>
      </nav>

      {/* HERO */}
      <section>
        <h1>Learn Skills That Actually Get You Hired</h1>
        <p>
          คอร์สเรียนออนไลน์คุณภาพสูง เรียนได้ทุกที่ทุกเวลา พร้อมผู้สอนมืออาชีพที่พร้อมช่วยเหลือตลอดการเรียน
        </p>
        <div>
          <button>เริ่มเรียนเลย</button>
          <button>ดูคอร์สทั้งหมด</button>
        </div>

        <div>
          {[
            { num: '50+', label: 'คอร์สทั้งหมด' },
            { num: '42K+', label: 'ผู้เรียนทั้งหมด' },
            { num: '98%', label: 'ความพึงพอใจ' },
            { num: '4.9★', label: 'คะแนนเฉลี่ย' },
          ].map(s => (
            <div key={s.label}>
              <div>{s.num}</div>
              <div>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COURSES */}
      <section>
        <div>
          <h2>คอร์สยอดนิยม</h2>
          <a href="#">ดูทั้งหมด</a>
        </div>

        <div>
          {courses.map(course => (
            <div key={course.id}>
              <div>{course.level}</div>
              <div>{course.title}</div>
              <div>
                {course.tags.map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div>
                <span>{course.duration} · {course.students} students</span>
                <span>{course.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <h2>พร้อมเริ่มต้นแล้วหรือยัง?</h2>
        <p>สมัครสมาชิกวันนี้ เข้าถึงคอร์สทั้งหมด และเริ่มต้นเส้นทางการเรียนรู้ของคุณได้เลย</p>
        <div>
          <button>สมัครสมาชิกฟรี</button>
          <button>เข้าสู่ระบบ</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div>© 2026 LearnFlow. All rights reserved.</div>
        <div>
          {['Privacy', 'Terms', 'Contact'].map(l => (
            <a key={l} href="#">{l}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}