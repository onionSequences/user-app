export const getUsers = () => {
  fetch("https://user-app-3b106-default-rtdb.firebaseio.com/data.json")
    .then(data => data.json())
    .then(results => {
      for (const res in results) {
        console.log(results[res]);
      }
    });
};
