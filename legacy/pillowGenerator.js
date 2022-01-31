import {
  createHeadData,
  fallingSand,
  summonOffsets,
  equipmentArray,
  createArmorStandData,
  nameStandPositions,
  createInitialData,
} from "./nbtData.js";

// ENTRY POINT - this command takes arrays of skin data and runs functions in sequences to generate the single command to spawn the pillow.
export function generateCommand(skin) {
  const headSize = document.querySelector("input[name='size']:checked").value;
  const cubeArray = createCubeArray(skin, headSize);

  // Generate command
  const command = `/summon FallingSand ~ ~1 ~ {${generateNbtString(
    createInitialData(
      cubeArray.length,
      walkArray(cubeArray, cubeArray, headSize)
    )
  )}}`;

  document.querySelector(".progress").style.display = "none";
  document.querySelector("#output").textContent = command;
}

// Map the each array of skins onto the respective body party and return an array with the cords of each cube and its skin data
function createCubeArray({ body, leftArm, rightArm, head }, size) {
  const headSizeValue = size === "normal" ? 0.25 : 0.59;

  // Represent the pillow as a 3D grid, where each cube is 0.25 units length/width/height
  // Each cube also has its skin data associated with it - ID and texture value

  // So we make an array that has the cubeData of each cube in the pillow, starting from 0 0 0 and going up to 1 2 1 (to represent the footprint of the pillow)
  let cubeArray = [];

  // Repetition is nice thought, so lets split the body into cuboids to build up the array easily:

  // 6x2*1 Body Cuboid:
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 6; j++) {
      cubeArray.push({
        x: headSizeValue + headSizeValue * i, // for each Y value, we want one cube at 0.25 and one at 0.5
        y: headSizeValue * j, // One cube for 6 increases of 0.25
        z: 0.375, //Z is always (1-0.25)/2 = 0.375 since the cube must be directly in the middle, so it must start with an offset of 0.375.
        skin: body[j + i * 6],
        name: {
          active: false,
          value: "",
        },
      });
    }
  }

  // 3x1*1 Arm 1
  for (let i = 0; i < 3; i++) {
    cubeArray.push({
      x: 0,
      y: 3 * headSizeValue + i * headSizeValue,
      z: 0.375,
      skin: leftArm[i],
      name: {
        active: false,
        value: "",
      },
    });
  }

  // 3x1*1 Arm 2
  for (let i = 0; i < 3; i++) {
    cubeArray.push({
      x: 3 * headSizeValue,
      y: 3 * headSizeValue + i * headSizeValue,
      z: 0.375,
      skin: rightArm[i],
      name: {
        active: false,
        value: "",
      },
    });
  }

  // 2*2*2 head
  // We use an index tracker here because I can't work out a forumla to turn i,j,k into an incrementing variable
  let indexTracker = 0;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        cubeArray.push({
          x: headSizeValue + i * headSizeValue,
          y: 6 * headSizeValue + j * headSizeValue,
          z: (size === "normal" ? headSizeValue : 0.08) + k * headSizeValue,
          skin: head[indexTracker],
          name: {
            active: false,
            value: "",
          },
        });
        indexTracker++;
      }
    }
  }

  // Finally add a command to summon a named armor stand
  if (document.querySelector("#name").value)
    cubeArray.push({
      x: nameStandPositions[size].x,
      y: nameStandPositions[size].y,
      z: nameStandPositions[size].z,
      skin: false,
      name: {
        active: true,
        value: document.querySelector("#name").value + "&r",
      },
    });

  // Then send it over to be generated into a command
  return cubeArray;
}

// Recursive function to create the falling sand entity
function walkArray(arr, fullArr, size) {
  const normalSized = size === "normal";

  // Create copy of falling sand data and add the command to summon the armor stand
  const fallingSandData = [...fallingSand];

  fallingSandData.push({
    type: "tree",
    key: "TileEntityData",
    value: [
      {
        type: "node",
        key: "Command",
        value: `\"${calculateSummonCommand(
          arr[0],
          fullArr,
          size,
          normalSized
        )}\"`,
      },
    ],
  });

  // Only add a riding falling sand if it's not the last one in the array
  if (arr.length > 1)
    fallingSandData.push({
      type: "tree",
      key: "Riding",
      value: walkArray(arr.slice(1), fullArr, size),
    });

  return fallingSandData;
}

// Uses data from nbtData.js to calculate the command to summon the armor stand
function calculateSummonCommand(cubeData, cubeArray, size, normalSized) {
  const index = cubeArray.indexOf(cubeData);

  // Remove 0.5 blocks from each cord to account for the CMB summoning it in centre
  // And remove other amount from the offset of the armor stand holding it in a specific position
  const x = cubeData.x + 0.5 - 0.05 + summonOffsets[size].x;
  const y =
    (cubeArray.length - index - cubeData.y) * -1 - 0.5 + summonOffsets[size].y;
  const z = cubeData.z - 0.5 + summonOffsets[size].z;

  // Generate NBT data for both the armor stand and the head to go on top
  const armorStandData = createArmorStandData(normalSized, cubeData.name);
  const headData = createHeadData(cubeData.skin);

  // Make the stand either hold or wear the head depending on size
  if (cubeData.skin)
    armorStandData.push({
      type: "array",
      key: "Equipment",
      value: normalSized
        ? [headData, ...equipmentArray]
        : [...equipmentArray, headData],
    });

  // Then finall return the command with the positioning and NBT data
  return `/summon ArmorStand ~${x} ~${y} ~${z} {${generateNbtString(
    armorStandData
  )}}`;
}

// Parser for abstract syntax tree to generate Minecraft nbt data string
/* Example Input:
[{
  type: "node"
  key: "Block",
  value: "redstone_block"
},
{
  type: "tree"
  key: "Riding",
  value: [{
    type: "node",
    key: "Block",
    value: "command_block"
  },{
    type: "array",
    key: "textures",
    value: [{
      type: "node",
      key: "Value",
    },
  {
    type: "value",
    value: 1
  }]
}]
*/

export function generateNbtString(nbtData) {
  return nbtData.reduce((acc, node, index) => {
    const endingString = index === nbtData.length - 1 ? "" : ",";

    if (node.type === "value") return acc + node.value + endingString;
    if (node.type === "node")
      return acc + `${node.key}:${node.value}` + endingString;
    if (node.type === "tree")
      return (
        acc + `${node.key}:{${generateNbtString(node.value)}}` + endingString
      );
    if (node.type === "array")
      return (
        acc + `${node.key}:[${generateNbtString(node.value)}]` + endingString
      );
  }, "");
}
