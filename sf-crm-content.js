const auth = require("./sf-crm-auth");

const fetch = require("node-fetch");

const config = require("./sf-crm-config");

module.exports = async function (type) {
  if (type) {
    const content = await getContentList(type);

    return content;
  }
};
const channelName = "CMSExample";
getContentList("Image");

async function getContentList(type) {
  return new Promise((resolve, reject) => {
    auth().then((token) => {
      config().then((channels) => {
        channels.filter((channel) => {
          if (channel.channelName === channelName) {
            const meta = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access_token}`,
            };

            const urlToUse = `${token.instance_url}/services/data/v54.0/connect/cms/delivery/channels/${channel.channelId}/contents/query?managedContentType=${type}&pageSize=250`;
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
