import API, { string } from "/js/api.js";
//js features for signed in "members" page

//this global variable will pick up the user's username to be used below
let identifier;

function getUserInfo() {
  // eslint-disable-next-line no-undef
  axios.get("/api/user_data").then(function(data) {
    identifier = data.data.username;
    const welcomeEl = document.getElementById("welcome");
    welcomeEl.innerHTML = "Welcome " + identifier;
  });
}

getUserInfo();

function addToFavorites(id, i) {
  const userInput = {
    username: identifier,
    newValue: id
  };
  console.log(userInput);
  // eslint-disable-next-line no-undef
  axios
    .put(`/api/users/${identifier}`, userInput)
    .then(function(response) {
      console.log(response);
      const addedToFavorites = document.getElementById("favorites" + i);
      addedToFavorites.innerText = "Added!";
      setTimeout(function() {
        addedToFavorites.innerText = "";
        addedToFavorites.blur();
      }, 2000);
    })
    .catch(function(error) {
      console.log(error);
    });
}

//click handlers for about menu/block
const aboutButtonEl = document.getElementById("about-box");
const topBarEl = document.getElementById("bar1");
const midBarEl = document.getElementById("bar2");
const botBarEl = document.getElementById("bar3");
aboutButtonEl.addEventListener("click", function() {
  topBarEl.classList.toggle("bar1clicked");
  midBarEl.classList.toggle("bar2clicked");
  botBarEl.classList.toggle("bar3clicked");
  showFavoriteMeetings();
});
let appearSelector2 = 1; //this mutable variable goes up by 1 to be used in a function below
function showFavoriteMeetings() {
  //axios calls to get favorite meeting info
  // eslint-disable-next-line no-undef
  console.log(identifier);
  // eslint-disable-next-line no-undef
  axios
    .get(`/api/users/${identifier}`)
    .then(function(response) {
      const meetingID = response.data.meeting_id;

      //below code moves up modal to display favorite meeting
      const fillInDivEl = document.getElementById("fillInDiv");
      const loginTextEl = document.getElementById("loginText");
      fillInDivEl.classList.toggle("fill-in-div");
      appearSelector2++;
      console.log(appearSelector2);
      if (appearSelector2 % 2 === 0) {
        //if appearSelector2 is odd, create element, if even, remove the new element
        const loginTextCont = document.createElement("div");
        loginTextCont.setAttribute("id", "new-content");
        loginTextEl.append(loginTextCont);
        setTimeout(function() {
          loginTextEl.classList.add("appear");
          console.log(meetingID);
          const queryURL =
            "https://api.aa.org.au/meetings.json?id=" + meetingID;
          console.log(queryURL);
          // eslint-disable-next-line no-undef
          axios.get(queryURL).then(function(response) {
            console.log(response);
            const meeting = response.data.meetings[0];
            loginTextCont.innerHTML = `
                            <div class="row">
                            <div class="col">
                                <div class="card favorite-meeting-container">
                                    <div class="card-header">
                                        <p class="meeting-title">Saved Meeting:</p>
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
                                            </p>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </div>
                            `;
          });
        }, 400);
      } else {
        loginTextEl.classList.remove("appear");
        const logInForms = document.getElementById("new-content");
        logInForms.parentNode.removeChild(logInForms);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}
