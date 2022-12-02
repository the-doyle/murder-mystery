export default function Room(props) {
    
    return !props.items ? null : (

        <div className='col-12 bg-light shadow rounded-3 p-3 my-3'>
            <p className='fs-6 text-center fw-bold text-dark'>
                {props.player.name}
                {props.player.isDead
                    ? <span className='text-danger fst-italic'> (murdered)</span>
                    : <span className='text-light'>.</span>
                
                }
            </p>

            {props.items.length > 0
                ? 
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
                                .filter(item => props.player.items.includes(item.code))
                                .sort((a, b) => a.type.localeCompare(b.type) || a.rating - b.rating)
                                .map(item => (
                                    <tr key={item.id}>
                                        {props.player.usedItems.includes(item.code) && props.disableUsed
                                            ? <td className='text-muted'>{item.description} <span className="badge rounded-pill bg-secondary mx-1">used</span></td>
                                            : <td>{item.description}</td>
                                        }
                                        <td><span className={item.type==='weapon' ? "badge rounded-pill bg-danger mx-1" : item.type==='diversion' ? "badge rounded-pill bg-info mx-1" : item.type==='cash' ? "badge rounded-pill bg-success mx-1" : "badge rounded-pill bg-warning mx-1" }>{item.type}</span></td>
                                        {item.rating > 0
                                            ? <td><span className="badge rounded-pill bg-secondary mx-1">{item.rating} / 10</span></td>
                                            : <td><span className="badge rounded-pill bg-light text-dark mx-1">None</span></td>
                                            
                                        }
                                        
                                    </tr>
                                ))
                            } 
                        </tbody>
                    </table>
                :
                    <p className='text-muted text-center my-3'>No items yet</p>
            }
        </div>

    )                   
}