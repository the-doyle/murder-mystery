import { supabase } from "../../../supabase"

export default async function handler(req, res) {

    let response = {}
    
    let { data, error } = await supabase
        .from('Item')
        .select('*')
        .eq('code', req.query.code[0])
        .limit(1)
        .single() 

    const item = data;

    if (!item) {
        response['message'] = "Invalid item code"
        res.status(200).json(response)
    }

    ({data, error} = await supabase
        .from('Character')
        .select('*')
        .eq('email', req.query.code[1])
        .limit(1)
        .single())

    const char = data;

    if (char.items.includes(item.code)) {
        response['message'] = "You already have this item"
        res.status(200).json(response)
    }

    if (item.remainingInventory === 0) {
        response['message'] = "This item has no remaining inventory"
        res.status(200).json(response)
    } else {
        const { itemError } = await supabase
            .from('Item')
            .update({ remainingInventory: item.remainingInventory - 1 })
            .eq('id', item.id)

        let newItems = char.items
        newItems.push(item.code)

        const { charError } = await supabase
            .from('Character')
            .update({ items: newItems })
            .eq('email', char.email)

        response['message'] = "Success! Item added."
        res.status(200).json(response)
    }
}
