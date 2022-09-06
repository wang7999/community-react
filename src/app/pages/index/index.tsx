import { fetchLinkList, fetchList, fetchTopWeek } from "@/api";
import { Cpagination } from "@/app/components/elements/c-pagination";
import { types } from "@/app/constant";
import { IArticle } from "@/app/types";
import React, { Fragment, useEffect, useState } from "react";
import { Badge, Button, Card, Col, Nav, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const tabs = [
  {
    title: "综合",
    key: "",
  },
  {
    title: "未结",
    key: 0,
  },
  {
    title: "已结",
    key: 1,
  },
  {
    title: "精华",
    key: "",
  },
];

export const Index = () => {
  const [list, setList] = useState<IArticle[]>([]);
  const [currTab, setCurrTab] = useState(tabs[0]);
  const [topWeekList, setTopWeekList] = useState<IArticle[]>(); // 周热议列表
  const [linkList, setLinkList] = useState<any[]>([])
  const [tipsList, setTipsList] = useState<any[]>([])

  const { type } = useParams();

  const getArticleList = async (params = {}) => {
    const { data } = await fetchList({
      type,
      status: currTab.key,
      isTop: 0,
      tags: "",
      sort: "createTime",
      pageSize: 20,
      pageNum: 1,
      ...params,
    });
    setList(data.records);
  };
  
  const getTopWeek = async () => {
    const { code, data } = await fetchTopWeek({});
    if (code === 200) {
      setTopWeekList(data);
    }
  };
  const getTipsList = async () => {
    const { code, data } = await fetchLinkList({type: 'tips'});
    if (code === 200) {
      setTipsList(data);
    }
  };
  const getLinkList = async () => {
    const { code, data } = await fetchLinkList({type: 'link'});
    if (code === 200) {
      setLinkList(data);
    }
  };

  useEffect(() => {
    getArticleList();
    getTopWeek();
    getTipsList()
    getLinkList()
  }, []);
  return (
    <Row>
      <Col lg={8}>
        <Card border="0">
          <Card.Header className="bg-white">
            <div className="d-flex align-items-center">
              {tabs.map((tab, index) => (
                <Fragment key={tab.title}>
                  <div
                    className={`py-2 ${tab.title === currTab.title && "text-primary"}`}
                    onClick={() => {
                      setCurrTab(tab);
                      getArticleList({ status: tab.key,tags: tab.title==='精华'?'精华':''});
                    }}
                  >
                    {tab.title}
                  </div>
                  {tabs.length !== index + 1 && (
                    <span className="px-2 text-black-50">|</span>
                  )}
                </Fragment>
              ))}
            </div>
          </Card.Header>
          <Card.Body>
            <div>
              {list.map((item) => (
                <div
                  className="py-3"
                  style={{ borderBottom: "1px dashed #d4d7db" }}
                  key={item._id}
                >
                  <div className="d-flex align-items-center mb-3">
                    <Link
                      to={`/post/detail/${item._id}`}
                      className="fs-5 fw-bolder text-gray-900 me-1 text-decoration-none text-reset"
                    >
                      {item.title}
                    </Link>
                    <div className="tag ">
                      <Badge bg="primary">{types[item.type]}</Badge>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                      <div className="">{item.userInfo.nickName}</div>
                      {item.userInfo.nickName.vip === 1 && (
                        <Badge bg="warning">VIP</Badge>
                      )}
                      <div>{item.createTime}</div>
                      <div>{item.fav}</div>
                    </div>
                    <div>{item.answer}</div>
                  </div>
                </div>
              ))}
              <div className="pt-4"></div>
              <Cpagination />
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4}>
        <Card border="0">
          <Card.Header className="bg-white">签到 | 说明 | 活跃榜</Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-center align-items-center py-3">
              <button type="button" className="btn btn-primary btn-sm me-3">
                今日签到
              </button>
              <span>可获得5个积分</span>
            </div>
          </Card.Body>
        </Card>
        <Card border="0" className="mt-3">
          <Card.Header className="bg-white">本周热议</Card.Header>
          <Card.Body>
            <div className="">
              {topWeekList?.map((item) => (
                <div key={item._id}>
                  <span className="me-2">{item.title}</span>
                  <span>回复{item.answer}</span>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
        <Card border="0" className="mt-3">
          <Card.Header className="bg-white">相关资源</Card.Header>
          <Card.Body>
            <Row md={4}>
            {tipsList.map(item => <Col key={item._id}><Link to={item.link}>{item.title}</Link></Col>)}
            </Row>
          </Card.Body>
        </Card>
        <Card border="0" className="mt-3">
          <Card.Header className="bg-white">帮助</Card.Header>
          <Card.Body>
            <div className="">
            {linkList.map(item => <Link to={item.link} key={item._id}>{item.title}</Link>)}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
