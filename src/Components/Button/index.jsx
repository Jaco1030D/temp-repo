import './styles.css'

export const Button = ({onclick, disabled}) =>(
    <button disabled={disabled} onClick={onclick} className='button' >
        Texto
    </button>
)