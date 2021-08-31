import React, { useEffect, useState } from 'react';
import './AllUser.css';
import emailjs from 'emailjs-com';
const AllUser = (props) => {
    const { name, email, phoneNo, hobbies, _id } = props.singleUser;
    const [updateNewInfo, setUpdateNewInfo] = useState({
        name: '',
        email: '',
        phoneNo: '',
        hobbies: ''
    })

    // Delete User information in database
    const hendleDeleteItem = () => {
        fetch('https://obscure-depths-58184.herokuapp.com/deleteUser', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ _id })
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }


    const [update, setUpdate] = useState(false)
    const updateItem = () => {
        setUpdate(true)
    }
    // Set user update information
    const hendleNewInfo = (e) => {
        const newInfo = { ...updateNewInfo }
        newInfo[e.target.name] = e.target.value;
        setUpdateNewInfo(newInfo)
    }

    // Update User information
    const hendleUpdate = () => {
        fetch('https://obscure-depths-58184.herokuapp.com/updateOne', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ _id, updateNewInfo })
        })
            .then(res => res.json())
            .then(data => {
                if(data){
                    alert('Your information updated')
                    setUpdate(false)
                }
            })

    }
    // const { name, email, phoneNo, hobbies, _id } = props.singleUser;
    const emailInformation = {
        name: name,
        email: email,
        phoneNo: phoneNo,
        hobbies: hobbies
    }
    // console.log(emailInformation);
    const [values, setValues] = useState({});
    const [emailSend, setEmailSend] = useState(false)
    // console.log(values);

    // Hendle Select row
    const hendleChecked = (e) =>{
      if(e.target.checked){
        const copy = {...emailInformation};
            setValues(copy)
            setEmailSend(true)
      }
      else if(!e.target.checked){
          setValues(null)
          setEmailSend(false)
      }
        
    }
    // hendle send email
    const hendleSendEmail = () =>{
        emailjs.send('service_i64ec3k', 'template_pevf2vo', values, 'user_Nq4o5shP7SaE8FDgGmAnE')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        })
    }
    return (

        <tbody>
            <tr>
                <td></td>
                <input onClick={hendleChecked} id='chack' type="checkbox" />
                {
                    update === false ?
                        <td>{name}</td>
                        : <td> <input type="text" name='name' onBlur={hendleNewInfo} placeholder='name' /> </td>}
                {
                    update === false ?
                        <td>{email}</td>
                        : <td> <input type="text" name='email' onBlur={hendleNewInfo} placeholder='email' /> </td>}
                {
                    update === false ?
                        <td>{phoneNo}</td>
                        : <td> <input type="text" name='phoneNo' onBlur={hendleNewInfo} placeholder='phoneNo' /> </td>}
                {
                    update === false ?
                        <td>{hobbies}</td>
                        : <td> <input type="text" name='hobbies' onBlur={hendleNewInfo} placeholder='hobbies' /> </td>}
                <div>
                    {
                        update === false ?
                            <button className='btn btn-success m-1' onClick={updateItem}>Update</button>
                            : <div><button className='btn btn-success m-1' onClick={() => setUpdate(false)}>Back</button>
                                <button className='btn btn-info m-1' onClick={hendleUpdate} >Submit</button>
                            </div> }
                    <button className='btn btn-danger' onClick={hendleDeleteItem} >delete</button>
                    {
                        emailSend === true?
                        <button className='btn btn-info m-1' onClick={hendleSendEmail} >Send Email</button>
                    :null}
                    
                </div>
            </tr>
        </tbody>

    );
};

export default AllUser;