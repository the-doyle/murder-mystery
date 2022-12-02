export default function ItemRow(props) {
    
    return !props.item ? null : (
        
        <tr>
            <td >{props.item.description}</td>
            <td><span className={props.item.type==='weapon' ? "badge rounded-pill bg-danger mx-1" : "badge rounded-pill bg-info mx-1" }>{props.item.type}</span></td>
            <td><span className="badge rounded-pill bg-secondary mx-1">{props.item.rating} / 10</span></td>
        </tr>
                       
    )                   
}