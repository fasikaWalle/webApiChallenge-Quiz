var body = document.body;
body.style.backgroundColor = "#f4f4f4";
var divContainer = document.createElement("div");
divContainer.setAttribute(
  "style",
  "width:60%;height:50%;border:2px solid #555;position:absolute;top:20%;left:20%;borderRadius:5px;padding:40px;background-color:#fff"
);
body.append(divContainer);
headerDiv = document.createElement("div");
headerDiv.setAttribute("style", "width:80%;margin:40px auto;");
headingElement = document.createElement("h1");
headingElement.textContent = "Coding Quiz Challenge";
headingElement.setAttribute(
  "style",
  "font-size:50px;font-weight:bolder;text-align:center"
);
headingElement2 = document.createElement("h2");
headingElement2.textContent =
  "Try to answer the following code-related questions within the time limit.Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
headingElement2.setAttribute("style", "text-align:center;font-size:30px");
buttonStart = document.createElement("button");
buttonStart.textContent = "Start Quiz";
buttonStart.setAttribute(
  "style",
  "background-color:#8e44ad;color:#fff;border-radius:10px;padding:20px 40px;position:absolute;left:40%;margin-top:20px;font-size:30px"
);
headerDiv.append(headingElement);
headerDiv.append(headingElement2);
headerDiv.append(buttonStart);
divContainer.append(headerDiv);
