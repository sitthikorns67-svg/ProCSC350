'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './home.module.css'
export default function Page() {
  const router = useRouter()
  return (
    <div>
      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <ul className={styles.navList}>
            <li><a href="/home">Home</a></li>
            <li><a href="/course">Courses</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Learn Skills That Actually Get You Hired</h1>
          <p>
            คอร์สเรียนออนไลน์คุณภาพสูง เรียนได้ทุกที่ทุกเวลา พร้อมผู้สอนมืออาชีพที่พร้อมช่วยเหลือตลอดการเรียน
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaContainer}>
          <h2>พร้อมเริ่มต้นแล้วหรือยัง?</h2>
          <p>สมัครสมาชิกวันนี้ เข้าถึงคอร์สทั้งหมด และเริ่มต้นเส้นทางการเรียนรู้ของคุณได้เลย</p>
          <div className={styles.buttonGroup}>
            <button 
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={() => {router.push('/register')}}
            >
              สมัครสมาชิกฟรี
            </button>
            <button 
              className={`${styles.button} ${styles.buttonSecondary}`}
              onClick={() => {router.push('/login')}}
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLeft}>© 2026 LearnFlow. All rights reserved.</div>
          <div>
            <ul className={styles.footerLinks}>
              {['Privacy', 'Terms', 'Contact'].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}