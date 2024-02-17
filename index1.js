const FormData = require("form-data");
// const fetch = require("node-fetch");
const fetch = require("cross-fetch");
const formData = new FormData();

formData.append("scController", "Search");
formData.append("scAction", "GetHalalSearchResult");
formData.append("searchData[SearchText]", "a");
formData.append("searchData[HalalSelectedList]", "Establishment");
formData.append("searchData[PageSize]", "30");
formData.append("searchData[Page]", "3");

let url =
	"https://www.muis.gov.sg/Halal/Halal-Certification/Certified-Eating-Establishments";

let options = {
	method: "POST",
	headers: {
		"Content-Type":
			"multipart/form-data; boundary=---011000010111000001101001",
		"Sec-Fetch-Mode": "cors",
		"User-Agent": "insomnia/2023.5.8",
	},
};

options.body = formData;

fetch(url, options)
	.then((res) => res.text())
	.then((json) => console.log(json))
	.catch((err) => console.error("error:" + err));

/*
curl --request POST --url https://www.muis.gov.sg/Halal/Halal-Certification/Certified-Eating-Establishments --header 'Content-Type: multipart/form-data' --header 'Sec-Fetch-Mode: cors' --form scController=Search --form scAction=GetHalalSearchResult --form 'searchData[SearchText]=a' --form 'searchData[HalalSelectedList]=Establishment' --form 'searchData[PageSize]=30' --form 'searchData[Page]=3'
	*/
