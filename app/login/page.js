'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

      if (!res.ok) throw new Error(data.message || 'email หรือ รหัสผ่านไม่ถูกต้อง');

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      //email and password are correct, redirect to dashboard
      alert("Hello");
      //router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>เข้าสู่ระบบ</h1>

      

      <form onSubmit={handleLogin}>
        <div>
          <label>อีเมล</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>รหัสผ่าน</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <a href="#">สมัครสมาชิก</a>
        <a href="#">ลืมรหัสผ่าน?</a>
        <button type="submit" disabled={loading} onClick={handleLogin}>
          {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}