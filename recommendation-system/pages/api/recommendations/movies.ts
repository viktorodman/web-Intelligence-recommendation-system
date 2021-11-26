// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Match } from '../../../types/match'
import { MatchingMovie } from '../../../types/matching-movie'
import { findRecommendedMoviesEuclidean } from '../../../utils/euclidean-calculations'
import { findRecommendedMoviesPearson } from '../../../utils/pearson-calculations'



export default async function handler(req: NextApiRequest, res: NextApiResponse<Match | []>) {
    const { userId,  simMethod, numOfResults } = req.query

    console.log(userId,simMethod,numOfResults)

    if (!userId || !simMethod || !numOfResults){
        res.status(400).json([])  
    }
    
    if (Number(simMethod) === 1) {
        const recommendedMovies = await findRecommendedMoviesEuclidean(Number(userId))

        const match: Match = {
            typeOfMatch: "Movies",
            data: recommendedMovies.map(tm => ({id: tm.id, score: tm.score, title: tm.title})).slice(0, Number(numOfResults))
        }

        res.status(200).json(match)
    } else if(Number(simMethod) === 2) {
        const recommendedMovies = await findRecommendedMoviesPearson(Number(userId))
        
        const match: Match = {
            typeOfMatch: "Movies",
            data: recommendedMovies.map(tm => ({id: tm.id, score: tm.score, title: tm.title})).slice(0, Number(numOfResults))
        }

        res.status(200).json(match)
    } else {
        res.status(400).json([])
    }
}
