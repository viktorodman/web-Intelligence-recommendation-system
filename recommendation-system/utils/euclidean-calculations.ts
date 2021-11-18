import { MatchingMovie } from "../types/matching-movie"
import { MatchingUser } from "../types/matching-user"
import { Movie } from "../types/movie"
import { SimilarityRating } from "../types/similarity-rating"
import { UserRatings } from "../types/user-ratings"
import { readMoviesFromFile } from "./file-reader"
import { getUserRatings, getWeightedScores } from "./helper"

export const findTopMatchingUsersEuclidean = async (userId: number): Promise<MatchingUser[]> => {
    const userRatings: UserRatings[] = await getUserRatings()
    const passedUserRating = userRatings.find(ur => ur.userId === userId)
    
    if (!passedUserRating) {
        return []
    }

    const euclideanScores = getEuclideanScores(userRatings, passedUserRating)

    return euclideanScores.map((es) => ({id: es.id, name: es.name, score: es.score}))
}

export const findRecommendedMoviesEuclidean = async (userId: number): Promise<MatchingMovie[]> => {
    const userRatings: UserRatings[] = await getUserRatings()
    const passedUserRating = userRatings.find(ur => ur.userId === userId)
    const movies = await readMoviesFromFile()

    const filterOutAlreadySeenMovies = movies.filter(x => {
        return !(passedUserRating?.ratings.find(f => f.movieId === x.id))
    })

    
    
    if (!passedUserRating) {
        return []
    }
    
    const similarityScores = getEuclideanScores(userRatings, passedUserRating)
    const calcWeightedScores = getWeightedScores(similarityScores, filterOutAlreadySeenMovies)
    
    return calcWeightedScores.sort((a,b) => b.score - a.score)
}

export const findItemBasedRecommendationsEuclidean = async () => {
    
}

const euclidean = (userA: UserRatings, userB: UserRatings): number => {
    let sim = 0
    let n = 0

    userA.ratings.forEach(ar => {
        userB.ratings.forEach(br => {
            
            if (ar.movieId === br.movieId) {
                sim += ((ar.score - br.score)**2)
                n += 1
            }
        })
    })

    if(n === 0) {
        return 0
    }

    return (1 / (1+sim))
}

const getEuclideanScores = (userRatings: UserRatings[], passedUserRating: UserRatings): SimilarityRating[] => {
    const scores: SimilarityRating[] = []
    userRatings.forEach(userRating => {
        if (userRating.userId !== passedUserRating.userId && passedUserRating) {
            scores.push({
                id: userRating.userId,
                name: userRating.username,
                score: euclidean(passedUserRating, userRating),
                ratings: userRating.ratings
            })
        }
    })

    return scores.sort((a,b) => b.score - a.score)
}



