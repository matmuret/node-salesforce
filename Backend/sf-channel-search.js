const auth = require("./sf-auth");

const fetch = require("node-fetch");

const findChannels = require("./sf-channels");

const channelName = "CMSExample";
searchContent("Document");

module.exports = async function (searchTerm) {
  if (searchTerm) {
    const content = await searchContent(searchTerm);

    return content.items;
  }
};

async function searchContent(searchTerm) {
  return new Promise((resolve, reject) => {
    auth().then((token) => {
      findChannels().then((channels) => {
        channels.map((channel) => {
          if (channel.channelName === channelName) {
            const meta = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access_token}`,
            };

            const urlToUse = `${token.instance_url}/services/data/v54.0/connect/cms/delivery/channels/${channel.channelId}/contents/search?queryTerm=${searchTerm}`;
            console.log(urlToUse);
            fetch(urlToUse, {
              method: "GET",
              headers: meta,
            })
              .then((res) => res.json())
              .then((json) => console.log(json))
              .then((json) => resolve(json))
              .catch((err) => {
                console.log({ err });
                reject(err);
              });
          }
        });
      });
    });
  });
}
