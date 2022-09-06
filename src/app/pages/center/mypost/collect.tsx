import { fetchCollectPost } from "@/api"
import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"

interface IQueryParams {
  pageNum: number,
  pageSize: number
}

interface IDetails {
  _id: string
  tid: {
    title: string
  }
  createTime: string
}

export const Collect = () => {
  const [queryParams, setQueryParams] = useState<IQueryParams>({
    pageNum: 1,
    pageSize: 10
  })
  const [tableData, setTableData] = useState<IDetails[]>([])

  const getCollectPost = async () => {
    const {code, data} = await fetchCollectPost({...queryParams})
    if (code === 200) {
      setTableData(data.records)
    }
  }

  useEffect(() => {
    getCollectPost()
  }, [])

  return (
    <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>帖子标题</th>
            <th>发表时间</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => <tr key={index}>
            <td>{queryParams.pageSize *(queryParams.pageNum -1) + index+1}</td>
            <td>{item.tid.title}</td>
            <td>{item.createTime}</td>
          </tr>)}
        </tbody>
      </Table>
  )
}