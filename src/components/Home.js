import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {

    const users = useLoaderData()
    console.log(users)

    const [displayUser, setDiplayUsers] = useState(users)

    const handleDelete = (user) => {
        const agree = window.confirm(`are you  sure you want to delete : ${user.name}`)
        if (agree) {

            // console.log('deleting user', user._id)
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted one')
                        const remainingUsers = displayUser.filter(usr => usr._id !== user._id)
                        setDiplayUsers(remainingUsers)
                    }
                })

        }

    }

    return (
        <div>
            <h1>this is home: {displayUser.length}</h1>
            <div>
                {
                    displayUser.map(user => <p key={user._id}>{user.name} {user.email} {user.address}
                        <Link to={`/update/${user._id}`}>
                            <button>
                                update
                            </button></Link>
                        <button onClick={() => handleDelete(user)}>X</button></p>)
                }
            </div>
        </div>
    );
};

export default Home;