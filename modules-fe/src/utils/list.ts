export const reorderList = <T>(
  list: T[],
  startIndex: number,
  endIndex: number,
) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const addToList = <T>(list: T[], index: number, item: T) => {
  const items = Array.from(list)
  items.splice(index, 0, item)

  return items
}

export const removeFromList = <T>(list: T[], index: number) => {
  const items = Array.from(list)
  items.splice(index, 1)

  return items
}

export const pickProperties = <T, K extends keyof T>(
  objects: T[],
  properties: K[],
): Pick<T, K>[] =>
  objects.map(object => {
    const pickedProperties = {} as Pick<T, K>
    properties.forEach(property => {
      pickedProperties[property] = object[property]
    })
    return pickedProperties
  })
