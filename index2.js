const axios = require("axios").default;
const FormData = require("form-data");
const formData = new FormData();
const cheerio = require("cheerio");

formData.append("scController", "Search");
formData.append("scAction", "GetHalalSearchResult");
formData.append("searchData[SearchText]", "a");
formData.append("searchData[HalalSelectedList]", "Establishment");
formData.append("searchData[PageSize]", "30");
formData.append("searchData[Page]", "3");

var options = {
	method: "POST",
	url: "https://www.muis.gov.sg/Halal/Halal-Certification/Certified-Eating-Establishments",
	headers: {
		"Content-Type":
			"multipart/form-data; boundary=---011000010111000001101001",
		"User-Agent": "insomnia/2023.5.8",
		"Sec-Fetch-Mode": "cors",
	},
	// data: '-----011000010111000001101001\r\nContent-Disposition: form-data; name="scController"\r\n\r\nSearch\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="scAction"\r\n\r\nGetHalalSearchResult\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="searchData[SearchText]"\r\n\r\na\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="searchData[HalalSelectedList]"\r\n\r\nEstablishment\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="searchData[PageSize]"\r\n\r\n30\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="searchData[Page]"\r\n\r\n1\r\n-----011000010111000001101001--\r\n',
	data: formData,
};

(async () => {
	try {
		const { data } = await axios.request(options);
		const $ = cheerio.load(data);
		$(".search-result")
			.children()
			.each((idx, el) => {
				console.log(idx, $(el)["0"]["name"], $(el).text());
			});
	} catch (error) {
		console.log(error);
	}
})();

// axios
// 	.request(options)
// 	.then(function (response) {
// 		console.log(response.data);
// 	})
// 	.catch(function (error) {
// 		console.error(error);
// 	});
