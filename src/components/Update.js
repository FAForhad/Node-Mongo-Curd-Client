import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData()

    const [user, setUser] = useState(storedUser)

    const handleUpdateuser = (event) => {

        event.preventDefault()
        // console.log(user)
        fetch(`http://localhost:5000/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('user updated')
                }
                console.log(data)
            })


    }

    const handleInputChange = (event) => {
        const value = event.target.value
        const field = event.target.name
        const newUser = { ...storedUser }
        newUser[field] = value;
        setUser(newUser)
    }

    return (
        <div>
            <h2>please update :{storedUser.name} </h2>

            <form onSubmit={handleUpdateuser}>
                <input onChange={handleInputChange} defaultValue={storedUser.name} type="text" name="name" placeholder='name' id="" />
                <input onChange={handleInputChange} defaultValue={storedUser.address} type="address" name="address" placeholder='addressb' id="" />
                <input onChange={handleInputChange} defaultValue={storedUser.email} type="email" name="email" placeholder='email' id="" />
                <button type="submit">update user</button>
            </form>

        </div>
    );
};

export default Update;