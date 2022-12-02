import { useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import Room from './Room'
import PlayerRow from './PlayerRow'
import ItemRow from './ItemRow'
import Summary from './Summary'

export default function Dashboard() {
    const user = useUser()
    const [rooms, setRooms] = useState([])
    const [player, setPlayer] = useState("Ben Doyle")
    const [items, setItems] = useState([])
    const[alert, setAlert] = useState()
    const[alertClass, setAlertClass] = useState("d-none")
    const [itemCode, setItemCode] = useState()
    const [roomCode, setRoomCode] = useState()

    useEffect(() => {
        GetCharacter() 
    }, [])

    const itemChangeHandler = e => {
        setItemCode(e.target.value)
    }

    const itemSubmitHandler = e => {
        e.preventDefault();
        
        fetch('/api/items/' + itemCode + '/' + user.email)
            .then((res) => res.json())
            .then((data) => {
                setAlertClass("")
                setAlert(data.message)
                if (data.message === "Success! Item added.") {
                    GetCharacter() 
                }
            }
        )
    }

    const roomChangeHandler = e => {
        setRoomCode(e.target.value)
    }

    const roomSubmitHandler = e => {
        e.preventDefault();
        
        fetch('/api/rooms/' + roomCode + '/' + user.email)
            .then((res) => res.json())
            .then((data) => {
                setAlertClass("")
                setAlert(data.message)
                if (data.message === "Success! Room added.") {
                    GetCharacter() 
                }
            }
        )
    }

    async function GetCharacter() {
        await fetch('/api/characters/' + user.email)
            .then((res) => res.json())
            .then((data) => {
                setPlayer(data.player)
                setItems(data.items)
                setRooms(data.rooms)
            })
    }

    return !items ? null : (
        <div>
            <div className='container-fluid'>
                <div className='row my-2 p-3'>
                    <div className='col'>
                        <h2 className='text-dark text-center'>{player.name}</h2>
                    </div>
                </div>

                
                <div className={alertClass}>
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {alert}
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setAlertClass("d-none")}></button>    
                    </div>  
                </div>
            
                <div className='row mb-5 p-3'>
                    <div className='col-12 mb-2'>
                        <h4>Quick Actions</h4>
                    </div>

                    <div className='container-fluid'>
                        <div className='row bg-light shadow rounded-3 p-3'>
                            <div className='col-6'>
                                <form onSubmit={itemSubmitHandler}>
                                    <div className="mb-3">
                                        <input onChange={itemChangeHandler} type="text" className="form-control" id="itemCode" placeholder="e.g. 1234"></input>
                                    </div>
                                    <button type="submit" className="btn btn-outline-dark">Add Item</button>
                                </form>
                            </div>

                            <div className='col-6'>
                                <form onSubmit={roomSubmitHandler}>
                                    <div className="mb-3">
                                        <input onChange={roomChangeHandler} type="text" className="form-control" id="roomCode" placeholder="e.g. 5678"></input>
                                    </div>
                                    <button type="submit" className="btn btn-outline-dark">Add Room</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='row my-3 p-3'>
                    <div className='col-12 mb-2'>
                        <h4>My Stuff</h4>
                    </div>

                    <Room items={items} player={player}></Room>
                </div>

                <div className='row my-3 p-3'>
                    <div className='col-12 mb-2'>
                        <h4>Unlocked Rooms</h4>
                    </div>

                    {player.rooms
                        ? 
                            rooms
                                .filter(room => player.rooms.includes(room.code))
                                .map(room => (
                                    <Room key={room.id} items={items} player={room}></Room>
                                ))
                        :
                            <p className='text-muted text-center my-3'>No unlocked rooms yet. Find a room code to add one!</p>
                    }
                </div>

                <Summary player={player} items={items} rooms={rooms}></Summary>

            </div>
        </div>
    )
}