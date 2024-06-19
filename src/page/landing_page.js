import React,{ useEffect, useState } from 'react'
import style from '../page/style/style.module.css'
import Card from '../component/habbits_card/card.js';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch,useSelector } from 'react-redux'
import { addHabit, habbitNotificatio } from '../redux/reducers/habbitReducers.js';
import { ToastContainer, toast } from 'react-toastify';
import { getInitialState } from '../redux/reducers/getHabbitReducer.js';
import { habits } from '../redux/reducers/getHabbitReducer.js';
import { Outlet } from 'react-router-dom';
function LandingPage() {
  const habbits = useSelector(habits)
  console.log(habbits)
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const[habbitName,setHabbit]=useState('')
  const messsage = useSelector(habbitNotificatio)
  const notify = () => toast(messsage);

   useEffect(()=>{
    dispatch(getInitialState())
   },[dispatch])
     

   
   
   const handleSubmit=()=>{
    console.log(habbitName)
      dispatch(addHabit(habbitName))
      setHabbit('')
      notify()
      dispatch(  getInitialState())
      // console.log(habbitName)
   }
  return (
    <div className={style.boxBody}>
          <div className={style.formBody}>
               <div  className={`${style.inputBody} ${isFocused ? style.inputBodyFocused : ''}`} >
                  <input type='text' value={habbitName}  className={style.inputfield}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => setHabbit(e.target.value)} 
                  />
               </div>
               <button onClick={handleSubmit}>Add Habbit</button>
          </div>
            <div className={style.cardListBox}>
              {
                habbits.map((hb,index)=>(
                   
                  <Card hb={hb}
                    key={hb.id}/>
                ))
              }
              
             
            </div>
            <ToastContainer/>
            <Outlet/>
    </div>
  )
}

export default LandingPage
