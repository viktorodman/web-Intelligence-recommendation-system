import styles from '../styles/Selector.module.css'

type SelectorProps = {
    description: string;
    options: any[];
}

const Selector = ({ description,  options }: SelectorProps) => {
  return (
    <div className={styles.selectorWrapper}>
        <label htmlFor={description.toLowerCase()} className={styles.label}>{description}</label>
        <select name={description.toLowerCase()} className={styles.select}>
            { options.map(o => <option value={o.id} key={o.id}>{o.name}</option>) }
        </select>
    </div>
  )
}

export default Selector
