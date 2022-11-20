import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
    const user = useUser()
    const [characters, setCharacters] = useState([])
    const [player, setPlayer] = useState("")
    const [items, setItems] = useState([])
    const [myItems, setMyItems] = useState([])
    const[alert, setAlert] = useState()
    const[alertClass, setAlertClass] = useState("d-none")
    const [itemCode, setItemCode] = useState()

    useEffect(() => {
        GetCharacter() 
    }, [])

    function hideAlert() {
        console.log("hiding")
        setAlertClass("d-none")
    }

    const itemChangeHandler = e => {
        setItemCode(e.target.value)
        console.log(e.target.value)
    }

    const itemSubmitHandler = e => {
        e.preventDefault();
        
        fetch('/api/items/' + itemCode + '/' + user.email)
            .then((res) => res.json())
            .then((data) => {
                setAlertClass("")
                setAlert(data.message)
                GetCharacter() 
            }
        )
    }

    async function GetCharacter() {
        await fetch('/api/characters/' + user.email)
            .then((res) => res.json())
            .then((data) => {
                setPlayer(data.player)
                setMyItems(data.items)
            })
    }

    return (
        <div className='vh-100'>
            <div className='container-fluid'>
                <div className='row my-2'>
                    <div className='col'>
                        <h3 className='text-dark'>{player.name}</h3>
                    </div>
                </div>

                
                <div className={alertClass}>
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {alert}
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => hideAlert()}></button>    
                    </div>  
                </div>
            
                <div className='row my-2 bg-light shadow rounded-3 p-3'>
                    <div className='col-12'>
                        <p className='fs-6 text-center fw-bold text-dark'>Quick Actions</p>
                    </div>
                    <div className='col-6'>
                        <form onSubmit={itemSubmitHandler}>
                            <div className="mb-3">
                                <input onChange={itemChangeHandler} type="text" className="form-control" id="itemCode" placeholder="1234"></input>
                            </div>
                            <button type="submit" className="btn btn-outline-dark">Add Item</button>
                        </form>
                    </div>
                </div>

                <div className='row my-2'>
                    <div className='col bg-light shadow rounded-3 p-3'>
                        <p className='fs-6 text-center fw-bold text-dark'>My Items</p>
                        
                        {myItems.length > 0
                            ? 
                                <ul>
                                    {myItems.map(item => (
                                        <li key={item.id}>
                                            {item.description} 
                                            <span className="badge bg-primary mx-1">{item.type}</span>
                                            <span className="badge bg-dark mx-1">Rating: {item.rating} / 10</span>
                                        </li>
                                    ))} 
                                </ul>
                            :
                                <p className='text-muted text-center my-3'>No items yet</p>

                        }

                    </div>
                </div>

            </div>
        </div>
    )
}