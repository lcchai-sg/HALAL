const axios = require("axios").default;
const FormData = require("form-data");
const cheerio = require("cheerio");
const alpha = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];

const getData = async (sc, i) => {
	try {
		const formData = new FormData();
		formData.append("scController", "Search");
		formData.append("scAction", "GetHalalSearchResult");
		formData.append("searchData[SearchText]", sc);
		formData.append("searchData[HalalSelectedList]", "Establishment");
		formData.append("searchData[PageSize]", pp);
		formData.append("searchData[Page]", i);

		var options = {
			method: "POST",
			url: "https://www.muis.gov.sg/Halal/Halal-Certification/Certified-Eating-Establishments",
			headers: {
				"Content-Type":
					"multipart/form-data; boundary=---011000010111000001101001",
				"User-Agent": "insomnia/2023.5.8",
				"Sec-Fetch-Mode": "cors",
			},
			data: formData,
		};
		const { data } = await axios.request(options);
		return data;
	} catch (error) {
		console.log(error);
	}
};

const notExist = (name, address) => {
	est.forEach((r) => {
		if (r.name === name && r.address === address) return false;
	});
	return true;
};

let est = [];
let pp = 30;
let np = 0;
(async () => {
	try {
		for (const sc of alpha) {
			const data = await getData(sc, 1);
			const $ = cheerio.load(data);
			let result = $(".result").text();
			result = result
				? result.match(/total/i)
					? result.split("total")[1]
					: "0"
				: "0";
			result = result.match(/result/i) ? result.split("result")[0] : "0";
			result = parseInt(result);
			if (result > 0) np = Math.ceil(result / pp);
			for (let i = 1; i <= np; i++) {
				console.log(`sc : ${sc} ..... cp : ${i} / ${np}`);
				const data = await getData(sc, i);
				const $ = cheerio.load(data);
				let name, address;
				$(".search-result")
					.children()
					.each((idx, el) => {
						if (
							$(el)["0"]["name"] === "p" &&
							$(el).attr("class") === "strong"
						)
							name = $(el).text();
						if (
							$(el)["0"]["name"] === "div" &&
							$(el).attr("class") === "location"
						) {
							address = "";
							let addr1 = $(el).contents().text();
							let addr = addr1.split("\n");
							addr.forEach((ad) => {
								let nad = ad.trim();
								if (nad) address = address + nad + " ";
							});
							address = address.trim();
						}
						if (name && address)
							if (notExist(name, address)) {
								est.push({ name, address });
								name = "";
								address = "";
							}
					});
				await new Promise((r) => setTimeout(r, 2000));
				if (i > 2) {
					console.log(`number : `, est.length);
					est.sort((a, b) => (a.name > b.name ? 1 : 0)).forEach((e) =>
						console.log(e)
					);
					process.exit(0);
				}
			}
		}
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
