import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import AINotes from "./AINotes.jsx";
import AIQuestion from "./AIQuestion.jsx";
import ImageNotes from "./ImageNotes.jsx";
import Save from "./Save.jsx";
import PDF from "./PDF.jsx";
import Quiz from "./Quiz.jsx";
import Progress from "./Progress.jsx";
import Premium from "./Premium.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";

const path = window.location.pathname;

let Page = App;

if (path === "/ai-notes") {
  Page = AINotes;
}

if (path === "/ask") {
  Page = AIQuestion;
}

if (path === "/image-notes") {
  Page = ImageNotes;
}

if (path === "/save") {
  Page = Save;
}

if (path === "/pdf") {
  Page = PDF;
}

if (path === "/quiz") {
  Page = Quiz;
}

if (path === "/progress") {
  Page = Progress;
}

if (path === "/premium") {
  Page = Premium;
}

if (path === "/login") {
  Page = Login;
}

if (path === "/dashboard") {
  Page = Dashboard;
}

createRoot(document.getElementById("root")).render(
  <Page />
);