export default function PlayerRow(props) {
    
    return !props.player ? null : (
        
        <tr>
            <td >{props.player.name}</td>
            <td >{props.player.occupation}</td>
        </tr>
                       
    )                   
}