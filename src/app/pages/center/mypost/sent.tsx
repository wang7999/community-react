import { fetchSendPost } from "@/api"
import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"

interface IQueryParams {
  pageNum: number,
  pageSize: number
}

interface IDetails {
  _id: string
  title: string
  isEnd: string
  read: number
  answer: number
  createTime: string
}

export const Sent = () => {
  const [queryParams, setQueryParams] = useState<IQueryParams>({
    pageNum: 1,
    pageSize: 10
  })
  const [tableData, setTableData] = useState<IDetails[]>([])

  const getSendPost = async () => {
    const {code, data} = await fetchSendPost({...queryParams})
    if (code === 200) {
      setTableData(data.records)
    }
  }

  useEffect(() => {
    getSendPost()
  }, [])

  return (
    <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>帖子标题</th>
            <th>结贴</th>
            <th>阅/回</th>
            <th>发表时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => <tr key={index}>
            <td>{queryParams.pageSize *(queryParams.pageNum -1) + index+1}</td>
            <td>{item.title}</td>
            <td>{item.isEnd ? '已结':'未结'}</td>
            <td>{item.read}阅/{item.answer}答</td>
            <td>{item.createTime}</td>
            <td>
              <Button type="button" variant="primary" size="sm" disabled={!!item.isEnd}>编辑</Button>
              <Button type="button" variant="danger" size="sm" className="ms-2">删除</Button>
            </td>
          </tr>)}
        </tbody>
      </Table>
  )
}