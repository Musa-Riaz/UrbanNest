class ErrorHandler extends Error {
    constructor(statusCode, message){
        super(this.message);
        this.statusCode = statusCode;
    }
}