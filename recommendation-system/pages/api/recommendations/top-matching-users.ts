// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MatchingUser } from '../../../types/matching-user'
import { findTopMatchingUsers } from '../../../utils/euclidean-calculations'



export default async function handler(req: NextApiRequest, res: NextApiResponse<MatchingUser[]>) {
    const { userId,  simMethod, numOfResults } = req.query

    console.log(userId,simMethod,numOfResults)

    if (!userId || !simMethod || !numOfResults){
        res.status(400).json([])  
    } 

    const data = await findTopMatchingUsers(Number(userId), Number(numOfResults))

    res.status(200).json(data)
}
