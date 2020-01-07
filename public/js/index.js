import API, { string } from "/js/api.js";

//click handler for menu/about block
const aboutButtonEl = document.getElementById("about-box");
const topBarEl = document.getElementById("bar1");
const midBarEl = document.getElementById("bar2");
const botBarEl = document.getElementById("bar3");
aboutButtonEl.addEventListener("click", function() {
  topBarEl.classList.toggle("bar1clicked");
  midBarEl.classList.toggle("bar2clicked");
  botBarEl.classList.toggle("bar3clicked");
});

//Axios call to the AA database

// const day = document.getElementById("search-day").value
// const time = document.getElementById("search-time").value
// const location = document.getElementById("search-location").value
const day = "monday";
const time = "evening";
const location = "Sydney";

const queryURL =
  "https://api.aa.org.au/meetings.json?day=" +
  day +
  "&timeofday=" +
  time +
  "&near=" +
  location +
  "&limit=20&offset=0";
console.log(queryURL);

// eslint-disable-next-line no-undef
axios.get(queryURL).then(function(response) {
  console.log(response.data.meetings);
});

// axios.get(queryURL3)
//     .then(function(uvResponse) {
//         // console.log(uvResponse);
//         document.getElementById("uv").innerHTML = "UV Index: " + uvResponse.data.value;
//     })

// // Get references to page elements
// const exampleTextEl = document.getElementById("example-text");
// const exampleDescriptionEl = document.getElementById("example-description");
// const submitBtnEl = document.getElementById("submit");
// const exampleListEl = document.getElementById("example-list");

// // refreshExamples gets new examples from the db and repopulates the list
// const refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     const exampleEls = data.map(function(example) {
//       const aEl = document.createElement("a");
//       aEl.innerHTML = example.text;
//       aEl.setAttribute("href", "/example/?id=" + example.id);

//       const liEl = document.createElement("li");
//       liEl.classList.add("list-group-item");
//       liEl.setAttribute("data-id", example.id);
//       liEl.append(aEl);

//       const buttonEl = document.createElement("button");
//       buttonEl.classList.add("btn", "btn-danger", "float-right", "delete");
//       buttonEl.innerHTML = "ｘ";
//       buttonEl.addEventListener("click", handleDeleteBtnClick);

//       liEl.append(buttonEl);

//       return liEl;
//     });

//     exampleListEl.innerHTML = "";
//     exampleListEl.append(...exampleEls);
//   });
// };
// refreshExamples();

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// const handleFormSubmit = function(event) {
//   event.preventDefault();

//   const example = {
//     text: exampleTextEl.value.trim(),
//     description: exampleDescriptionEl.value.trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   exampleTextEl.value = "";
//   exampleDescriptionEl.value = "";
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// const handleDeleteBtnClick = function(event) {
//   const idToDelete = event.target.parentElement.getAttribute("data-id");
//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// submitBtnEl.addEventListener("click", handleFormSubmit);
// document.querySelectorAll(".delete").forEach(btn => {
//   btn.addEventListener("click", handleDeleteBtnClick);
// });
