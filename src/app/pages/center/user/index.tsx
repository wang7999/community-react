import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const CenterUser = () => {
  return (
    <Card border="0">
      <Card.Body>
      <Row>
        <Col>
          <Card>
            <Card.Header className="bg-white">我的会员信息</Card.Header>
            <Card.Body>
              <div>积分经验值：6</div>
              您当前为：非VIP
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header className="bg-white">签到</Card.Header>
            <Card.Body>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-3">
            <Card.Header className="bg-white">快捷方式</Card.Header>
            <Card.Body>
              <Row>
                <Col lg={3}><Link to={'/'}>修改信息</Link></Col>
                <Col lg={3}><Link to={'/'}>修改头像</Link></Col>
                <Col lg={3}><Link to={'/'}>修改密码</Link></Col>
                <Col lg={3}><Link to={'/'}>发布新帖</Link></Col>
                <Col lg={3}><Link to={'/'}>我的收藏</Link></Col>
                <Col lg={3}><Link to={'/'}>我的帖子</Link></Col>
              </Row>
            </Card.Body>
          </Card>
          </Card.Body>
    </Card>
  );
};
