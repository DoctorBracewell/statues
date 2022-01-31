async function getFileSkinData() {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(document.querySelector("#skin").files[0]);

    fileReader.addEventListener("load", (event) =>
      resolve(event.target.result)
    );

    fileReader.addEventListener("error", (error) => reject(error));
  });
}

async function getMojangSkinData(username) {
  const {
    textures: {
      skin: { data },
    },
  } = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`).then(
    (res) => res.json()
  );

  return data;
}

export async function getSkinData() {
  if (document.querySelector("#skin").disabled)
    return await getMojangSkinData(document.querySelector("#username").value);

  return await getFileSkinData();
}
