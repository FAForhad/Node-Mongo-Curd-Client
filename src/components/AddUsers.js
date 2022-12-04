import React, { useState } from 'react';

const AddUsers = () => {
    const [user, setUser] = useState({})

    const handleAdduser = (event) => {

        event.preventDefault()
        console.log(user)

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('user added successfully')
                    event.target.reset()
                }
            })
    }

    const handleInputBlur = (event) => {
        const value = event.target.value
        const field = event.target.name
        const newUser = { ...user }
        newUser[field] = value;
        setUser(newUser)
    }

    return (
        <div>
            <h2>please add a user</h2>
            <form onSubmit={handleAdduser}>
                <input onChange={handleInputBlur} type="text" name="name" placeholder='name' id="" />
                <input onChange={handleInputBlur} type="address" name="address" placeholder='addressb' id="" />
                <input onChange={handleInputBlur} type="email" name="email" placeholder='email' id="" />
                <button type="submit">add user</button>
            </form>
        </div>
    );
};

export default AddUsers;