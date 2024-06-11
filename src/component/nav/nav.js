import React from 'react'
import style from '../nav/style.module.css'
export default function Nav() {

  return (
    <div className={style.navBody}>
       <div className={style.text} ><h2>Album</h2></div>
       <div className={style.text}><h4>Create Album</h4></div>
    </div>
  )
}
