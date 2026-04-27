'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data)

      if (!res.ok) throw new Error(data.message || 'email หรือ รหัสผ่านไม่ถูกต้อง');

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      if (data.user.role) {
        const redirectPath = {
          student: '/course',
          instructor: '/instructor',
        }[data.user.role];

        if (redirectPath) {
          router.push(redirectPath);
        } else {
          throw new Error('Invalid user role');
        }
      } else {
        throw new Error('User role not provided');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

 return (
  <div className={styles.container}>{/*ทั้งหน้า — จัดให้อยู่กลางจอ */}
    {/* กล่องสีขาว (card) ที่ครอบ form ทั้งหมด */}
    <div className={styles.card}>

      {/* หัวข้อหน้า */}
      <h1 className={styles.title}>เข้าสู่ระบบ</h1>

      {/* form — เมื่อ submit จะเรียก handleLogin */}
      <form className={styles.form} onSubmit={handleLogin}>

        {/* ===== ช่องอีเมล ===== */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>อีเมล</label>
          <input
            className={styles.input}
            type="email"                         
            value={email}                         
            onChange={(e) => setEmail(e.target.value)} 
            required                              
          />
        </div>

        {/* ===== ช่องรหัสผ่าน ===== */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>รหัสผ่าน</label>
          <input
            className={styles.input}
            type="password"                            
            value={password}                           
            onChange={(e) => setPassword(e.target.value)} 
            required                                  
            />
        </div>

        {/* ===== แถวลิงก์ ===== */}
        <div className={styles.links}>
          {/* ลิงก์ไปหน้าสมัครสมาชิก — สีน้ำเงิน (primary) */}
          <a href="/register" className={styles.linkPrimary}>สมัครสมาชิก</a>

          {/* ลิงก์ลืมรหัสผ่าน — สีเทา (secondary) ความสำคัญรองลงมา */}
          <a href="#" className={styles.linkSecondary}>ลืมรหัสผ่าน?</a>
        </div>

        {/* ===== ปุ่ม submit ===== */}
        <button
          className={styles.button}
          type="submit"
          disabled={loading}  >{/* ปิดปุ่มระหว่างรอ API ป้องกันกด 2 ครั้ง */}
        
          {/* สลับข้อความตาม state loading */}
          {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>

        {/* ===== แสดง error ===== */}
        {/* render เฉพาะเมื่อมี error message (conditional rendering) */}
        {error && <p className={styles.error}>{error}</p>}

      </form>
    </div>
  </div>
);
}