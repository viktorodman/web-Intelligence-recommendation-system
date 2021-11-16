import { MatchingUser } from "../types/matching-user"
import { Rating } from "../types/rating"
import { User } from "../types/user"
import { readRatingsFromFile, readUsersFromFile } from "./file-reader"

type UserRatings = {
    userId: number
    username: string
    ratings: Rating[]
}

export const findTopMatchingUsersEuclidean = async (userId: number, numOfResults: number): Promise<MatchingUser[]> => {
    const allUsers: User[] = await readUsersFromFile()
    const allRatings: Rating[] = await readRatingsFromFile()
    const userRatings: UserRatings[] = getUserRatings(allUsers, allRatings)
    const passedUserRating = userRatings.find(ur => ur.userId === userId)
    
   
    if (!passedUserRating) {
        return []
    }

    return getEuclideanScores(userRatings, passedUserRating).slice(0, numOfResults)
}

export const findRecommendedMovies = async () => {
    
}

export const findItemBasedRecommendations = async () => {
    
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

const getUserRatings = (allUsers: User[], allRatings: Rating[]): UserRatings[] => {
    return allUsers.map((user: User) => {
        return {
            userId: user.id,
            username: user.name,
            ratings: allRatings.filter((ur: Rating) => ur.userId === user.id)
        }
    })
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

