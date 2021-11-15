import { InferGetStaticPropsType } from 'next'
import { useEffect, useState } from 'react'
import {User} from '../types/user'
import Selector from './selector'





const Options = () => {
    const [users, setUsers] = useState<User[]>([])
    
    useEffect(() => {
        const fetchUsers = async () => {
            let response = await fetch("http://localhost:3000/api/users")
            response = await response.json()
            console.log(response)
            setUsers(users)
        }
        fetchUsers()
    }, [])

    return (
        
  )
}

export default Options
