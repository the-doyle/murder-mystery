import { useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import Room from './Room'
import Summary from './Summary'
import Murder from './Murder'
import MurderSummary from './MurderSummary'
import Transfer from './Transfer'

export default function Dashboard() {
    const user = useUser()
    const [rooms, setRooms] = useState([])
    const [player, setPlayer] = useState({'rooms': [], 'objectives': []})
    const [items, setItems] = useState([])
    const[alert, setAlert] = useState()
    const[alertClass, setAlertClass] = useState("d-none")
    const [itemCode, setItemCode] = useState()
    const [roomCode, setRoomCode] = useState()

    const[weapons, setWeapons] = useState([])
    const[diversions, setDiversions] = useState([])
    const[targets, setTargets] = useState([]) 
    const[murders, setMurders] = useState([])

    const[playerItems, setPlayerItems] = useState([])
    const[transferTargets, setTransferTargets] = useState([])

    
    const refreshCharacter = () => {
        GetCharacter()
    };

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

                setMurders(data.murders)

                setTargets(
                    data.rooms
                        .filter(target => data.player.rooms.includes(target.code) && !target.isDead)
                        .map(target => (
                            <option key={target.email} value={target.email}>{target.name}</option>
                        )))

                setWeapons( 
                    data.items
                        .filter(item => data.player.items.includes(item.code) && item.type == 'weapon' && !data.player.usedItems.includes(item.code))
                        .map(weapon => (
                            <option key={weapon.code} value={weapon.code}>{weapon.description} ({weapon.rating}/10)</option>
                        )))

                setDiversions(
                    data.items
                        .filter(item => data.player.items.includes(item.code) && item.type == 'diversion' && !data.player.usedItems.includes(item.code))
                        .map(diversion => (
                            <option key={diversion.code} value={diversion.code}>{diversion.description} ({diversion.rating}/10)</option>
                        )))

                setPlayerItems(
                    data.items
                        .filter(item => data.player.items.includes(item.code) && item.type != 'cash' && !data.player.usedItems.includes(item.code))
                        .map(item => (
                            <option key={item.code} value={item.code}>{item.description}</option>
                        )))

                setTransferTargets(
                    data.rooms
                        .sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                        .map(target => (
                            <option key={target.email} value={target.email}>{target.name}</option>
                        )))
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
            
                <div className='row mb-4 p-3'>
                    <div className='col-12 mb-3'>
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

                            {weapons.length>0 && diversions.length>0 && targets.length>0 && player
                                ?   <Murder 
                                        player={player} 
                                        weapons={weapons} 
                                        diversions={diversions} 
                                        targets={targets} 
                                        refreshCharacter={refreshCharacter}>
                                    </Murder>
                                : 
                                    <div className='col-6 mt-3'>
                                        <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#murder" disabled>
                                            Murder someone
                                        </button>
                                    </div>
                            }

                            {playerItems.length>0 && rooms.length>0 && player
                                ?   <Transfer 
                                        player={player} 
                                        rooms={transferTargets} 
                                        playerItems={playerItems}
                                        refreshCharacter={refreshCharacter}>
                                    </Transfer>
                                : 
                                    <div className='col-6 mt-3'>
                                        <button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#transfer" disabled>
                                            Transfer item
                                        </button>
                                    </div>
                            }

                        </div>
                    </div>
                </div>

                <div className='row my-3 p-3'>
                    <div className='col-12'>
                        <h4>My Objectives</h4>
                    </div>

                    {player.objectives.length > 0
                        ?   <div className='col-12 bg-light shadow rounded-3 p-3 my-3'>
                                <ul>
                                    <li>{player.objectives[0]} <span className="badge rounded-pill bg-dark mx-1">main</span></li>
                                    <li>{player.objectives[1]} <span className="badge rounded-pill bg-info mx-1">secondary</span> </li>
                                </ul>
                            </div>
                        :   <p>Loading...</p>
                    }

                    
                </div>

                <div className='row my-3 p-3'>
                    <div className='col-12'>
                        <h4>My Room</h4>
                    </div>

                    <Room items={items} player={player} disableUsed={true}></Room>
                </div>

                <div className='row my-3 p-3'>
                    <div className='col-12'>
                        <h4>Unlocked Rooms</h4>
                    </div>

                    {player.rooms.length > 0
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

                {murders.length > 0 
                    ?   <MurderSummary murders={murders}></MurderSummary>
                    :   <div className='text-center my-3'>
                            <button type="button" className="btn btn-outline-danger text-center" data-bs-toggle="modal" data-bs-target="#murderSummary" disabled>
                                No murders yet!
                            </button>
                        </div>
                }

                <Summary player={player} items={items} rooms={rooms}></Summary>

            </div>
        </div>
    )
}