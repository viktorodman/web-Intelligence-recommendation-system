import { Rating } from "./rating";

export type UserRatings = {
    userId: number
    username: string,
    ratings: Rating[]
}