// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { readFile } from 'fs/promises'
import { User } from '../../types/user'



async function readUsersFromFile(): Promise<User[]> {
    const result = await readFile("data/users.csv", "utf8")
    const resultArray = result.split("\n").slice(1, -1)

    const finalData = resultArray.map(user => {
        const userInfo = user.split(";")
        return { id: Number(userInfo[0]), name: userInfo[1] }
    })

    return finalData
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<User[]>) {
    const users = await readUsersFromFile();

    res.status(200).json(users)
}
