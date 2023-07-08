import { Alert, Col, Row, Spin } from "antd";

export interface ILoaderProps{
    tip?: string;
    message?: string;
    description?: string;
}

const Loader = (props: ILoaderProps) => {
  return (
      <Row>
        <Col span={20} offset={2}>
        <Spin tip={props.tip ?? "Παρακαλώ περιμένετε"} className="spiner-loader">
          <Alert
            message={props.message}
            description={props.description}
            type="info"
          />
        </Spin>
        </Col>
      </Row>
  );
};

export default Loader;
