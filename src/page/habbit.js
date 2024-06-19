import React from 'react'
import Style from '../../src/component/habbits_card/style/style.module.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch,} from 'react-redux';
import { fetchHabbit } from '../redux/reducers/getHabbitOnId.Reducer'
import { useEffect } from 'react'
import { Singlehabits } from '../redux/reducers/getHabbitOnId.Reducer'
// import { useState } from 'react';
import { updateHabitField } from '../redux/reducers/getHabbitOnId.Reducer';
function HabbitCard() {
  // const [updatedValue, setUpdatedValue] = useState([]);
  const {id} = useParams()
  const dispatch = useDispatch();
  const habbits = useSelector(Singlehabits);
  useEffect(() => {
    if (id) {
      dispatch(fetchHabbit(id));
    }
  }, [dispatch, id,habbits]);

 

  
  // const habbit = habbits.find(hb => hb.id === id);
  // console.log(habbit)
  // if (!habbit) {
  //   return <div className={Style.cardBody}>Habbit not found</div>;
  // }
  // const handleUpdateField = async (data) => {
  //   console.log(data)
  //   const newCompletedTime = habbits.completedTime.map(dayStatus => {
  //     if (dayStatus.day === data.day) {
  //       return { ...dayStatus, status: data.status };
  //     }
  //     return dayStatus;
  //   });
  //   console.log(newCompletedTime)
  //   setUpdatedValue(newCompletedTime);
  //   try {
  //     // Replace 'fieldName' with the actual field name you want to update
  //      dispatch(updateHabitField({ id: id, fieldName: habbits.completedTime, updatedValue }));
  //     // Optionally handle success (e.g., show a success message)
  //   } catch (error) {
  //     // Handle error (e.g., show an error message)
  //     console.error('Error updating habit field:', error);
  //   }
  // };
  const handleUpdateField = async (dayStatus) => {
    let updatedStatus;
    console.log(dayStatus.status)
  //  console.log(updatedValue)
    // Determine the next status based on current status
    if (dayStatus.status === true) {
      updatedStatus = false; // Toggle from true to false
    } else if (dayStatus.status === false) {
      updatedStatus = "none"; // Toggle from false to none (null or undefined)
    } else {
      updatedStatus = true; // Toggle from none to true
    }
    console.log(updatedStatus)
  
    try {
      const newCompletedTime = habbits.completedTime.map(item => {
        if (item.day === dayStatus.day) {
          return { ...item, status: updatedStatus };
        }
        return item;
      });
  
      // setUpdatedValue(newCompletedTime); // Update local state with the new completedTime array
  
      // Dispatch action to update Firestore document
      await dispatch(updateHabitField({ id: id, fieldName: 'completedTime', updatedValue: newCompletedTime }));
      // Optionally handle success (e.g., show a success message)
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error updating habit field:', error);
    }
  };
  if (!habbits) {
    return <div>Loading...</div>;
  }
  if (!habbits.completedTime) {
    return <div>No completed time data available</div>;
  }
  return (
    <div className={Style.cardBody}>
      <div className={Style.left}>
        <h4>{habbits?habbits.habbitName:'Habbit Name'}</h4>
        <p>Created Time:{habbits?habbits.createdTime : 'N/A'}</p>
        <p>Completed Time: 1/7 dayes</p>
        <p>Id:{id}</p>
      </div>
      <div className={Style.dayStatus}>
      <ul>
          {habbits.completedTime.map((dayStatus, index) => (
            <li key={index}>
              <div className={dayStatus.status === "none"? Style.noneBox :dayStatus.status?Style.dateBox:Style.falseBox}
                onClick={()=>handleUpdateField({day:dayStatus.day,status:dayStatus.status})} >
                {dayStatus.day}
                </div>
              <div className={Style.round}>{dayStatus.status=== 'none'? 'O':dayStatus.status === false ?'✗': '✓' }</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HabbitCard
