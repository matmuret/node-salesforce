const auth = require("./sf-auth");

const fetch = require("node-fetch");
const { URLSearchParams } = require("url");

const url = "/services/data/v54.0/connect/cms/delivery/channels";

module.exports = async function () {
  const channels = await getChannelsList();
  //console.log("channels?", channels);
  return channels.channels;
};

async function getChannelsList() {
  return new Promise((resolve, reject) => {
    auth().then((token) => {
      const meta = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      };

      const urlToUse = `${token.instance_url}${url}`;
      fetch(urlToUse, {
        method: "GET",
        headers: meta,
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          resolve(json);
        })
        .catch((err) => {
          console.log({ err });
          reject(err);
        });
    });
  });
}
