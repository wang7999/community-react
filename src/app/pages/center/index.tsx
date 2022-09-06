import { Card, Col, Nav, Row } from "react-bootstrap";
import { Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { CenterUser } from "./user";

export const Center = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const defaultActiveKey = location.pathname
  return (
    <Card border="0">
      <div className="d-flex">
        <div className="w-220px">
        <Nav variant="pills" className="flex-column" defaultActiveKey={defaultActiveKey} onSelect={((key) => navigate(key ||''))}>
            <Nav.Item>
              <Nav.Link eventKey="/center/my">我的主页</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/center/user">用户中心</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/center/base">基本设置</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/center/mypost">我的帖子</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/center/message">我的消息</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="flex-fill">
          <Outlet />
        </div>
      </div>
    </Card>
  );
};
