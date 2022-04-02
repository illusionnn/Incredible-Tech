import fetch from "node-fetch";
import cheerio from "cheerio";

// function to get the raw data
const getRawData = (URL) => {
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};

// URL for data
const URL = "https://en.wikipedia.org/wiki/IIT_Kharagpur";

// start of the program
const getUniversityData = async () => {
   const universtiyData = await getRawData(URL);

   // parsing the data
   const parsedUniversityData = cheerio.load(universtiyData);

   // extracting the table data
   const universtiyDataTable = parsedUniversityData("table.infobox")[0].children[5].children[1].children;
   const universityName = parsedUniversityData("table.infobox")[0].children[5].children[0].children[0].data;
   console.log(universtiyDataTable);
   console.log("----------------");
   console.log(universityName);
   
};

// invoking the main function
getUniversityData();
