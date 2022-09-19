export const strToBool = (str, defaultValue) => {
    switch(str?.toLowerCase()?.trim()){
        case "true": 
        case "yes": 
        case "1": 
          return true;

        case "false": 
        case "no": 
        case "0": 
          return false;

        case null: 
        case undefined:
        default: 
          return defaultValue;
    }
}
