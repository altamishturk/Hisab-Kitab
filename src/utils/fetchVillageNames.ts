import axios from "axios";
import * as cheerio  from "cheerio";


export async function fetchVillageNames() {
  try {
    const { data } = await axios.get('https://www.viewvillage.in/villages-of-district/amroha-154');
    
    
    const $ = cheerio.load(data);


    const villages:string[] = [];

    $('table tbody td').toArray().forEach((element, index) => {
      const villageName = $(element).text().trim();
      if (villageName) {
        villages.push(villageName);
      }
    });

    return villages
  } catch (error) {
    console.error('Error fetching village names:', error);
  }
}
