import { MatchingUser } from "../types/matching-user"
import { UserRatings } from "../types/user-ratings"
import { getUserRatings } from "./helper"

export const findTopMatchingUsersEuclidean = async (userId: number): Promise<MatchingUser[]> => {
    const userRatings: UserRatings[] = await getUserRatings()
    const passedUserRating = userRatings.find(ur => ur.userId === userId)
    
    if (!passedUserRating) {
        return []
    }

    return getEuclideanScores(userRatings, passedUserRating)
}

export const findRecommendedMoviesEuclidean = async (userId: number) => {
    
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

const getEuclideanScores = (userRatings: UserRatings[], passedUserRating: UserRatings): MatchingUser[] => {
    const scores: MatchingUser[] = []
    userRatings.forEach(userRating => {
        if (userRating.userId !== passedUserRating.userId && passedUserRating) {
            scores.push({
                id: userRating.userId,
                name: userRating.username,
                score: euclidean(passedUserRating, userRating)
            })
        }
    })

    return scores.sort((a,b) => b.score - a.score)
}



