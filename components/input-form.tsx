import { useState } from 'react'
import styles from '../styles/InputForm.module.css'
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
    <div className={styles.wrapper}>
        <form>
          <div className={styles.inputsWrapper}>
            <div>
              <label htmlFor="users">User</label>
              <select required name="users" onChange={e => setUser(e.target.value)}>
                { users.map(user => <option value={user.id} key={user.id}>{user.name}</option>) }
              </select>
            </div>
            <div>
              <label htmlFor="sim">Similarity</label>
              <select required name="sim" onChange={e => setAlgo(e.target.value)}>
                <option value="1" key="1">Euclidean</option>
                <option value="2" key="2">Pearson</option>
              </select>
            </div>
            <div>
              <label htmlFor="results">Results</label>
              <input required type="text" name="results" id="results" onChange={e => setResultNum(e.target.value)}/>
            </div>
            

            

           
          </div>
          <div className={styles.buttonsWrapper}>
            <button type="submit" value="users" onClick={e => handleSubmit(e)}>Find top matching users</button>
            <button type="submit" value="movies" onClick={e => handleSubmit(e)}>Find recommended movies</button>
            <button type="submit" value="item-based" onClick={e => handleSubmit(e)}>Find recommendations, item-based</button>
          </div>
        </form>
    </div>
  )
}

export default InputForm
