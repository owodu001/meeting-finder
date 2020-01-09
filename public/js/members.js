let identifier;

$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.username);
    identifier = data.username;
  });
});

const modifyInputEl = document.getElementById("modify-input");
const modifyBtnEl = document.getElementById("modify-button");

const handleFormModify = function(event) {
  console.log(identifier);
  event.preventDefault();
  const userInput = {
    username: identifier,
    newValue: modifyInputEl.value.trim()
  };
  console.log(userInput);
  // eslint-disable-next-line no-undef
  axios
    .put(`/api/examples/${userInput.username}`, userInput)
    //in this .then, you could send back the meeting ID in the res.JSON and then grab it here to display -
    //-that way there'd be no issue with the data not being ready before the DOM tries to display it
    .then(function(response) {
      console.log(response);
      // eslint-disable-next-line no-undef
      refreshExamples();
    })
    .catch(function(error) {
      console.log(error);
    });
};

modifyBtnEl.addEventListener("click", handleFormModify);
