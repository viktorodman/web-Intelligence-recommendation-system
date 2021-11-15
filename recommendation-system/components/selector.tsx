type SelectorProps = {
    description: string;
    options: any[];
}

const Selector = ({ description,  options }: SelectorProps) => {
  return (
    <div>
        <label htmlFor={description.toLowerCase()}>{description}: </label>
        <select name={description.toLowerCase()}>
            { options.map(o => <option value={o.id} key={o.id}>{o.name}</option>) }
        </select>
    </div>
  )
}

export default Selector
