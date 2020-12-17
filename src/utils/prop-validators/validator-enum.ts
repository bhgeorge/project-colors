export default (validOptions: Array<string>) => ({
  validator: (value: string) => validOptions.includes(value),
});
