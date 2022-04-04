import fetch from "node-fetch";
import cheerio from "cheerio";
import * as fs from 'fs';

// function to get the raw data
const getRawData = (URL) => {
	return fetch(URL)
		.then((response) => response.text())
		.then((data) => {
			return data;
	});
};

// URL for data
// const URL = "https://en.wikipedia.org/wiki/IIT_Kharagpur";
const URL = "https://en.wikipedia.org/wiki/Oriental_Institute_of_Science_and_Technology";
// const URL = "https://en.wikipedia.org/wiki/Lakshmi_Narain_College_of_Technology";
// const URL = "https://en.wikipedia.org/wiki/Makhanlal_Chaturvedi_National_University_of_Journalism_and_Communication";

// store the infomation in json object
// let universityDataJSON = [];
let universityDataJSON = {};
// let universityDataJSON = new Map();
// let universityDataJSON = new Set();

function addKeyValuePair(arr, key, value) {
	// try arr.push()
	return arr.map((obj) => ({...obj, [key]: value}));
}

// start of the program
const getUniversityData = async () => {
	const universtiyData = await getRawData(URL);

	// parsing the data
	const parsedUniversityData = cheerio.load(universtiyData);

	// extracting the table data
	// const universtiyDataTable = parsedUniversityData("div.mw-parser-output")[0].children[5].children[1].children;
	const universtiyDataTable = parsedUniversityData("table.infobox")[0].children[1].children;
	// const universityName = parsedUniversityData("div.mw-parser-output")[0].children[5].children[0].children[0].data;
	const universityName = parsedUniversityData("table.infobox")[0].children[0].children[0].data;
	// console.log(universtiyDataTable);
	universtiyDataTable.forEach(row => {
		if (row.name === "tr") {
			let key = null;
			let value = null;

			const valueColumns = row.children.filter((column) => column.name === "td");
			const keyColumns = row.children.filter((column) => column.name === "th");

			const keyColumn = keyColumns[0];
			if (keyColumn) {
				key = keyColumn.children[0];
			if (key) {
				key = key.data;
			}
			}

			const valueColumn = valueColumns[0];
			if (valueColumn) {
				value = valueColumn.children[0];
			if (value) {
				value = value.data;
			}
			}

			if (key && value) {
				// console.log(`{"${key}" : "${value}"},`);
				// universityDataJSON.push(key);
				// universityDataJSON.push(value);
				// universityDataJSON.set(`${key}`, `${value}`);
				// universityDataJSON.add(`${key}`, `${value}`);
				universityDataJSON[key] = `${value}`;
			}
		}
	});
	console.log("----------------");
	console.log(universityName);

};

let outputJSON = async () => { 
	await getUniversityData(); 
	console.log(JSON.stringify(universityDataJSON));
	fs.writeFile("uni_data.json", JSON.stringify(universityDataJSON), (err) => {
		if (err)
			console.log(err);
		else {
			console.log("File written successfully\n");
			console.log("The written has the following contents:");
			console.log(fs.readFileSync("uni_data.json", "utf8"));
		}
	});
};

outputJSON();

// invoking the main function
// getUniversityData();
