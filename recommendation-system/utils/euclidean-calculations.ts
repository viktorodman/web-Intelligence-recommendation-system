import { MatchingUser } from "../types/matching-user"
import { Rating } from "../types/rating"
import { User } from "../types/user"
import { readRatingsFromFile, readUsersFromFile } from "./file-reader"

type UserRatings = {
    userId: number
    username: string
    ratings: Rating[]
}

export const findTopMatchingUsers = async (userId: number, numOfResults: number): Promise<MatchingUser[]> => {
    const users: User[] = await readUsersFromFile()
    const ratings: Rating[] = await readRatingsFromFile()

    const userRatings: UserRatings[] = users.map((user: User) => {
        return {
            userId: user.id,
            username: user.name,
            ratings: ratings.filter((ur: Rating) => ur.userId === user.id)
        }
    })

    const passedUserRating = userRatings.find(ur => ur.userId === userId)

    const scores: MatchingUser[] = []

    userRatings.forEach(userRating => {
        if (userRating.userId !== userId && passedUserRating) {
            scores.push(euclidean(passedUserRating, userRating))
        }
    })

    const finalResult: MatchingUser[] = scores.sort((a,b) => b.score - a.score)

    console.log(finalResult)

    return finalResult.slice(0, numOfResults)
}

export const findRecommendedMovies = async () => {
    
}

export const findItemBasedRecommendations = async () => {
    
}

const euclidean = (userA: UserRatings, userB: UserRatings): MatchingUser => {
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
        return {
            id: userB.userId,
            name: userB.username,
            score: 0
        }
    }

    return {
        id: userB.userId,
        name: userB.username,
        score: (1 / (1+sim))
    } 
}