// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = "https://api.shishkinovich.nomoredomains.work";


function getServerReply(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(getServerReply)
}

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    sameSite: 'none',
  })
    .then(getServerReply)
  // .then((data) => {
  //   if (data.token) {
  //     localStorage.setItem("jwt", data.token);
  //     return data;
  //   }
  // })

};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      'Content-Type': "application/json",
      // 'Authorization': `Bearer ${jwt}`,
    },
  })
    .then(getServerReply)
};