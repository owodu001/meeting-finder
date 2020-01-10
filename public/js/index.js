import API, { string } from "/js/api.js";

//click handlers for about menu/block
const aboutButtonEl = document.getElementById("about-box");
const topBarEl = document.getElementById("bar1");
const midBarEl = document.getElementById("bar2");
const botBarEl = document.getElementById("bar3");
aboutButtonEl.addEventListener("click", function() {
  topBarEl.classList.toggle("bar1clicked");
  midBarEl.classList.toggle("bar2clicked");
  botBarEl.classList.toggle("bar3clicked");
});

// advanced search event listener
const advancedSearchEl = document.getElementById("advanced-search");
const daySearchEl = document.getElementById("search-day");
const timeSearchEl = document.getElementById("search-time");
advancedSearchEl.addEventListener("click", function() {
  daySearchEl.classList.remove("d-none");
  timeSearchEl.classList.remove("d-none");
});

//Axios call to the AA database
const searchButtonEl = document.getElementById("search-button");
searchButtonEl.addEventListener("click", function() {
  const day = document.getElementById("search-day").value;
  const time = document.getElementById("search-time").value;
  const location = document.getElementById("search-location").value;
  // const searchDataEl = document.getElementById("search-data");

  // Advanced search field validations
  // if(day !== "") {

  // }
  if (
    day === "" ||
    day === "monday" ||
    day === "tuesday" ||
    day === "wednesday" ||
    day === "thursday" ||
    day === "friday" ||
    day === "saturday" ||
    day === "sunday"
  ) {
    // console.log(day);
    // console.log("correct");
  } else {
    daySearchEl.value = "";
    daySearchEl.setAttribute(
      "placeholder",
      "Entry not valid: Please enter a day of the week"
    );
    // console.log("wrong");
  }

  if (time === "" || time === "morning" || time === "evening") {
    // console.log("yay");
  } else {
    timeSearchEl.value = "";
    timeSearchEl.setAttribute(
      "placeholder",
      "Entry not valid: Please enter morning or evening"
    );
    // console.log("noooooo");
  }

  // console.log(day);
  // console.log(time);
  // const day = " ";
  // const time = " ";
  // const location = "Sydney";

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
    // console.log(response.data.meetings[0]);
    const meetingsArr = response.data.meetings;
    $("#search-data").html(``);
    for (let i = 0; i < 10; i++) {
      const meeting = meetingsArr[i];
      // console.log(meeting);
      $("#search-data").append(`   
<div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-header">
                        <p class="meeting-title">${meeting.title}</p>
                    </div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <p class="data">${meeting.type}</p>
                            <p class="data">${meeting.building}</p>
                            <p class="data">${meeting.address}, ${meeting.region}, ${meeting.state}, ${meeting.postcode}</p>
                            <p class="data">${meeting.directions}</p>
                            <p>
                            <a href="https://www.google.com/maps/place/${meeting.address}+${meeting.state}+Australia/">Map</a>
                            &nbsp <button class="favorites" onclick="addToFavorites(${meeting.id}, ${i})" id="favorites${i}">Add to favorites</button>
                            </p>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
`);
    }
  });
});

//feature to add:
//if the user tries to add a meeting to favorites when not logged in, they will be prompted to log in

// Get references to page elements
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
