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


