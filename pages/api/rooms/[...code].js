import { supabase } from "../../../supabase"

export default async function handler(req, res) {

    let response = {}
    
    let { data, error } = await supabase
        .from('Character')
        .select('*')
        .eq('code', req.query.code[0])
        .limit(1)
        .single() 

    const room = data;

    if (!room) {
        response['message'] = "Invalid room code"
        res.status(200).json(response)
    }

    ({data, error} = await supabase
        .from('Character')
        .select('*')
        .eq('email', req.query.code[1])
        .limit(1)
        .single())

    const char = data;

    if (char.rooms.includes(room.code)) {
        response['message'] = "You already have this room!"
        res.status(200).json(response)
    }

    let newRooms = char.rooms
    newRooms.push(room.code)

    const { charError } = await supabase
        .from('Character')
        .update({ rooms: newRooms })
        .eq('email', char.email)

    response['message'] = "Success! Room added."
    res.status(200).json(response)
}
