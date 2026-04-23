'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

const navLinks = ['Home', 'Enroll', 'About Me', 'Course', 'Login']

export default function Page() {
  const params = useParams()
  const lessonId = params?.lesson_id

  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [answers, setAnswers] = useState({})       // { [quizId]: selectedChoice }
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [activeLink, setActiveLink] = useState('Course')

  useEffect(() => {
    if (!lessonId) return
    async function fetchQuizzes() {
      try {
        const res = await fetch(
          `https://online-cours-api-puap.vercel.app/api/quizzes/${lessonId}`
        )
        if (!res.ok) throw new Error('โหลดข้อมูลไม่สำเร็จ')
        const data = await res.json()
        setQuizzes(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchQuizzes()
  }, [lessonId])

  function handleSelect(quizId, choice) {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [quizId]: choice }))
  }

  function handleSubmit() {
    let correct = 0
    quizzes.forEach(q => {
      if (answers[q.id] === q.correct_answer) correct++
    })
    setScore(correct)
    setSubmitted(true)
  }

  function handleReset() {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
  }

  return (
    <div>
      {/* NAV */}
      <nav>
        <a href="#">LearnFlow</a>
        <ul>
          {navLinks.map(link => (
            <li key={link}>
              <button onClick={() => setActiveLink(link)}>
                {link}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* HEADER */}
      <div>
        <h1>แบบทดสอบ</h1>
      </div>

      {/* CONTENT */}
      {loading && <p>กำลังโหลด...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && quizzes.length === 0 && (
        <p>ไม่มีแบบทดสอบในบทเรียนนี้</p>
      )}

      {/* QUIZ LIST */}
      {!loading && !error && quizzes.length > 0 && (
        <div>
          {quizzes.map((quiz, index) => (
            <div key={quiz.id}>
              <p>{index + 1}. {quiz.question}</p>
              <div>
                {quiz.choices?.map(choice => (
                  <div key={choice}>
                    <label>
                      <input
                        type="radio"
                        name={`quiz_${quiz.id}`}
                        value={choice}
                        checked={answers[quiz.id] === choice}
                        onChange={() => handleSelect(quiz.id, choice)}
                        disabled={submitted}
                      />
                      {choice}
                      {submitted && choice === quiz.correct_answer && ' ✅'}
                      {submitted && answers[quiz.id] === choice && choice !== quiz.correct_answer && ' ❌'}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* RESULT */}
          {submitted && (
            <div>
              <p>คะแนน: {score} / {quizzes.length}</p>
              <button onClick={handleReset}>ทำใหม่</button>
            </div>
          )}

          {/* SUBMIT */}
          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== quizzes.length}
            >
              ส่งคำตอบ
            </button>
          )}
        </div>
      )}
    </div>
  )
}

