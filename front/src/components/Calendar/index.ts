import Component from "../Component";
import Calendar from "./Calendar";

const url = "http://localhost:3000";

type apiResponse = {
  success: boolean;
  data: any | any[];
};

export default class CalendarPage extends Component {
  year: number;
  month: number;

  constructor() {
    super();
    const now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth() + 1;

    this.view = document.createElement("div");
    this.view.id = "calendar";
    this.view.className = "calendar";

    this.fetchData();
  }

  fetchData(): void {
    fetch(`${url}/api/histories/daily/1/1`, {
      mode: "cors",
      method: "GET",
    })
      .then((res) => res.json())
      .then((res: any) => {
        if (res.success) {
          this.appendChild(new Calendar(this.year, this.month, res.data.data));
        } else {
          this.appendChild(new Calendar(this.year, this.month));
        }
      });
  }
}
