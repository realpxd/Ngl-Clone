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

  const handleDelete = async (data) => {
    console.log(data)
    const pass = prompt('Enter password')
    if (pass !== 'baka') return console.log('Wrong password')

    const res = await fetch('https://ngl-clone-backend.onrender.com/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: data._id })
    })
    const result = await res.json()
    // setConfessions(result.reverse())
    console.log(result)
    await getData()
  }

  return (
    <main className={styles.main}>
      <h1>Dashboard</h1>
      {confessions.map((item, index) => (
        <div key={index} >
          <div data={item} className={styles.confessionBox} onClick={() => togglePopup(item)}>
            <p>{item.confession}</p>
          </div>
          <div className={`${styles.confessionBox} ${styles.cB2}`} >
            <span className={styles.deleteBtn} onClick={() => handleDelete(item)}>&#128465;</span>
          </div>
        </div>
      ))}
      {popup && <Popup togglePopup={togglePopup} data={popupData} selectedConfession={selectedConfession} />}
    </main>
  )
}