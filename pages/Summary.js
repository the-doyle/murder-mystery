import { useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import PlayerRow from './PlayerRow'
import ItemRow from './ItemRow'

export default function Summary(props) {

    const[buttonContent, setButtonContent] = useState("All Players & Items")
    const[buttonClass, setButtonClass] = useState("btn btn-outline-dark")

    function handleClick() {
        if (buttonContent === "All Players & Items") {
            setButtonContent("Hide All Players & Items")
        } else {
            setButtonContent("All Players & Items")
        }

        if (buttonClass === "btn btn-outline-dark") {
            setButtonClass("btn btn-dark")
        } else {
            setButtonClass("btn btn-outline-dark")
        }
    }

    return !props.items ? null : (

        <div>

            <div className='text-center '>
                <button 
                    className={buttonClass} 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#summary" 
                    aria-expanded="false" 
                    aria-controls="summary"
                    onClick={() => handleClick()}
                >
                    {buttonContent}
                </button>
            </div>

            <div className='container-fluid collapse' id='summary'>

                <div className='row mb-3 p-3'>
                    <div className='col-12 mb-2 p-3'>
                        <h4>All Players</h4>
                    </div>

                    <div className='col-12 p-3 bg-light shadow rounded-3'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Occupation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.player.rooms
                                    ? 
                                        props.rooms
                                            .sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                                            .map(room => (
                                                <PlayerRow key={room.id} player={room}></PlayerRow>
                                            ))
                                    :
                                        <tr><td className='text-muted text-center my-3'>Loading...</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='row my-3 p-3'>
                    <div className='col-12 mb-2 p-3'>
                        <h4>All Items</h4>
                    </div>

                    <div className='col-12 p-3 bg-light shadow rounded-3'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Item</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.items
                                    ? 
                                        props.items
                                            .sort((a,b) => (a.type > b.type) ? 1 : ((b.type > a.type) ? -1 : 0))
                                            .map(item => (
                                                <ItemRow key={item.id} item={item}></ItemRow>
                                            ))
                                    :

                                        <tr><td className='text-muted text-center my-3'>Loading...</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}