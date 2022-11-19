import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

export default function handler(req, res) {
    const router = useRouter() 
    const supabase = useSupabaseClient()

    // const { code } = router.query
    
    res.status(200).json({ code: 'hello' })
}

// export default async function handler(req, res) {

//     console.log("HELLO THERE")

//     const supabase = useSupabaseClient()
//     const user = useUser()

//     if (req.method === "POST") {
//         const code = req.query.code;

//         console.log(code);

//         let item = await supabase
//             .from('Item')
//             .select('*')
//             // .eq(code, 'code')
//             // .limit(1)
//             // .single()

//         console.log(item);
    
//         res.status(200).json(item);
//     } else {
//         res.status(200).json({"Message": "Failed"})
//     }
// }