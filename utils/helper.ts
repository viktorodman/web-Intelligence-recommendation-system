import { MatchingMovie } from "../types/matching-movie"
import { MatchingUser } from "../types/matching-user"
import { Movie } from "../types/movie"
import { Rating } from "../types/rating"
import { SimilarityRating } from "../types/similarity-rating"
import { User } from "../types/user"
import { UserRatings } from "../types/user-ratings"
import { readRatingsFromFile, readUsersFromFile } from "./file-reader"

type MovieWithWeight = {
    id: number
    title: string
    year: number
    totalSim: number
    totalWeight: number
}

export const getFilePath = () => {
    const SMALL = "data/small/"
    const LARGE = "data/"

    return LARGE
}

export const getUserRatings = async (): Promise<UserRatings[]> => {
    const allUsers: User[] = await readUsersFromFile()
    const allRatings: Rating[] = await readRatingsFromFile()
    return allUsers.map((user: User) => {
        return {
            userId: user.id,
            username: user.name,
            ratings: allRatings.filter((ur: Rating) => ur.userId === user.id)
        }
    })
}

export const getWeightedScores = (userScores: SimilarityRating[], movies: Movie[]): MatchingMovie[] => {
    const filterOutNegatives = userScores.filter(user => user.score > 0)
    const moviesWithScores: MovieWithWeight[] = movies.map(m => ({ id: m.id, title: m.title, year: m.year, totalSim: 0, totalWeight: 0 }))

    moviesWithScores.forEach(movie => {
        filterOutNegatives.forEach(user => {
            user.ratings.forEach(mRating => {
                if (movie.id === mRating.movieId) {
                    movie.totalWeight += (user.score * mRating.score)
                    movie.totalSim += user.score
                }
            })
        })
    })

    return moviesWithScores.map(a => ({id: a.id, title: a.title, score: (a.totalWeight/a.totalSim)}))
}
