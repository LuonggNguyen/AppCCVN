export const getObjectTypes = <T extends {}>(object: T, listKeys: (keyof T)[]) =>
  listKeys.reduce((prev, curr) => ({ ...prev, [curr]: object[curr] }), {})
