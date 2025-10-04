export default function RandomLinkGenerator(length: number) {
  try {
    let randomString = "";
    const letter =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPGRSTUVWZYZ123456789";
    for (let i: number = 0; i <= length; i++) {
      randomString += letter.charAt(Math.floor(Math.random() * letter.length));
    }
    return randomString;
  } catch (error) {
    console.log("Error At Random Function");
  }
}
