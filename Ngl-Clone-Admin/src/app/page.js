"use client"
import { useState, useEffect } from 'react'
import styles from './page.module.css'
import Popup from './components/Popup' // Assuming Popup is in the same directory

export default function Home() {
  const [confessions, setConfessions] = useState([])
  const [selectedConfession, setSelectedConfession] = useState(null)
  const [popup, setPopup] = useState(false)
  const [popupData, setPopupData] = useState({})

  const togglePopup = (data) => {
    setPopupData(data)
    setPopup(prev => !prev)
  }

  const getData = async () => {
    try {
      const res = await fetch('https://ngl-clone-backend.onrender.com')
      const result = await res.json()
      setConfessions(result.reverse())
    } catch (err) {
      setConfessions([err.message])
    }
  }


  useEffect(() => {
    getData()
  }, [])

  return (
    <main className={styles.main}>
      <h1>Dashboard</h1>
      {confessions.map((item, index) => (
        <div key={index} data={item} className={styles.confessionBox}  onClick={() => togglePopup(item)}>
          <p>{item.confession}</p>
        </div>
      ))}
      {popup && <Popup togglePopup={togglePopup} data={popupData} selectedConfession={selectedConfession} />}
    </main>
  )
}