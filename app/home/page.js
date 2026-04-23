'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  return (
    <div>
      {/* NAV */}
      <nav>
        <div>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/course">Courses</a></li>
            <li><a href="/enroll">Enroll</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section>
        <h1>Learn Skills That Actually Get You Hired</h1>
        <p>
          คอร์สเรียนออนไลน์คุณภาพสูง เรียนได้ทุกที่ทุกเวลา พร้อมผู้สอนมืออาชีพที่พร้อมช่วยเหลือตลอดการเรียน
        </p>
      </section>

      {/* CTA */}
      <section>
        <h2>พร้อมเริ่มต้นแล้วหรือยัง?</h2>
        <p>สมัครสมาชิกวันนี้ เข้าถึงคอร์สทั้งหมด และเริ่มต้นเส้นทางการเรียนรู้ของคุณได้เลย</p>
        <div>
          <button onClick={() => {router.push('/register')}}>สมัครสมาชิกฟรี</button>
          <button onClick={() => {router.push('/login')}}>เข้าสู่ระบบ</button>
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