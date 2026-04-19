import fs from 'fs'
import {parse} from 'csv-parse/sync'

export class DataProvider{

    static getTestDatafromJson(filePath:string)
    {
       let data:any=  JSON.parse(fs.readFileSync(filePath, 'utf-8'))
       return data;
       
    }

    static getTestDatafromCsv(filepath:string)
    {
       let data= parse(fs.readFileSync(filepath),{columns:true,skip_empty_lines:true})
       return data
    }
}