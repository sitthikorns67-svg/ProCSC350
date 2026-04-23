'use client'

import React, { useState } from 'react'

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const form = e.target

    const payload = {
      id: Number(form.id.value),
      full_name: form.full_name.value,
      email: form.email.value,
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
      alert("Data saved")

      if (!res.ok) {
        setIsError(true)
        setMessage('Error: ' + (data.message || data.error || 'เกิดข้อผิดพลาด'))
      } else {
        setIsError(false)
        setMessage('สมัครสมาชิกสำเร็จ!')
        form.reset()
      }
    } catch (err) {
      setIsError(true)
      setMessage('Error: ' + err.message)
    }

    setLoading(false)
  }

  return (
    <div>
      <div>
        <h1>Register</h1>
      </div>

      {message && <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>}

      <form >
        <div>
          <label htmlFor="id">ID : </label>
          <input id="id" name="id" type="number" placeholder="เช่น 67xxxxx" required/>
        </div>

        <div>
          <label htmlFor="full_name">Full Name : </label>
          <input id="full_name" name="full_name" type="text" placeholder="ชื่อ-นามสกุล" required />
        </div>

        <div>
          <label htmlFor="email">Email : </label>
          <input id="email" name="email" type="email" placeholder="example@email.com" required />
        </div>

        <div>
          <label htmlFor="password">Password : </label>
          <input id="password" name="password" type="password" placeholder="รหัสผ่าน" required />
        </div>

        <div>
          <label htmlFor="role">Role : </label>
          <select id="role" name="role" defaultValue="student">
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <button type="submit" disabled={loading} onClick={handleSubmit}>
            {loading ? 'กำลังบันทึก...' : 'บันทึก'}
          </button>
          <button type="reset" disabled={loading}>ยกเลิก</button>
        </div>
      </form>
    </div>
  )
}