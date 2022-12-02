import { useState } from 'react'

export default function Murder(props) {

    let murderEnabled = false 

    if (props.weapons && props.diversions && props.targets && props.player) {
        murderEnabled = (props.targets.length > 0 && props.weapons.length > 0 && props.diversions.length > 0)
    }

    const[weapon, setWeapon] = useState(props.weapons ? props.weapons[0].key : null)
    const[diversion, setDiversion] = useState(props.diversions ? props.diversions[0].key : null)
    const[target, setTarget] = useState(props.targets ? props.targets[0].key : null)

    const[murderAlertClass, setMurderAlertClass] = useState('my-2 d-none')
    const[modalFooter, setModalFooter] = useState(
        <div className="modal-footer">
            <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" form='murderForm'className="btn btn-danger">Do it!</button>
        </div>
    )
    const refreshCharacter = props.refreshCharacter;
    const[murderAlert, setMurderAlert] = useState("")

    const weaponHandler = e => {
        setWeapon(e.target.value)
    }
    const diversionHandler = e => {
        setDiversion(e.target.value)
    }
    const targetHandler = e => {
        setTarget(e.target.value)
    }

    const murderHandler = async(e) => {
        e.preventDefault();
        
        const res = await fetch('/api/murder', {
            body: JSON.stringify({
                target: target,
                weapon: weapon,
                diversion: diversion,
                murderer: props.player.email,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            });

        const result = await res.json();

        setMurderAlert(result.message)
        setMurderAlertClass('mt-3')
        setModalFooter(
            <div className="modal-footer">
                <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal" onClick={() => refreshCharacter()}>Close</button>
            </div>
        )
    }

    return !props.diversions ? null : (
        <div>
            <div className='col-12 mt-3'>
                <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#murder" disabled={!murderEnabled}>
                Murder someone
                </button>
            </div>
            <div className='col-12'>
                <div className="modal fade" id="murder" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Murder someone</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>♫ <span className="fst-italic mb-3"> Suspensful music... </span>♫</p>

                                <form id='murderForm' onSubmit={murderHandler}> 
                                    <label for="target" class="form-label text-muted">Target</label>
                                    <select onChange={targetHandler} className="form-select mb-3" id="target">
                                        {props.targets}
                                    </select>

                                    <label for="weapon" class="form-label text-muted">Weapon</label>
                                    <select onChange={weaponHandler} className="form-select mb-3" id="weapon" >
                                        {props.weapons}
                                    </select>
                                    <label for="diversion" class="form-label text-muted">Diversion</label>
                                    <select onChange={diversionHandler} className="form-select" id="diversion">
                                        {props.diversions}
                                    </select>
                                    <input id='murderer' value={props.player.id} readOnly hidden></input>
                                </form>

                                <div className={murderAlertClass}>
                                    <p className='text-success fw-bold'>{murderAlert}</p>
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