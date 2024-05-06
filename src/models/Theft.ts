class Theft {
    id: number;
    title : string;
    description : string;
    date : number;
    reportedDate: number;
    location: string;
    picture: string; 

    constructor(theftId: number,
                theftTitle: string, 
                theftDescription: string, 
                theftDate: number, 
                theftReportedDate: number,
                theftLocation: string,
                theftPicture: string){
        this.id= theftId;
        this.title= theftTitle;
        this.description= theftDescription;
        this.date= theftDate;
        this.reportedDate= theftReportedDate;
        this.location= theftLocation;
        this.picture= theftPicture;
    }
}

export default Theft;