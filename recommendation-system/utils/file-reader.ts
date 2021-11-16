import { readFile } from 'fs/promises'
import { Movie } from '../types/movie'
import { Rating } from '../types/rating'
import { User } from '../types/user'

export const readUsersFromFile = async (): Promise<User[]> => {
    const result = await readFile("data/users.csv", "utf8")
    const resultArray = result.split("\n").slice(1, -1)

    const finalData = resultArray.map(user => {
        const userInfo = user.split(";")
        return { id: Number(userInfo[0]), name: userInfo[1] }
    })

    return finalData
}

export const readRatingsFromFile = async (): Promise<Rating[]> => {
    const result = await readFile("data/ratings.csv", "utf8")
    const resultArray = result.split("\n").slice(1, -1)

    const finalData = resultArray.map(rating => {
        const movieRating = rating.split(";")
        return { userId: Number(movieRating[0]), movieId: Number(movieRating[1]), score: Number(movieRating[2]) }
    })

    return finalData
}

export const readMoviesFromFile = async (): Promise<Movie[]> => {
    const result = await readFile("data/movies.csv", "utf8")
    const resultArray = result.split("\n").slice(1, -1)

    const finalData = resultArray.map(movie => {
        const movieInfo = movie.split(";")
        return { id: Number(movieInfo[0]), title: movieInfo[1], year: Number(movieInfo[2]) }
    })

    return finalData
}