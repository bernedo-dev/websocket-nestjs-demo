import { LoggerService, LogLevel } from "@nestjs/common";


export class CustomLogger implements LoggerService {

    log(message: any, ...optionalParams: any[]) {
       console.log(message);
    }
    error(message: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    warn(message: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    debug?(message: any, ...optionalParams: any[]) {
        console.log(message);
    }
    verbose?(message: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    setLogLevels?(levels: LogLevel[]) {
        throw new Error("Method not implemented.");
    }

}