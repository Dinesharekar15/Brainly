import { number } from "zod";

export function HashString(len:number){
    let str="bvjersjfbu98324977bjdbf238y8"
    let n=str.length;
    let ans="";
    for(let i=0;i<len;i++){
        ans+=str[Math.floor(Math.random()*n)];
    }
    return ans;
}