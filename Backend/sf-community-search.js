const auth = require("./sf-auth");

const fetch = require("node-fetch");

const findCommunities = require("./sf-communities");

module.exports = async function (searchTerm) {
  if (searchTerm) {
    const content = await searchContent(searchTerm);

    return content;
  }
};
const communityName = "CMSExample";
searchCommunityContent("Image");

async function searchCommunityContent(searchTerm) {
  return new Promise((resolve, reject) => {
    auth().then((token) => {
      findCommunities().then((communities) => {
        communities.filter((community) => {
          if (community.name === communityName) {
            const meta = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access_token}`,
            };

            const urlToUse = `${token.instance_url}/services/data/v54.0/connect/communities/${community.id}/managed-content/delivery/contents/search?queryTerm=${searchTerm}`;
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
