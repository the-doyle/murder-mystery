import { supabase } from "../../../supabase"

export default async function handler(req, res) {
    
    let { data, error } = await supabase
        .from('Character')
        .select('*')
        .eq('email', req.query.email)
        .limit(1)
        .single()

    let player = data;

    ({ data, error } = await supabase
        .from('Item')
        .select('*')    
        .in('code', player.items))

    let items = data 

    const response = {
        'player': player,
        'items': items 
    }
    
    res.status(200).json(response)
}
