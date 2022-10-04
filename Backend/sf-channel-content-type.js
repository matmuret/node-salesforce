const auth = require("./sf-auth");

const fetch = require("node-fetch");

const config = require("./sf-channels");

module.exports = async function (type) {
  if (type) {
    const content = await getContentList(type);

    return content;
  }
};
const channelName = "CMSExample";
getContentList("cms_image");

/* we could set “cms_image” content type isSearchable to false 
so that we don’t return“cms_image” content when end users do a search
/services/data/v49.0//connect/cms/channels/[channelId]/searchable-content-types”
In the request body, copy paste:
{ "name":"cms_image", "isSearchable":"false"} */

async function getContentList(type) {
  return new Promise((resolve, reject) => {
    auth().then((token) => {
      config().then((channels) => {
        channels.map((channel) => {
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
