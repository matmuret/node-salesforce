const auth = require("./sf-crm-auth");

const fetch = require("node-fetch");

const config = require("./sf-crm-config")();

module.exports = async function (searchTerm) {
  if (searchTerm) {
    const content = await searchContent(searchTerm);

    return content.items;
  }
};

async function searchContent(searchTerm) {
  if (searchTerm) {
    return new Promise((resolve, reject) => {
      auth().then((token) => {
        const meta = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        };

        const urlToUse = `${token.instance_url}/services/data/v54.0/connect/cms/delivery/channels/${config.channelId}/contents
/search?queryTerm=${searchTerm}`;

        fetch(urlToUse, {
          method: "GET",
          headers: meta,
        })
          .then((res) => res.json())
          .then((json) => resolve(json))
          .catch((err) => {
            console.log({ err });
            reject(err);
          });
      });
    });
  }
}
