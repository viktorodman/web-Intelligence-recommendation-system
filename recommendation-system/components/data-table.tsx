import styles from '../styles/DataTable.module.css'
import { Match } from '../types/match'

type TableProps = {
    tableData: Match
}

const DataTable = ({ tableData }: TableProps) => {
  return (
    <div className={styles.wrapper}>
        <table className={styles.dataTable}> 
            <tr>
                <th>{tableData.typeOfMatch}</th>
                <th>ID</th>
                <th>Score</th>
            </tr>
            {
                tableData.data.map((d) => (
                    <tr>
                        <td>{d.title}</td>
                        <td>{d.id}</td>
                        <td>{d.score}</td>
                    </tr>
                ))
            }
        </table>

        
    </div>
  )
}

export default DataTable
