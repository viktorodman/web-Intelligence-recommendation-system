// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MatchingMovie } from '../../../types/matching-movie'
import { findRecommendedMoviesEuclidean } from '../../../utils/euclidean-calculations'
import { findRecommendedMoviesPearson } from '../../../utils/pearson-calculations'



export default async function handler(req: NextApiRequest, res: NextApiResponse<MatchingMovie[]>) {
    const { userId,  simMethod, numOfResults } = req.query

    console.log(userId,simMethod,numOfResults)

    if (!userId || !simMethod || !numOfResults){
        res.status(400).json([])  
    }
    
    if (Number(simMethod) === 1) {
        const data = await findRecommendedMoviesEuclidean(Number(userId))
        res.status(200).json(data.slice(0,Number(numOfResults)))
    } else if(Number(simMethod) === 2) {
        const data = await findRecommendedMoviesPearson(Number(userId))
        res.status(200).json(data.slice(0, Number(numOfResults)))
    } else {
        res.status(400).json([])
    }
}
