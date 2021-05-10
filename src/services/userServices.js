const baseUrl = "https://user-app-3b106-default-rtdb.firebaseio.com/data";

export const getUsers = setState => {
  fetch(`${baseUrl}.json`)
    .then(data => data.json())
    .then(results => {
      const newUsers = [];

      for (const res in results) {
        newUsers.push({
          ...results[res],
          id: res,
        });
      }

      setState(newUsers);
    });
};

export const addUser = (user, setState) => {
  fetch(`${baseUrl}.json`, {
    method: "POST",
    body: JSON.stringify(user),
  }).then(data => data.status === 200 && getUsers(setState));
};

export const deleteUser = (id, setState) => {
  fetch(`${baseUrl}/${id}.json`, {
    method: "DELETE",
  }).then(data => data.status === 200 && getUsers(setState));
};

export const editUser = (user, setState) => {
  fetch(`${baseUrl}/${user.id}.json`, {
    method: "PATCH",
    body: JSON.stringify(user),
  }).then(data => data.status === 200 && getUsers(setState));
};
