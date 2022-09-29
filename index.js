const express = require("express");
const jsforce = require("jsforce");
require("dotenv").config();
const app = express();
const PORT = 3001;

const {
  SF_LOGIN_URL,
  SF_USERNAME,
  SF_PASSWORD,
  SF_TOKEN,
  REDIRECT_URL,
  CLIENT_SECRET,
  CLIENT_ID,
} = process.env;

//Username and Password Login (OAuth2 Resource Owner Password Credential)

var conn = new jsforce.Connection({
  oauth2: {
    loginUrl: SF_LOGIN_URL,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URL,
  },
});
conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, userInfo) => {
  if (err) {
    return console.error(err);
  }
  // Now you can get the access token and instance URL information.
  // Save them to establish connection next time.
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  // ...
});

//Username and Password Login

/* const conn = new jsforce.Connection({
  loginUrl: SF_LOGIN_URL,
});
conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, userInfo) => {
  if (err) {
    console.error(err);
  } else {
    console.log("User ID:" + userInfo.id);
    console.log("Org ID:" + userInfo.organizationId);
  }
}); */

app.get("/", (req, res) => {
  conn.query("SELECT Id, Name From Account", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log("Total records" + result.totalSize);
      res.json(result.records);

      //this.records=result.records
    }
  });
  //res.send("Salesforce integration with node.js");
});
app.listen(PORT, () => {
  console.log(`Server is running in at http://localhost:${PORT}`);
});
