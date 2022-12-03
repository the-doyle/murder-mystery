import { supabase } from "../../supabase"

export default async function handler(req, res) {

    let response = {}

    // make sure target doesn't already have item
    const { data: tData, error: tError } = await supabase
        .from('Character')
        .select('*')
        .eq('email', req.body.target)
        .limit(1)
        .single() 

    console.log(tData.items)
    console.log(req.body.item)

    if (tData.items.includes(parseInt(req.body.item))) {
        response['message'] = `${tData.name} already has that item!`
    } else {
        // add item to target
        const { data: tAddData, error: tAddError } = await supabase
            .from('Character')
            .select('*')
            .eq('email', req.body.target)
            .limit(1)
            .single() 

        let tItems = tAddData.items;
        tItems.push(req.body.item);

        const { data: utItemsData, error: utItemsError } = await supabase
            .from('Character')
            .update({ items: tItems })
            .eq('email', req.body.target)

        // remove item from originator
        const { data: oData, error: oError } = await supabase
            .from('Character')
            .select('*')
            .eq('email', req.body.originator)
            .limit(1)
            .single() 

        let oItems = oData.items;
        oItems = oItems.filter(item => item != req.body.item)

        const { data: otItemsData, error: otItemsError } = await supabase
            .from('Character')
            .update({ items: oItems })
            .eq('email', req.body.originator)

        response['message'] = "Item transferred!"
    }
    
    res.status(200).json(response)
}
