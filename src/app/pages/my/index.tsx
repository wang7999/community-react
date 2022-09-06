import { fetchCommentLately, fetchPostLately, fetchUserInfo } from "@/api";
import { RootState } from "@/app/stores";
import { useAppSelector } from "@/app/stores/hooks";
import { IArticle, IComment } from "@/app/types";
import { IUser } from "@/app/types/user";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

const imgPrefix = process.env.REACT_APP_API_URL;

export const My = () => {
  // const userInfo: IUser = useAppSelector((state: RootState) => state.user.userInfo)
  const [userInfo, setUserInfo] = useState<IUser>({
    pic: "",
  });

  const [posts, setPosts] = useState<IArticle[]>([]);
  const [comments, setPostComments] = useState<IComment[]>([]);

  useEffect(() => {
    getUserInfo();
    getPostLately();
    getCommentLately();
  }, []);

  const getUserInfo = async () => {
    const { code, data } = await fetchUserInfo({});
    if (code === 200) {
      setUserInfo(data);
    }
  };

  const getPostLately = async () => {
    const { code, data } = await fetchPostLately({});
    if (code === 200) {
      setPosts(data);
    }
  };
  const getCommentLately = async () => {
    const { code, data } = await fetchCommentLately({});
    if (code === 200) {
      setPostComments(data);
    }
  };

  return (
    <>
      <Card className="mb-2">
        <Card.Body>
          <div className="d-flex flex-column align-items-center">
            <div>
              <img width={120} src={`${imgPrefix}${userInfo.pic}`} alt="" />
            </div>
            <div>{userInfo.nickName} vip</div>
            <div>{userInfo.favs}积分</div>
            <div>{userInfo.createTime}加入</div>
          </div>
        </Card.Body>
      </Card>
      <Row>
        <Col lg={6}>
          <Card>
            <Card.Header className="bg-white">最近的提问</Card.Header>
            <Card.Body>
              <div>
                {posts.map((item) => (
                  <div className="d-flex flex-column align-items-center">
                    {item.title}
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <Card.Header className="bg-white">最近的回答</Card.Header>
            <Card.Body>
              <div>
                {comments.map((item) => (
                  <div className="d-flex flex-column align-items-center">
                    {item.content}
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
