// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MatchingUser } from '../../../types/matching-user'
import { findTopMatchingUsersEuclidean } from '../../../utils/euclidean-calculations'
import { findTopMatchingUsersPearson } from '../../../utils/pearson-calculations'



export default async function handler(req: NextApiRequest, res: NextApiResponse<MatchingUser[]>) {
    const { userId,  simMethod, numOfResults } = req.query

    console.log(userId,simMethod,numOfResults)

    if (!userId || !simMethod || !numOfResults){
        res.status(400).json([])  
    }
    
    if (Number(simMethod) === 1) {
        const data = await findTopMatchingUsersEuclidean(Number(userId))
        res.status(200).json(data.slice(0, Number(numOfResults)))
    } else if(Number(simMethod) === 2) {
        const data = await findTopMatchingUsersPearson(Number(userId))
        res.status(200).json(data.slice(0, Number(numOfResults)))
    } else {
        res.status(400).json([])
    }
}
