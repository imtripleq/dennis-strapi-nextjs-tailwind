export function renderButtonStyle(type: string) {
  switch (type) {
    case "primary":
      return "px-8 py-3 text-lg font-semibold border rounded-3xl dark:border-gray-100 text-white bg-primary";
    case "secondary":
      return "px-8 py-3 text-lg font-semibold border rounded-3xl dark:border-gray-100 text-primary bg-white";
    default:
      return "px-8 py-3 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900";
  }
}
