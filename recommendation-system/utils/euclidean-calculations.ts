import { MatchingMovie } from "../types/matching-movie"
import { MatchingUser } from "../types/matching-user"
import { SimilarityRating } from "../types/similarity-rating"
import { UserRatings } from "../types/user-ratings"
import { readMoviesFromFile } from "./file-reader"
import { getUserRatings, getWeightedScores } from "./helper"

type UserMovieScore = {
    username: string
    score: number
}

type MovieWithUsers = {
    id: number
    title: string
    users: UserMovieScore[]
}

type ItemRecommendation = {
    title: string 
    id: number
    score: number
}


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

export const findItemBasedRecommendationsEuclidean = async (userId: number): Promise<ItemRecommendation[]> => {
    const movies = await readMoviesFromFile()
    const userRatings: UserRatings[] = await getUserRatings()
    const passedUserRatings = userRatings.find(ur => ur.userId === userId)

    const allMoviesWithRatings: MovieWithUsers[] = movies.map(movie => ({ id: movie.id, title: movie.title, users: [] }))

    userRatings.forEach(user => {
        user.ratings.forEach(rating => {
            const movie = allMoviesWithRatings.find(f => f.id === rating.movieId)

            movie?.users.push({score: rating.score, username: user.username})
        })
    })

    console.log(passedUserRatings?.ratings)

    const alreadySeenMovies = allMoviesWithRatings.filter(movieWithRating => {
        return (passedUserRatings?.ratings.find(f => f.movieId === movieWithRating.id))
    })

    const possibleRecommendations = allMoviesWithRatings.filter(movieWithRating => {
        return !(passedUserRatings?.ratings.find(f => f.movieId === movieWithRating.id))
    })

    if(!passedUserRatings) {
        return []
    }


    const recommendedItems = getEuclideanScoresItemBased(alreadySeenMovies, possibleRecommendations, passedUserRatings)


    return recommendedItems.sort((a,b) => b.score - a.score);
}



const getEuclideanScoresItemBased = (alreadySeenMovies: MovieWithUsers[], possibleRecommendations: MovieWithUsers[], passedUserRatings: UserRatings): ItemRecommendation[] => {
    const recommendedMovies:ItemRecommendation[] = []

    possibleRecommendations.forEach(possibleRecommendation => {
        const currentMovie: ItemRecommendation = {
            title: possibleRecommendation.title,
            id: possibleRecommendation.id,
            score: 0
        } 
        let totalWeight = 0;
        let totalSim = 0;

        alreadySeenMovies.forEach(movie => {
            const userMovieRating = passedUserRatings.ratings.find(m => m.movieId === movie.id)
            let userMovieScore = userMovieRating ? userMovieRating.score : 0

            let currentSim = euclideanItemBased(movie, possibleRecommendation)
            totalSim += currentSim
            totalWeight += (userMovieScore * currentSim)
        })
        currentMovie.score = (totalWeight/totalSim)
        recommendedMovies.push(currentMovie)
    })


    return recommendedMovies
}


const euclideanItemBased = (movieA: MovieWithUsers, movieB: MovieWithUsers): number => {
    let sim = 0
    let n = 0

    movieA.users.forEach(movieAUser => {
        movieB.users.forEach(movieBUser => {
            
            if (movieAUser.username === movieBUser.username) {
                sim += ((movieAUser.score - movieBUser.score)**2)
                n += 1
            }
        })
    })

    if(n === 0) {
        return 0
    }

    return (1 / (1+sim))
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



