import React, { useEffect, useState } from 'react';
import './AddUser.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AllUser from './AllUser';
const AddUser = () => {
    const [addUser, setAddUser] = useState(false);
    const [user, setUser] = useState([]);
    const [newUserInfo, setNewUserInfo] = useState({
        name: '',
        email: '',
        phoneNo: '',
        hobbies: '',
        id: localStorage.getItem('id')

    })

    // Set new user information in state
    const hendleBlur = (event) => {
        const userInfo = { ...newUserInfo }
        userInfo[event.target.name] = event.target.value;
        setNewUserInfo(userInfo)
        if (newUserInfo.name || newUserInfo.email || newUserInfo.phoneNo || newUserInfo.hobbies) {
            setAddUser(true)
        }

    }

    // Add new user in database
    const hendleAddUser = (event) => {
        fetch('https://obscure-depths-58184.herokuapp.com/addUser', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newUserInfo)

        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('New User Add Successfully')
                    setAddUser(false)
                }
            })

        event.preventDefault()
    }

    // Load all user in database
    useEffect(() => {
        fetch('https://obscure-depths-58184.herokuapp.com/allUser',)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.log(err))
    }, []);

    // table item sort 
    const [trySort, setTrySort] = useState(true)
    const [sortUser, setSortUser] = useState([]);
    const hendleAccending = (e) => {
        const convertSort = user.sort((a, b) => a > b ? 1 : -1)
        setSortUser(convertSort)
        setTrySort(false)
    }
    const hendleDisanding = () =>{
        setTrySort(true)
        const convertDisSort = user.sort((a, b) => a < b? 1: -1)
        setSortUser(convertDisSort)
        // setTrySort(false)
    }

    return (
        <div className='addUser_container container'>
            <Popup trigger={<button className='save_button btn btn-danger'> Add User</button>} position="center left">
                <div className='input_container'>
                    <form action="">
                        <input className='form-control' onBlur={hendleBlur} name='name' type="text" required placeholder='Name*' />
                        <input className='form-control' onBlur={hendleBlur} name='email' type="email" required placeholder='Email*' />
                        <input className='form-control' onBlur={hendleBlur} name='phoneNo' type="phone" required placeholder='PhoneNo*' />
                        <input className='form-control' onBlur={hendleBlur} required name='hobbies' type="text" placeholder="Hobbies*" />

                        <button disabled={!addUser} className='btn btn-danger save_button' type='submit' onClick={hendleAddUser} >Save</button>

                    </form>
                </div>
            </Popup>


            <table class="table table_container css-serial">
                <thead className='thead_container'>
                    <tr>
                        <th scope="col">SL no</th>
                        <th scope="col">Select</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone No</th>
                        <th scope="col">Hobbies</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                        { trySort === true?
                        user.map(singleUser => <AllUser singleUser={singleUser}></AllUser>):
                        sortUser.map(singleUser => <AllUser singleUser={singleUser}></AllUser>)
                        }
            </table>
            <button className='btn btn-success' onClick={hendleAccending}>Accending</button>
            <button className='btn btn-info m-2' onClick={hendleDisanding}>Disanding</button>
        </div>
    );
};

export default AddUser;