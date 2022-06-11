export const getTreeArr = (obj: any) => {
  if (!Array.isArray(obj.data)) {
    console.log('getTreeArr=>请传入数组')
    return []
  }
  obj.jsonData = obj.jsonData === false ? obj.jsonData : true
  const arr = obj.jsonData ? JSON.parse(JSON.stringify(obj.data)) : obj.data
  const arr1: any[] = []
  // 将数据处理成数状结构
  arr.forEach((item: { [x: string]: any; children?: any[] }) => {
    let index = 0
    item.children = []
    arr.forEach((item1: { [x: string]: any }) => {
      // 得到树结构关系
      if (item[obj.key] === item1[obj.pKey]) {
        item.children?.push(item1)
      }
      // 判断根节点
      if (item1[obj.key] !== item[obj.pKey]) {
        index++
      }
    })
    // 没传入根节点，根据当前数据结构得到根节点
    if (!('rootPValue' in obj) && index === arr.length) {
      arr1.push(item)
    }
    if (!item.children.length) delete item.children
  })
  // 传入根节点，根据传入的根节点组成树结构
  if ('rootPValue' in obj) {
    arr.forEach((item: { [x: string]: any }) => {
      if (item[obj.pKey] === obj.rootPValue) {
        arr1.push(item)
      }
    })
  }
  return arr1
}
