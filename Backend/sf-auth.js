const fetch = require("node-fetch");
const { URLSearchParams } = require("url");
const url = "https://login.salesforce.com/services/oauth2/token";
const client_secret =
  "16490032ACE1C9D23CF013BD3218EBB6532CBA67F6D83B0690B6C75DE4D1D71F";
const client_id =
  "3MVG9kBt168mda_8CDOccrT0FjFjkylM_Njfs_FsxgdKwdDxrzggKVy4atkV8QZAaZDsegSQACw==";
const grant_type = "password";
const username = "filippo@moretti.salebox";
const password = " Matmuret82fmpsGHzbNOqP5nEBMiVU5sfSf";
//redirect_uri:test.com

module.exports = async function () {
  return await authenticate();
};

function authenticate() {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    params.append("client_id", client_id);

    params.append("client_secret", client_secret);
    params.append("grant_type", grant_type);
    params.append("username", username);
    params.append("password", password);

    fetch(url, {
      method: "POST",
      body: params,
    })
      .then((res) => res.json()) // expecting a json response
      //.then((json) => console.log("======>", json))
      .then((json) => resolve(json))
      .catch((err) => {
        console.log({ err });
        reject(err);
      });
  });
}
