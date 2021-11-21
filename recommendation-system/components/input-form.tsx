import { useState } from 'react'
import styles from '../styles/Selector.module.css'
import { User } from '../types/user'

type FormProps = {
  users: User[]
  formSubmit: (userId: string, sim: string, numOfResults: string, apiPath: string) => void
}

const InputForm = ({ users, formSubmit }: FormProps) => {
  const [user, setUser] = useState<string>(users[0].id.toString())
  const [algo, setAlgo] = useState<string>("1")
  const [resultNum, setResultNum] = useState<string>("")

  const handleSubmit = (e:any) => {
    e.preventDefault()
    console.log(user, algo, resultNum, e.target.value)
    formSubmit(user, algo, resultNum, e.target.value)
  }

  return (
    <div>
        <form>
          <label htmlFor="users">User</label>
          <select required name="users" onChange={e => setUser(e.target.value)}>
            { users.map(user => <option value={user.id} key={user.id}>{user.name}</option>) }
          </select>

          <label htmlFor="sim">Similarity</label>
          <select required name="sim" onChange={e => setAlgo(e.target.value)}>
            <option value="1" key="1">Euclidean</option>
            <option value="2" key="2">Pearson</option>
          </select>

          <label htmlFor="results">Results</label>
          <input required type="text" name="results" id="results" onChange={e => setResultNum(e.target.value)}/>

          <button type="submit" value="users" onClick={e => handleSubmit(e)}>Find top matching users</button>
          <button type="submit" value="movies" onClick={e => handleSubmit(e)}>Find recommended movies</button>
          <button type="submit" value="item-based" onClick={e => handleSubmit(e)}>Find recommendations, item-based</button>
        </form>
    </div>
  )
}

export default InputForm
