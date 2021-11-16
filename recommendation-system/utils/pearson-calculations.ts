import { MatchingUser } from "../types/matching-user";
import { UserRatings } from "../types/user-ratings";
import { getUserRatings } from "./helper";


export const findTopMatchingUsersPearson = async (userId: number): Promise<MatchingUser[]> => {
    const userRatings: UserRatings[] = await getUserRatings()
    const passedUserRating = userRatings.find(ur => ur.userId === userId)
    
    if (!passedUserRating) {
        return []
    }

    return getPearsonScores(userRatings, passedUserRating)
}

const getPearsonScores = (userRatings: UserRatings[], passedUserRating: UserRatings): MatchingUser[] => {
    const scores: MatchingUser[] = []
    userRatings.forEach(userRating => {
        if (userRating.userId !== passedUserRating.userId && passedUserRating) {
            scores.push({
                id: userRating.userId,
                name: userRating.username,
                score: pearson(passedUserRating, userRating)
            })
        }
    })

    return scores.sort((a,b) => b.score - a.score)
}

const pearson = (userA: UserRatings, userB: UserRatings): number => {
    let sum1 = 0
    let sum2 = 0
    let sum1sq = 0
    let sum2sq = 0
    let pSum = 0

    let n = 0

    userA.ratings.forEach(ar => {
        userB.ratings.forEach(br => {
            if (ar.movieId === br.movieId) {
                sum1 += ar.score
                sum2 += br.score
                sum1sq += ar.score**2
                sum2sq += br.score**2
                pSum += ar.score * br.score
                n += 1
            }
        })
    })

    if (n==0) {
        return 0
    }

    const num = pSum - ((sum1 * sum2) / n)
    const den = Math.sqrt((sum1sq - sum1**2 / n) * (sum2sq - sum2**2 / n))

    return num/den
}
