import { supabase } from "../../../supabase"

export default async function handler(req, res) {
    
    let { data: cData, error: eData } = await supabase
        .from('Character')
        .select('*')
        .eq('email', req.query.email)
        .limit(1)
        .single()

    let player = cData;

    const { data: iData, error: iError } = await supabase
        .from('Item')
        .select('*')    

    let items = iData; 

    const { data: rData, error: rError } = await supabase
        .from('Character')
        .select('*')    
        
    let rooms = rData; 

    const {data: mData, error: mError} = await supabase
        .from('Murders')
        .select('*')

    let murders = mData;
    
    const response = {
        'player': player,
        'items': items,
        'rooms': rooms,
        'murders': murders
    }
    
    res.status(200).json(response)
}
