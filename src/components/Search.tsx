import { useRef, useContext } from "react";
import classes from './Search.module.css';
import { IoMdSearch } from "react-icons/io";
import { TheftContext } from '../store/theft-context';

const Search = () => {

    const theftCtx = useContext(TheftContext);
    const textInputRef = useRef<HTMLInputElement>(null);
    const startDateInputRef = useRef<HTMLInputElement>(null);
    const endDateInputRef = useRef<HTMLInputElement>(null);
    
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredText = textInputRef.current!.value;
        const startDateText = startDateInputRef.current!.value;
        const endDateText = endDateInputRef.current!.value;
        theftCtx.getSearchWord(enteredText, startDateText, endDateText);
    }
    
    return <form onSubmit={submitHandler} className={classes.form}>
            <div style={{width: '85%',display: 'flex', flexDirection: 'row'}}>
                <div className={classes.inputcontainer}>
                    <input type="text" id="text" placeholder='CASE TITLE' ref={textInputRef}/>
                    <div className={classes.datecontainer}>
                        <input type="date" id="text" placeholder='START DATE' ref={startDateInputRef} style={{width: '50%', marginRight: '0.25rem'}}/>
                        <input type="date" id="text" placeholder='END DATE' ref={endDateInputRef}  style={{width: '50%', marginLeft: '0.25rem'}}/>
                    </div>
                </div>
                <button><IoMdSearch color='#f7f5ef' size={28}/></button>
            </div>
               
        </form>
}

export default Search;