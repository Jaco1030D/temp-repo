import './styles.css';
export const InputText = ({handleChange, searchValue}) =>(
    <input className="text-input" type="search" onChange={handleChange} value={searchValue} />
)
