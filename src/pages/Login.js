/* global FB*/
import React, { useEffect, useRef } from "react";
import "../styles/Login.css";

const Login = () => {
  const statusRef = useRef(null);

  useEffect(() => {
    const loadFacebookSDK = () => {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "837937237925260", // Replace with your Facebook app ID
          cookie: true,
          xfbml: true,
          version: "v20.0", // Replace with the correct API version
        });

        window.FB.getLoginStatus(function (response) {
          statusChangeCallback(response);
        });
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    };

    loadFacebookSDK();
  }, []);

  const statusChangeCallback = (response) => {
    console.log("statusChangeCallback");
    console.log(response);
    if (response.status === "connected") {
      testAPI();
    } else {
      if (statusRef.current) {
        statusRef.current.innerHTML = "Please log into this webpage.";
      }
    }
  };

  const checkLoginState = () => {
    window.FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  };

  const testAPI = () => {
    console.log("Welcome! Fetching your information.... ");
    window.FB.api("/me", function (response) {
      console.log("Successful login for: " + response.name);
      if (statusRef.current) {
        statusRef.current.innerHTML =
          "Thanks for logging in, " + response.name + "!";
      }
    });
  };
  return (
    <div className="login-container">
      <h1>Facebook Login in MERN App</h1>
      <div
        className="fb-login-button"
        data-scope="public_profile,email"
        data-onlogin="checkLoginState();"
      ></div>
      <div id="status" ref={statusRef}></div>
    </div>
  );
};

export default Login;
