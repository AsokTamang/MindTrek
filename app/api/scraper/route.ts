import * as cheerio from 'cheerio';
import axios from 'axios';
import { NextResponse } from "next/server";
interface item{
    image:string;
    name:string;
    address:string;
    website:string;
}

export async function GET() {
    const unique=new Set();
    const url='https://www.ratemds.com/best-doctors/on/toronto/therapist'
    const {data}=await axios.get(url)   //here we are just extracting the html page of the website as a data
    const therapist=cheerio.load(data);   //then we are loading the extracted data into our $therapist variable using cheerio inorder to scrape the data .
    const Therapist=<item[]>[];
    try {
        therapist('.doctor-container').each((_,elem)=>{   //here doctor-container is the class of a card container of a doctor so we use each on this class container
            const image=therapist(elem).find('.search-item-image').attr('src')!;   //here we are scraping the image by classname and through attribute of src to get the image src
            const name= therapist(elem).find('.search-item-doctor-name').text().trim();   //then we also find name,address,and website using the class
            const address=therapist(elem).find('.doctor-address').text().trim();
            const website='https://www.ratemds.com/best-doctors/on/toronto/therapist';
           
            if(name){
              const item={
                   image, name,address,website
                }
                console.log('item is :',item);
            
            const key=`${image}-${name}`   //here as the address or website can be same we are using the name of the therapist as the key 
            if(!unique.has(key)){  //here we are checking if the name is unique or not cause set cannot contain a duplicate datas
                unique.add(key);   //if not duplicate then we add the key which is a name
                Therapist.push(item);   //then we push the whole item
            }}

        });
     return NextResponse.json({success:true,data:Therapist,message:'scraped successfully'},{status:200})   
        
    } catch (error:unknown) {
        if(error instanceof Error){
            console.log(error.message);
            return  NextResponse.json({success:false,data:null,message:'scraped unsuccessfull'},{status:500})    
        }
        
    }


    
}