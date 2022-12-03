import { useState } from 'react'

export default function Murder(props) {

    let transferEnabled = false 

    if (props.player && props.rooms && props.playerItems) {
        transferEnabled = (props.rooms.length > 0 && props.playerItems.length > 0)
    }

    const[item, setItem] = useState(props.playerItems ? props.playerItems[0].key : null)
    const[target, setTarget] = useState(props.rooms ? props.rooms[0].key : null)

    const[transferAlertClass, setTransferAlertClass] = useState('my-2 d-none')
    const[modalFooter, setModalFooter] = useState(
        <div className="modal-footer">
            <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" form='transferForm' className="btn btn-success">Transfer item</button>
        </div>
    )
    const refreshCharacter = props.refreshCharacter;
    const[transferAlert, setTransferAlert] = useState("")

    const itemHandler = e => {
        setItem(e.target.value)
    }
    const targetHandler = e => {
        setTarget(e.target.value)
    }

    const transferHandler = async(e) => {
        e.preventDefault();
        
        const res = await fetch('/api/transfer', {
            body: JSON.stringify({
                target: target,
                item: item,
                originator: props.player.email,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            });

        const result = await res.json();

        setTransferAlert(result.message)
        setTransferAlertClass('mt-3')
        setModalFooter(
            <div className="modal-footer">
                <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal" onClick={() => refreshCharacter()}>Close</button>
            </div>
        )
    }

    return !props.playerItems ? null : (
        <div className='col-6 mt-3'>
            <div className='col-6'>
                <button type="button" className="btn btn-sm btn-outline-info" data-bs-toggle="modal" data-bs-target="#transfer" disabled={!transferEnabled}>
                Transfer item
                </button>
            </div>
            <div className='col-12'>
                <div className="modal fade" id="transfer" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Transfer an item</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>You are either kind or foolish... or perhaps both.</p>

                                <form id='transferForm' onSubmit={transferHandler}> 
                                    <label for="target" class="form-label text-muted">Target</label>
                                    <select onChange={targetHandler} className="form-select mb-3" id="target">
                                        {props.rooms}
                                    </select>

                                    <label for="diversion" class="form-label text-muted">Item</label>
                                    <select onChange={itemHandler} className="form-select" id="item">
                                        {props.playerItems}
                                    </select>

                                    <input id='originator' value={props.player.id} readOnly hidden></input>
                                </form>

                                <div className={transferAlertClass}>
                                    <p className='text-success fw-bold'>{transferAlert}</p>
                                </div>

                            </div>
                            {modalFooter}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}