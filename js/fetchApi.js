const url =
  "https://dev.deepthought.education/assets/uploads/files/files/others/ddugky_project.json";

const fetchApi = async () => {
  await fetch("js/api.json")
    .then((response) => {
      return response.json();
    })
    .then((obj) => {
      return obj;
    })
    .catch((error) => {
      console.error("something went wrong");
      console.error(error);
    });
};

export default fetchApi;
