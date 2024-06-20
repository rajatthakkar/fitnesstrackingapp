import React from 'react'
import Style from '../habbits_card/style/style.module.css'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebaseinit';
import { deleteHabit } from '../../redux/reducers/getHabbitReducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function Card({hb,index}) {
  //  dispatch Function 
  const dispatch = useDispatch()
   console.log(hb.id)
  //  handle delete Function
  const handleDelete=async (id)=>{
    try {
      const docRef=doc(db, "habbits", id) 
      await  deleteDoc(docRef);
      dispatch(deleteHabit(id));
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
   console.log(id)

  }
  
  return (
    <>
  
   <div  className={Style.cardBody}>
    
    <div className={Style.left}>
      <h4>{hb.habbitName}</h4>
      <p>Created Time:{hb.createdTime}</p>
      <p>Completed Time: 1/7 dayes</p>
    </div>
    <div className={Style.btnBox}>
      <button className={Style.btn} onClick={(e)=>handleDelete(hb.id)}>Delete</button>
      <Link to={`${hb.id}`}> <button>Show Details</button> </Link> 
    </div>
  </div>
   
   
    
    </>
  )
}

export default Card
