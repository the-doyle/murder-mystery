import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {

    const supabase = useSupabaseClient()
    const user = useUser()
    const [characters, setCharacters] = useState([])
    const [player, setPlayer] = useState({'name': ''})
    const [items, setItems] = useState([])
    const [myItems, setMyItems] = useState([])


    useEffect(() => {
        async function loadCharacters() {
            try {
                const { data } = await supabase
                    .from('Character')
                    .select('*')
    
                if (data) {
                    setCharacters(data);
                    for (const character in data) {
                        if (data[character].email === user.email) {
                            setPlayer(data[character]);
                            break
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        async function loadItems() {
            try {
                const { data } = await supabase
                    .from('Item')
                    .select('*')
    
                if (data) {
                    setItems(data);
                    let playerItems = [] 
                    for (const item in data) {
                        if (player.items.includes(data[item].code)) {
                            playerItems.push(data[item])
                        }
                        setMyItems(playerItems)
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
            // Only run query once user is logged in.
            if (user) {
                loadCharacters()
                loadItems() 
            }
        }, [user])

    return (
        <div className='vh-100'>
            <div className='container-fluid'>
                <div className='row my-2'>
                    <div className='col'>
                        <h3 className='text-dark'>{player.name}</h3>
                    </div>
                </div>

                <div className='row my-2'>
                    <div className='col bg-light shadow rounded-3 p-3 text-center'>
                        <p className='fs-6 text-center'>Quick Actions</p>
                        <div className='d-flex justify-content-evenly'>
                            <Link className='btn btn-sm btn-outline-dark p-2' href='/api/addItem'>Add item</Link>
                            <Link className='btn btn-sm btn-outline-dark p-2' href='/api/addRoom'>Add room</Link>
                            <Link className='btn btn-sm btn-danger p-2' href='/api/murder'>Murder someone</Link>
                        </div>
                    </div>
                </div>

                <div className='row my-2'>
                    <div className='col bg-light shadow rounded-3 p-3'>
                        <p className='fs-6 text-center'>My Items</p>
                        <ul>
                            {myItems.map(item => (
                                <li key={item}>
                                    {item.description} 
                                    <span class="badge bg-primary mx-1">{item.type}</span>
                                    <span class="badge bg-dark mx-1">Rating: {item.rating} / 10</span>
                                </li>
                            ))} 
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}