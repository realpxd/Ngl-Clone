"use client"

import Image from 'next/image'
import styles from './page.module.css'
import { useRef, useState , useEffect } from 'react'

export default function Home() {
  const [message, setMessage] = useState('');
  const [confession, setConfession] = useState('');
  const prevConfessionRef = useRef();

  // Update the ref with the current confession whenever it changes
  useEffect(() => {
    prevConfessionRef.current = confession;
  }, [confession]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.target)
      const confessionBox = formData.get('confessionBox'); // Retrieve the value of confessionBox


      // Compare current confessionBox with the previous confession
      if (confessionBox === prevConfessionRef.current) {
        showToaster('You have already sent this confession')
        return
      }

      // Update the state with the new confession
      setConfession(confessionBox)

      const response = await fetch('https://ngl-clone-backend.vercel.app/send', {
        method: 'POST',
        body: JSON.stringify({
          confession: confessionBox, navig: navigator.appVersion
        }), // Send confession as an object with key 'confession'
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        // Check if response is not okay (i.e., status code is not in 200 range)
        const errorData = await response.text(); // Get error response as text
        throw new Error(errorData); // Throw an error with the error message/content
        // showToaster(errorData)
      }

      const data = await response.json()
      // setMessage(data.message);
      showToaster(data)

    } catch (err) {
      // setMessage(err.message);
      showToaster(err.message)
    }
  }


  const showToaster = (message) => {
    //create own dom element
    const toaster = document.createElement('div')
    toaster.classList.add(styles.toaster)
    // toaster.style.bottom += '10rem'
    toaster.innerText = message
    //append to body
    document.body.appendChild(toaster)
    //remove after 3 sec
    setTimeout(() => {
      toaster.remove()
    }, 5000)

  }
  return (
    <main className={styles.main}>
      <section className={styles.sectionA}>
        <div className={styles.block}>
          <h1 className={styles.title}>
            Send your Confessions !
          </h1>
          <p className={styles.desc}>Simple way to remain <span> <a href="#"> Anonymous </a> </span></p>
        </div>
        <form className={styles.cForm} onSubmit={handleSubmit} method='POST'>
          <label htmlFor="confessionBox"> </label>
          <textarea type="text" name="confessionBox" placeholder='Your confession goes here... :)' id="confessionBox" accessKey='confessionBox' ></textarea>
          <button type="submit">Send Anonymously</button>
        </form>
      </section>
      {message}
    </main>
  )
}
