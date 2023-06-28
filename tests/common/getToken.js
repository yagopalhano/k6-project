import http from 'k6/http';

export function gerarToken(data) {
  let url = `${data.SETTINGS.baseUrlAuth}/connect/token`;
  const formData = {
    client_id: 'webz',
    client_secret: data.SETTINGS.client_secret,
    grant_type: 'client_credentials',
    cookie: data.SETTINGS.cookie
  }
  let headers = {
    'Authorization': data.SETTINGS.authorization,
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  let res = http.post(url, formData, { headers: headers });
  return (res.json('access_token'));
}

