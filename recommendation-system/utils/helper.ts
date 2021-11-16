import { MatchingUser } from "../types/matching-user"
import { Rating } from "../types/rating"
import { User } from "../types/user"
import { UserRatings } from "../types/user-ratings"
import { readRatingsFromFile, readUsersFromFile } from "./file-reader"

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
