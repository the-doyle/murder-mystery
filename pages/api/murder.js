import { supabase } from "../../supabase"

export default async function handler(req, res) {

    let response = {}

    // set murderer items as used 
    const { data: mData, error: mError } = await supabase
        .from('Character')
        .select('*')
        .eq('email', req.body.murderer)
        .limit(1)
        .single() 

    const murderer = mData;
    let usedItems = murderer.usedItems;
    usedItems.push(req.body.weapon, req.body.diversion);

    const { data: uItemsData, error: uItemsError } = await supabase
        .from('Character')
        .update({ usedItems: usedItems })
        .eq('email', req.body.murderer)

    // set target isDead true, murderedBy murderer
    const { data: tData, error: tError } = await supabase
        .from('Character')
        .update({ isDead: true, murderedBy: murderer.code })
        .eq('email', req.body.target)
        .select() 
    
    // calculate score 
    const { data: wData, error: wError } = await supabase
        .from('Item')
        .select('*')
        .eq('code', req.body.weapon)
        .limit(1)
        .single()
    let weapon = wData
    let score = wData.rating
    
    // calculate score 
    const { data: dData, error: dError } = await supabase
        .from('Item')
        .select('*')
        .eq('code', req.body.diversion)
        .limit(1)
        .single()
    let diversion = dData
    score += dData.rating

    // Generate random suspects, weapon, diversion depending on score. 
    const outcome = {} 

    if (score < 11) {
        outcome['suspects'] = 1
        outcome['weapon'] = weapon.description
        outcome['diversion'] = diversion.description
    } else if (11 <= score < 14) {
        outcome['suspects'] = 3
        outcome['weapon'] = weapon.description
        outcome['diversion'] = diversion.description 
    } else if (14 <= score < 18) {
        outcome['suspects'] = 5
        outcome['weapon'] = "Unknown"
        outcome['diversion'] = diversion.description
    } else {
        outcome['suspects'] = 7
        outcome['weapon'] = "Unknown"
        outcome['diversion'] = "Unknown" 
    }
    
    const { data: acData, error: acError } = await supabase
        .from('Character')
        .select('name')

    let allCharacters = acData;
    let acArray = allCharacters.map(a => a.name);

    const index = acArray.indexOf(murderer.name);
    if (index > -1) { // only splice array when item is found
        acArray.splice(index, 1); // 2nd parameter means remove one item only
    }

    // Shuffle array
    const shuffled = acArray.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    let suspects = shuffled.slice(0, outcome.suspects);

    // Add murderer to suspects 
    suspects.push(murderer.name)

    // add new row to Murders table. 
    const { data: iData, error: iError } = await supabase
        .from('Murders')
        .insert({ 
            weapon: outcome.weapon, 
            diversion: outcome.diversion,
            score: score,
            targetName: tData[0].name,
            suspects: suspects,
            murderer: murderer.name
        })

    console.log(outcome)

    response['message'] = "Murder accomplished. Now, can you get away with it?"
    res.status(200).json(response)
}
