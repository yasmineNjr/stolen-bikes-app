import classes from './TheftItem.module.css';

const TheftItem: React.FC<{title: string; 
                            description: string; 
                            picture: string; 
                            date: number; 
                            reportedDate: number; 
                            location: string}> = (props) => {

    let pic = props.picture !== null ? props.picture : 'https://archive.org/download/no-photo-available//no-photo-available.png'
    
    var date = new Date (props.date * 1000)
    var date_str = [date.getFullYear(), date.getMonth()+1, date.getDate()].join('/')
    
    return (
        <li className={classes.item}>
            <div className={classes.imagecontainer}>
                <img src={pic} alt={props.title}/>
            </div>
            <div className={classes.maincontainer}>
                <div style={{margin: '0.5rem' }}><strong>{props.title}</strong></div>
                <div className={classes.subcontainer}>
                    <div className={classes.container}>
                        <div>{props.description}</div>
                    </div>
                    <div className={classes.container}>
                        <div><strong>STOLEN: </strong>{date_str}</div>
                        <div><strong>REPORTED: </strong>{date_str}</div>
                        <div><strong>LOCATION: </strong>{props.location}</div>
                    </div>
                </div>
            </div>
        </li>
    ) 
}

export default TheftItem;