import React from 'react'
import styles from './page.module.css'

const members = [
  { id: '6705263', name: 'วรากร จันทร์สูงเนิน', avatar: 'วก', role: 'Backend' },
  { id: '6703893', name: 'สิทธิกร สืบเกลี้ยง',  avatar: 'สก', role: 'Frontend' },
  { id: '6703559', name: 'ปฏิภาณ สุขกล่ำ',      avatar: 'ปภ', role: 'CSS & HTML' },
]

export default function Page() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.heading}>สมาชิกกลุ่ม</h1>
      <ul className={styles.list}>
        {members.map((m) => (
          <li key={m.id} className={styles.item}>
            <div className={styles.avatar}>{m.avatar}</div>
            <div className={styles.info}>
              <p className={styles.name}>{m.name}</p>
              <p className={styles.id}>{m.id}</p>
            </div>
            <span className={styles.role}>{m.role}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}