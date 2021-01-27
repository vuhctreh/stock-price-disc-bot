const axios = require("axios");
require("dotenv").config();

const getInfo = async (query) => {
  console.log(`A request was submitted for "${query}"`);

  try {
    const reqURL = `https://cloud.iexapis.com/stable/stock/${query}/quote?token=${process.env.API_KEY}`;
    const { data } = await axios.get(reqURL);
    console.log("Request successful");
    console.log(data);
    return data;
  } catch (e) {
    console.log("There was an error calling the API.");
    return null;
  }
};

exports.getInfo = getInfo;
