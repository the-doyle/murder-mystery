import { useState } from 'react'

export default function MurderSummary(props) {

    const[buttonContent, setButtonContent] = useState("Murders")
    const[buttonClass, setButtonClass] = useState("btn btn-outline-danger")

    function handleClick() {
        if (buttonContent === "Murders") {
            setButtonContent("Hide Murders")
        } else {
            setButtonContent("Murders")
        }

        if (buttonClass === "btn btn-outline-danger") {
            setButtonClass("btn btn-danger")
        } else {
            setButtonClass("btn btn-outline-danger")
        }
    }

    return !props.murders ? null : (

        <div>
            <div className='text-center my-3'>
                <button 
                    className={buttonClass} 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#murderSummary" 
                    aria-expanded="false" 
                    aria-controls="murderSummary"
                    onClick={() => handleClick()}
                >
                    {buttonContent}
                </button>
            </div>

            <div className='container-fluid collapse' id='murderSummary'>

                <div className='row mb-3 p-3'>
                    <div className='col-12 p-3'>
                        <h4>All Murders</h4>
                    </div>

                    {
                        props.murders
                            .map(murder => (
                                <div key={murder.id} className='col-12 p-3 bg-light shadow rounded-3 my-3'>
                                    <p className='text-danger fs-5'>
                                        <span className='fw-bold'>{murder.targetName} </span>
                                        is dead.  
                                    </p>
                                    <p><span className='fw-bold'>Weapon: </span>{murder.weapon}</p>
                                    <p><span className='fw-bold'>Diversion: </span>{murder.diversion}</p>
                                    <p className='fw-bold'>Suspects:</p>
                                    <ul>
                                        {murder.suspects
                                            .sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0))
                                            .map(suspect => (
                                                <li key={suspect}>{suspect}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            ))
                    }

                </div>
            </div>
        </div>
    )
}