const fetch = require("cross-fetch");
const FormData = require("form-data");
const cheerio = require("cheerio");
const url =
	"https://www.muis.gov.sg/Halal/Halal-Certification/Certified-Eating-Establishments";

(async () => {
	try {
		let formData = new FormData();
		formData.append("scController", "Search");
		formData.append("scAction", "GetHalalSearchResult");
		formData.append("searchData[SearchText]", "a");
		formData.append("searchData[HalalSelectedList]", "Establishment");
		formData.append("searchData[PageSize]", "30");
		formData.append("searchData[Page]", "3");
		let options = {
			method: "POST",
			headers: {
				"Content-Type":
					"multipart/form-data; boundary=---011000010111000001101001",
				"Sec-Fetch-Mode": "cors",
			},
		};
		options.body = formData;

		// fetch(url, options)
		// 	.then((res) => res.json())
		// 	.then((json) => console.log(json))
		// 	.catch((err) => console.error("error:" + err));

		const res = await fetch(url, options);
		const data = await res.text();
		// console.log(res);
		console.log(data);
		process.exit(0);
	} catch (error) {
		console.log(error);
	}
})();
/*
scController: Search
scAction: GetHalalSearchResult
searchData[SearchText]: a
searchData[HalalSelectedList]: Establishment
searchData[PageSize]: 30
searchData[Page]: 2
*/
