// import Component from "./components/Component";
// import TestModel from "./models/TestModel";
import History from "./components/History";
import "./reset.css";

const app = document.getElementById("app");

const history = new History();
app!.appendChild(history.view);
// const testModel = new TestModel();
// const button = new Component("button", {
//   text: "button",
//   eventListeners: [
//     {
//       type: "click",
//       listener: () => {
//         testModel.addTodo("new element");
//       },
//     },
//   ],
// });
// app!.appendChild(button.view);

// const div = new Component("div");
// testModel.subscribe("console", (data: any[]) => {
//   console.log(data);
//   testModel.unsubscribe("console");
// });
// app!.appendChild(div.view);

// testModel.subscribe("div", (data: any[]) => {
//   div.view.innerText = data.join(", ");
// });

// testModel.getInitialData();
