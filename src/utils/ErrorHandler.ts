

export class Errorhandler extends Error {
    constructor(code:any,message:any){
        super(message);
        // this.code = code;
        Error.captureStackTrace(this,this.constructor)
    }
}
