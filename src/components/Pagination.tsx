import { useContext } from 'react';
import classes from './Pagination.module.css';
import { GrPrevious } from "react-icons/gr";
import { RxTrackPrevious } from "react-icons/rx";
import { GrNext } from "react-icons/gr";
import { RxTrackNext } from "react-icons/rx";
import { TheftContext } from '../store/theft-context';

const Pagination = () => {

    const theftCtx = useContext(TheftContext);
    const pageNum = theftCtx.pageNumber;
    
    return (
    theftCtx.items.length > 0 ? 
        <div  className={classes.container}>
            <strong>Page {pageNum}</strong>
            <div className={classes.subcontainer}>
                <div className={classes.button}  onClick={()=>{theftCtx.goFirst()}}>
                    <RxTrackPrevious color='#f7f5ef' size={18} />
                </div>
                <div className={classes.button}  onClick={()=>{theftCtx.goPrevious()}}>
                    <GrPrevious color='#f7f5ef' size={18}/>
                </div>
                <div className={classes.button} onClick={()=>{theftCtx.goNext()}}>
                    <GrNext color='#f7f5ef' size={18}/>
                </div>
                <div className={classes.button} onClick={() => {theftCtx.goLast()}}>
                    <RxTrackNext color='#f7f5ef' size={18}/>
                </div>
            </div>
        </div>
        :
        <div></div>
    )
}

export default Pagination;