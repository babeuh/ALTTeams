export let log = (service: string, message: string) => {
  return console.log(`%c[${service}]`, "color: purple", message);
};
