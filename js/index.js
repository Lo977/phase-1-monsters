document.addEventListener("DOMContentLoaded", (e) => {
  let monsterContainer = document.getElementById("monster-container");
  let url = "http://localhost:3000/monsters";
  let forward = document.getElementById("forward");
  let back = document.getElementById("back");

  back.disabled = true;

  let startNum = 0;
  let endNum = 50;

  function getAllData() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let dataNums = data.slice(startNum, endNum);
        dataNums.forEach((monster) => renderCard(monster));
      });
  }

  function renderCard(monster) {
    let card = document.createElement("div");
    card.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age : ${monster.age}</h4>
        <p>Description : ${monster.description}</p>
        `;
    monsterContainer.append(card);
  }

  function creatForm() {
    let form = document.createElement("form");
    form.innerHTML = `
   <input id="name" placeholder="name...">
   <input id="age" placeholder="age...">
   <input id="description" placeholder="description...">
   <button>Create</buton>
   `;
    document.getElementById("create-monster").appendChild(form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSubmit(e);
      form.reset();
    });
  }

  function handleSubmit(e) {
    let monsterObj = {
      name: e.target.name.value,
      age: e.target.age.value,
      description: e.target.description.value,
    };
    fetch(url, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(monsterObj),
    });
  }
  forward.addEventListener("click", () => {
    monsterContainer.innerHTML = "";
    back.disabled = false;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        startNum += 50;
        endNum += 50;
        let dataNums = data.slice(startNum, endNum);
        dataNums.forEach((monster) => renderCard(monster));
      });
  });
  back.addEventListener("click", () => {
    monsterContainer.innerHTML = "";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (startNum >= 50) {
          startNum -= 50;
          endNum -= 50;
          let dataNums = data.slice(startNum, endNum);
          dataNums.forEach((monster) => renderCard(monster));
        }
        if (startNum <= 0) {
          back.disabled = true;
        }
      });
  });

  function ini() {
    creatForm();
    getAllData();
  }
  ini();
});
