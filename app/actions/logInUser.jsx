import CallApi from "../instance/api";

export default function checkUser(user) {
  const username = document.getElementById("formUser");
  const pass = document.getElementById("formPass");

  CallApi()
    .get("/users.json")
    .then((res) => {
      const dt = Object.values(res.data).find(
        (item) => item.title === username.value && item.pss === pass.value
      );
      dt && user(dt.title, dt.token, dt.ability);
    })
    .catch((err) => console.log(err));
}
