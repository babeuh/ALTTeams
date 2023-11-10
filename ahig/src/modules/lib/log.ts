export const log = (service: string, message: string, color: string = "purple") => {
  if (process.env.NODE_ENV === "production") return;
  return console.log(`%c[${service}]`, `color: ${color}`, message);
};
