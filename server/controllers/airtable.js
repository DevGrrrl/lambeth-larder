require("env2")("./config.env");
const API_KEY = process.env.API_KEY;
const API_BASE = process.env.API_BASE;
const Airtable = require("airtable");

const getAirtableData = (req, res) => {
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: API_KEY
  });
  const base = Airtable.base(API_BASE);

  base("Times and Venues")
    .select({
      fields: [
        "Name",
        "Description",
        "Address Line 1",
        "Address Line 2",
        "Address Line 3",
        "Postcode",
        "Requires Voucher",
        "Monday Open",
        "Monday Close",
        "Tuesday Open",
        "Tuesday Close",
        "Wednesday Open",
        "Wednesday Close",
        "Thursday Open",
        "Thursday Close",
        "Friday Open",
        "Friday Close",
        "Saturday Open",
        "Saturday Close",
        "Sunday Open",
        "Sunday Close"
      ],
      maxRecords: 100
    })
    .eachPage(function page(records) {
      res.send(records);
    });
};

module.exports = getAirtableData;
