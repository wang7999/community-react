import { fetchCommentList, fetchPostDetails } from "@/api";
import { IArticle } from "@/app/types";
import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SVG from "react-inlinesvg";
import { types } from "@/app/constant";
const statusMap: any = {
  0: "未结",
  1: "已结",
  2: "精华",
};
interface IComment {
  _id: string;
  uid: any;
  content: string;
  children: any[];
  createTime: string;
  niceCount: number;
}

const initDetails: any = { userInfo: {} };

const imgPrefix = process.env.REACT_APP_API_URL;

export const PostDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<IArticle>(initDetails);
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [commentTotal, setCommentTotal] = useState(0);

  useEffect(() => {
    getPostDetails();
    getCommentList();
  }, [id]);

  const getPostDetails = async () => {
    const { code, data } = await fetchPostDetails({ tid: id });
    if (code === 200) {
      setDetails(data);
    }
  };

  const getCommentList = async () => {
    const { code, data } = await fetchCommentList({ tid: id });
    if (code === 200) {
      setCommentList(data?.records);
      setCommentTotal(data.total);
    }
  };

  return (
    <Row>
      <Col lg={8}>
        <Card border="0">
          <Card.Body>
            <div className="fs-4 mb-3">{details.title}</div>
            <div className="d-flex justify-content-between mb-3">
              <div>
                <Badge bg="primary" className="me-2">
                  {types[details.type]}
                </Badge>
                <Badge bg="secondary">{statusMap[details.status]}</Badge>
                {!!details.isTop && <Badge bg="dark">置顶</Badge>}
              </div>
              <div className="d-flex">
                <div>
                  <button type="button" className="btn btn-light btn-sm">
                    回复{details.answer}
                  </button>
                </div>
                <div className="ms-2">
                  <button type="button" className="btn btn-light btn-sm">
                    阅读{details.read}
                  </button>
                </div>
              </div>
            </div>
            {/* userinfo */}
            <div className="bg-light d-flex align-items-center p-3">
              <div className="me-2">
                <img
                  className="w-45px h-45px"
                  src={`${imgPrefix}${details.userInfo.pic}`}
                  alt=""
                />
              </div>

              <div className="flex-grow-1">
                <div>
                  <span className="text-primary me-2">
                    {details.userInfo.nickName}
                  </span>
                  <span className="text-secondary">{details.createTime}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-danger">悬赏：{details.fav}积分</div>
                  <div>
                    <button type="button" className="btn btn-light btn-sm">
                      编辑帖子
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                    >
                      <i className="bi bi-bookmark-plus me-1"></i>收藏
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: details.content }}></div>
          </Card.Body>
        </Card>
        <Card className="border-top">
          <Card.Header className="bg-white">回复（{commentTotal}）</Card.Header>
          <Card.Body>
            {commentList.map((item) => (
              <div className="pt-2" key={item._id}>
                <div className="d-flex">
                  <div className="d-inline-block mx-2">
                    <img
                      className="w-32px h-32px"
                      src={imgPrefix + item.uid.pic}
                      alt=""
                    />
                  </div>
                  <div className="flex-fill border-bottom pb-3">
                    <div>
                      {item.uid.nickName}
                      <SVG src={`${process.env.PUBLIC_URL}/svg/IconVip.svg`} />
                    </div>
                    <div
                      className="fs-5"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    ></div>
                    <div className="d-flex justify-content-between align-items-center text-secondary">
                      <div>{item.createTime}</div>
                      <div>
                        <span className="me-2">回复</span>
                        <span>点赞</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4}>
        <Card border="0">
          <Card.Header className="bg-white">本周热议</Card.Header>
          <Card.Body>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
