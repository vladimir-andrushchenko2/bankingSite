const BASE_URL = 'http://localhost:3000';

class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async makeRequest({ path, body, method = 'GET' }) {
    const config = {
      headers: this.headers,
      method,
      body: JSON.stringify(body),
    };

    const res = await fetch(`${this.baseUrl}${path}`, config);

    if (res.ok) {
      const json = await res.json();

      if (json.error.length > 0) {
        return Promise.reject(new Error(json.error));
      }

      return json.payload;
    }

    return Promise.reject(
      new Error(`promise rejected with status ${res.status}
      ${this.baseUrl}${path}`)
    );
  }

  logout() {
    delete this.headers.Authorization;
    localStorage.removeItem('Authorization');
  }

  async postLogin({ login, password }) {
    const path = '/login';

    return this.makeRequest({
      path,
      body: {
        login,
        password,
      },
      method: 'POST',
    }).then(({ token }) => {
      this.headers.Authorization = `Basic ${token}`;

      localStorage.setItem('Authorization', this.headers.Authorization);

      return { ok: true };
    });
  }

  getAccounts() {
    const path = '/accounts';

    return this.makeRequest({ path });
  }

  getAccount({ id }) {
    const path = `/account/${id}`;

    return this.makeRequest({ path });
  }

  postCreateAccount() {
    const path = '/create-account';

    return this.makeRequest({ path, method: 'POST' });
  }

  getCurrencies() {
    const path = '/currencies';

    return this.makeRequest({ path });
  }

  postTransferFunds({ from, to, amount }) {
    const path = '/transfer-funds';

    return this.makeRequest({
      path,
      method: 'POST',
      body: {
        from,
        to,
        amount,
      },
    });
  }
}

export default new Api(BASE_URL, {
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem('Authorization'),
});
