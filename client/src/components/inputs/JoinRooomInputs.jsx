import React from 'react'

const Input = ({ placeholder, value, changeHandler }) => {
return (
    <input value={value} onChange={changeHandler} placeholder={placeholder} className='join_room_input' />
)
}
const JoinRooomInputs = (props) => {
    // const { isRoomHost } = props;

    const { roomIdValue, setRoomIdValue, nameValue, setNameValue, isRoomHost } = props;
    const handleRoomIdValueChange = (event) => {
        setRoomIdValue(event.target.value)
    }
console.log("roomValue" + roomIdValue)
    const handleNameValueChnage = (event) => {
        setNameValue(event.target.value)
    }
  return (
    <div className='join_room_inputs_container'>
        {!isRoomHost && (
            <Input 
            placeholder={"Enter meeting ID"}
            value={roomIdValue}
            changeHandler={handleRoomIdValueChange}
            />
        )}
      
      <Input 
      placeholder={"Enter Your name"}
      value={nameValue}
      changeHandler={handleNameValueChnage}

      />
    </div>
  )
}

// roomIdvalue={roomIdvalue} setRoomIdValue={setRoomIdValue}
// nameValue={nameValue} setNameValue={setNameValue} isRoomHost={isRoomHost}

export default JoinRooomInputs
