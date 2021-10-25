function createCubeArray({ body, leftArm, rightArm, head }) {
  console.log(body, leftArm, rightArm, head);
  // Represent the pillow as a 3D grid, where each cube is 0.25 units length/width/height
  // Each cube also has its skin data associated with it - ID and texture value

  // So we make an array that has the cubeData of each cube in the pillow, starting from 0 0 0 and going up to 1 2 1 (to represent the footprint of the pillow)
  let cubeArray = [];

  // Repetition is nice thought, so lets split the body into cuboids to build up the array easily:

  // 6x2*1 Body Cuboid:
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 6; j++) {
      cubeArray.push({
        x: 0.25 + 0.25 * i, // for each Y value, we want one cube at 0.25 and one at 0.5
        y: 0.25 * j, // One cube for 6 increases of 0.25
        z: 0.375, //Z is always (1-0.25)/2 = 0.375 since the cube must be directly in the middle, so it must start with an offset of 0.375.
        skin: body[j + i * 6],
      });
    }
  }

  // 3x1*1 Arm 1
  for (let i = 0; i < 3; i++) {
    cubeArray.push({
      x: 0,
      y: 0.75 + i * 0.25,
      z: 0.375,
      skin: leftArm[i],
    });
  }
  // 3x1*1 Arm 2
  for (let i = 0; i < 3; i++) {
    cubeArray.push({
      x: 0.75,
      y: 0.75 + i * 0.25,
      z: 0.375,
      skin: rightArm[i],
    });
  }

  // 2*2*2 head
  // We use an index tracker here because I can't work out a forumla to turn i,j,k into an incrementing variable
  let indexTracker = 0;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        cubeArray.push({
          x: 0.25 + i * 0.25,
          y: 1.5 + j * 0.25,
          z: 0.25 + k * 0.25,
          skin: head[indexTracker],
        });
        indexTracker++;
      }
    }
  }

  // Finally add a command to summon a named armor stand
  if (document.querySelector("#name").value)
    cubeArray.push({
      x: -0.45,
      y: 0.8,
      z: 0.8,
      name: document.querySelector("#name").value + "&r",
    });

  // Then send it over to be generated
  return cubeArray;
}

// Recursive function to create the riding command
function walkArray(arr, fullArr) {
  if (arr.length === 0) return "";

  return (
    `Riding:{id:\"FallingSand\",Block:command_block,Data:0,TileEntityData:{Command:\"${calculateSummonCommand(
      arr[0],
      fullArr
    )}\"},Time:1,DropItem:0,` +
    walkArray(arr.slice(1), fullArr) +
    "}"
  );
}

// Use the co-ordinates to calculate the offset the stand needs to be summoned at
function calculateSummonCommand(cubeData, cubeArray) {
  const index = cubeArray.indexOf(cubeData);

  // Remove 0.5 blocks from each cord to account for the CMB summoning it in centre
  // And remove other amount from the offset of the armor stand holding it in a specific position
  const x = cubeData.x + 0.5 - 0.05;
  const y = (cubeArray.length - index - cubeData.y) * -1 - 0.5 - 0.9;
  const z = cubeData.z - 0.5 - 0.3;

  return `/summon ArmorStand ~${x} ~${y} ~${z} {${
    cubeData?.name
      ? `CustomName:\\"${cubeData.name}\\",CustomNameVisible:1b,`
      : ""
  }NoGravity:1b,Invisible:1b,Invulnerable:1b,Pose:{RightArm:[-45.0f,45.0f,0.0f]},ShowArms:1b${
    cubeData?.skin?.id
      ? `,Equipment:[{id:\\"skull\\",Count:1b,Damage:3s,tag:{SkullOwner:{Id:\\"${cubeData.skin.id}\\",Properties:{textures:[{Value:\\"${cubeData.skin.value}\\"}]}}}},{},{},{},{}]`
      : ""
  }}`;
}

export function generateCommand(skin) {
  const cubeArray = createCubeArray(skin);

  // Setup intial command
  const initialCommand = `/summon FallingSand ~ ~1 ~ {Block:redstone_block,Data:0,Time:1,DropItem:0,Riding:{id:\"FallingSand\",Block:command_block,Data:0,TileEntityData:{Command:\"/fill ~1 ~-1 ~ ~1 ~-${
    cubeArray.length + 1
  } ~ redstone_block\"},Time:1,DropItem:0,Riding:{id:"FallingSand",Block:command_block,Data:0,TileEntityData:{Command:"/fill ~1 ~2 ~ ~ ~-${
    cubeArray.length + 1
  } ~ air"},Time:1,DropItem:0,`;

  document.querySelector(".progress").style.display = "none";
  document.querySelector("#output").textContent =
    initialCommand + walkArray(cubeArray, cubeArray) + "}}}";
}
