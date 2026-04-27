'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import styles from './register.module.css'

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()           
    setLoading(true)
    setMessage('')

    const form = e.target

    
    const idValue = Number(form.id.value)
    if (!idValue || idValue <= 0) {
      setIsError(true)
      setMessage('Error: กรุณากรอก ID ให้ถูกต้อง')
      setLoading(false)
      return
    }

    const payload = {
      id: idValue,
      full_name: form.full_name.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value,
      role: form.role.value,
    }

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

     
      if (!res.ok) {
        setIsError(true)
        setMessage('Error: ' + (data.message || data.error || 'เกิดข้อผิดพลาด'))
      } else {
        setIsError(false)
        setMessage('สมัครสมาชิกสำเร็จ!')
        alert('Data saved')
        router.push('/login')
        form.reset()
      }
    } catch (err) {
      setIsError(true)
      setMessage('Error: ' + err.message)
    }

    setLoading(false)
  }

 return (
  <div className={styles.container}>
    {/* div ครอบทั้งหน้า — จัด card ให้อยู่กลางจอ */}

    <div className={styles.card}>
      {/* กล่องสีขาวครอบ form */}

      <h1 className={styles.title}>Register</h1>
      {/* หัวข้อหน้า */}

      {/* แสดง message ตาม state — เขียว=สำเร็จ แดง=error */}
      {message && (
        <p className={isError ? styles.error : styles.success}>{message}</p>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* form — เมื่อ submit จะเรียก handleSubmit */}

        <div className={styles.fieldGroup}>
          {/* ===== ช่อง ID ===== */}
          <label className={styles.label} htmlFor="id">ID</label>
          <input
            className={styles.input}
            id="id"
            name="id"
            type="number"
            placeholder="เช่น 67xxxxx"
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          {/* ===== ช่องชื่อ-นามสกุล ===== */}
          <label className={styles.label} htmlFor="full_name">Full Name</label>
          <input
            className={styles.input}
            id="full_name"
            name="full_name"
            type="text"
            placeholder="ชื่อ-นามสกุล"
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          {/* ===== ช่องอีเมล ===== */}
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            className={styles.input}
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          {/* ===== ช่องรหัสผ่าน ===== */}
          <label className={styles.label} htmlFor="password">Password</label>
          <input
            className={styles.input}
            id="password"
            name="password"
            type="password"
            placeholder="รหัสผ่าน"
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          {/* ===== dropdown เลือก Role ===== */}
          <label className={styles.label} htmlFor="role">Role</label>
          <select
            className={styles.select}
            id="role"
            name="role"
            defaultValue="student"
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>

        <div className={styles.buttonGroup}>
          {/* ===== แถวปุ่ม ===== */}

          {/* ปุ่ม submit — disabled ระหว่าง loading ป้องกันกด 2 ครั้ง */}
          <button
            className={styles.buttonSubmit}
            type="submit"
            disabled={loading}
          >
            {loading ? 'กำลังบันทึก...' : 'บันทึก'}
          </button>

          {/* ปุ่ม reset — ล้างข้อมูลใน form ทั้งหมด */}
          <button
            className={styles.buttonReset}
            type="reset"
            disabled={loading}
          >
            ยกเลิก
          </button>
        </div>

      </form>
    </div>
  </div>
)
}