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

//Fisher–Yates shuffle
export function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];
  }
}
