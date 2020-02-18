export class ApiService {

  async getAllProjects() {
    const response: Response = await fetch(`https://geekhub-frontend-js-9.herokuapp.com/api/projects/`, {
        method: 'GET'
    });
    const json = await response.json();
    return json;
  }

  static async createProject(title: string, company: string, cost: string, deadline: string, assigned: string){

    let data = {
        "title": title,
        "company": company,
        "cost": cost,
        "deadline": deadline,
        "assigned": assigned
    }

    const response: Response = await fetch(`https://geekhub-frontend-js-9.herokuapp.com/api/projects/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const json = await response.json();
    return json;
  }

}