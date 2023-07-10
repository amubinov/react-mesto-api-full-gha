// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = "https://api.shishkinovich.nomoredomains.work";


function getServerReply(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(getServerReply);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    //записываются в приложение куки
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    sameSite: 'none',
  })
    .then(getServerReply)
    .then((data) => {
      localStorage.setItem('userId', data._id)
      return data;
    }
    )
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(getServerReply);
};
