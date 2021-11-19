import { TYPE } from ".prisma/client";

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function getTypes() {
  const types = await TYPE;
  return Object.keys(types).map((key) => {
    return {
      id: key,
      name: capitalizeFirstLetter(key),
    };
  });
}
