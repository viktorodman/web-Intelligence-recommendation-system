// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MatchingUser } from '../../../types/matching-user'
import { findTopMatchingUsersEuclidean } from '../../../utils/euclidean-calculations'



export default async function handler(req: NextApiRequest, res: NextApiResponse<MatchingUser[]>) {
    const { userId,  simMethod, numOfResults } = req.query

    console.log(userId,simMethod,numOfResults)

    if (!userId || !simMethod || !numOfResults){
        res.status(400).json([])  
    }

    if (Number(simMethod) === 1) {

        const data = await findTopMatchingUsersEuclidean(Number(userId), Number(numOfResults))
        res.status(200).json(data)
    } else if(Number(simMethod) === 2) {
        
        res.status(200).json([])
    } else {
        res.status(400).json([])
    }
}
