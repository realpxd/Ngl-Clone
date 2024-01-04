import React from 'react'
import styles from '../page.module.css'
const Popup = props => {
  const toggleVisibility = (event) => {
    if (event.target.parentElement.style.height == '0.5rem') {
      event.target.parentElement.style.height = 'auto'
    }
    else {
      event.target.parentElement.style.height = '0.5rem'
    }
  }
  return (
    <div className={styles.popupBoxWrapper}>
        <button onClick={props.togglePopup}>&times;</button>
        <div onClick={toggleVisibility} style={{height: '0.5rem'}} className={styles.hints}>
          <p>Hints</p>
          <p>{props.data.navig}</p>
        </div>
      <div className={styles.popupBox}>
        <h1></h1>
        <div>
          <p>{props.data.confession}</p>
        </div>
        {/* {alert(props)} */}

      </div>
    </div>
  )
}


export default Popup