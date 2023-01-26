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
