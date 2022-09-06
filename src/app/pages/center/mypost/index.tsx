import { Card, Tab, Tabs } from "react-bootstrap";
import { Collect } from "./collect";
import { Sent } from "./sent";

export const CenterMypost = () => {
  return (
    <Card border="0">
      <Card.Body>
      <Tabs
      defaultActiveKey="sent"
      className="mb-3"
    >
      <Tab eventKey="sent" title="我发的贴">
        <Sent />
      </Tab>
      <Tab eventKey="collect" title="我收藏的贴">
        <Collect />
      </Tab>
    </Tabs>
      </Card.Body>
    </Card>
  );
};
