export default class FetchWrapper {
  constructor(private baseURL: string) {}

  get(endpoint: string) {
    return fetch(this.baseURL + endpoint).then((response) => response.json());
  }
}
