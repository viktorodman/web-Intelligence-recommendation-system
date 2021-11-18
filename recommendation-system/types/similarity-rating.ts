import { Rating } from "./rating";

export type SimilarityRating = {
    id: number
    name: string
    score: number
    ratings: Rating[]
}

