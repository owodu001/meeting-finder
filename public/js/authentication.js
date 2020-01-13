//elements for login text
const fillInDivEl = document.getElementById("fillInDiv");
const logInButton = document.getElementById("login");
const loginTextEl = document.getElementById("loginText");

//event listener for login/signup to appear on screen
let appearSelector = 1; //this mutable variable goes up by 1 to be used in a function below
logInButton.addEventListener("click", function() {
  openLoginForms();
});

function openLoginForms() {
  fillInDivEl.classList.toggle("fill-in-div");
  appearSelector++;
  if (appearSelector % 2 === 0) {
    //if appearSelector is odd, create element, if even, remove the new element
    const loginTextCont = document.createElement("div");
    loginTextCont.setAttribute("id", "log-in-forms");
    loginTextEl.append(loginTextCont);
    loginTextCont.innerHTML = `
     <div class="login-box">
        <div class="login">
            <p>Have an account? Log in</p>
            <input placeholder="username" class="form-control" id="userNameLogin">
            <input type="password" placeholder="password" class="form-control" id="passwordLogin">
            <button class="search-button btn btn-outline-secondary" id="loginBtn">Login</button>
        </div>
        <div class="sign-up">
            <p>Need an account? Sign up</p>
            <input placeholder="username" class="form-control" id="userNameSignUp">
            <input type="password" placeholder="password" class="form-control" id="passwordSignUp">
            <button class="search-button btn btn-outline-secondary" id="signUpBtn">Sign Up</button>
        </div>
    </div>
     `;
    setTimeout(function() {
      loginTextEl.classList.add("appear");
      //event listeners for dynamic login and sign up buttons
      const loginBtnEl = document.getElementById("loginBtn");
      const signUpBtnEl = document.getElementById("signUpBtn");
      const userNameLoginEl = document.getElementById("userNameLogin");
      const passwordLoginEl = document.getElementById("passwordLogin");
      const userNameSignUpEl = document.getElementById("userNameSignUp");
      const passwordSignUpEl = document.getElementById("passwordSignUp");
      loginBtnEl.addEventListener("click", function() {
        runLogin();
      });
      signUpBtnEl.addEventListener("click", function() {
        runSignUp();
      });

      function runLogin() {
        const userData = {
          username: userNameLoginEl.value.trim(),
          password: passwordLoginEl.value.trim()
        };

        if (!userData.username || !userData.password) {
          return;
        }
        console.log(userData);
        // eslint-disable-next-line no-undef
        axios
          .post("/api/login", userData)
          .then(function(data) {
            console.log(data.data);
            window.location.replace(data.data); //pulls url part of object to redirect user to logged in page
            // If there's an error, log the error
          })
          .catch(function(err) {
            console.log(err);
          });
      }

      function runSignUp() {
        const userData = {
          username: userNameSignUpEl.value.trim(),
          password: passwordSignUpEl.value.trim()
        };

        if (!userData.username || !userData.password) {
          return;
        }
        console.log(userData);
        // eslint-disable-next-line no-undef
        axios
          .post("/api/signup", userData)
          .then(function(data) {
            console.log(data.data);
            window.location.replace(data.data); //pulls url part of object to redirect user to logged in page
            // If there's an error, log the error
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    }, 400);
  } else {
    loginTextEl.classList.remove("appear");
    const logInForms = document.getElementById("log-in-forms");
    logInForms.parentNode.removeChild(logInForms);
  }
}
