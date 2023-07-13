import { Button, Col, List, Row, Space } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ImagesUrl } from '../../helpers/AppConstants';
import './Home.css'
import { CheckCircleTwoTone } from '@ant-design/icons';

const mainBanner: React.CSSProperties = {
  textAlign: 'center',
  width: '40%'
}

const imageStyle: React.CSSProperties = {
  width: '15%',
  padding: '4%'
};

const studentProsData = [
  {
    title: 'Λύσε εύκολα και γρήγορα τα τεστ που σου έχουν ανατεθεί.',
  },
  {
    title: 'Μάθε άμεσα τα αποτελέσματα σου.',
  },
  {
    title: 'Δες την κατάταξη σου ανάμεσα σε άλλους.',
  }
];

const teacherProsData = [
  {
    title: 'Οργάνωσε τις ερωτήσεις σου.',
  },
  {
    title: 'Αποθήκευσε ερωτήσεις εύκολα και γρήγορα.',
  },
  {
    title: 'Δημιούργησε τεστ αυτόματα.',
  },
  {
    title: 'Aνέθεσε τα τεστ που δημιούργησες σε άτομα για να δεις τις ικανότητες τους.'
  }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="title">AutoQuizzer</h1>
      <Row className="bannerWrapper">

        <Col span={12}>
          <h2 className="titleStyle" style={{textAlign:'center'}}>Είσαι εργαζόμενος ή μαθητής;</h2>

          <List
            itemLayout="horizontal"
            split = {false}
            dataSource={studentProsData}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<Space><CheckCircleTwoTone twoToneColor="#52c41a"/> <h3>{item.title}</h3></Space>}
                />
              </List.Item>
            )}
          />
          
          {/* <Button type="primary" onClick={()=>navigate("/tests")} block={true} size={"large"} className="bannerButton">Τεστ</Button> */}
        </Col>
        
        <Col span={12}>
        <h2 className="titleStyle" style={{textAlign:'center'}}>Είσαι εκπαιδευτής;</h2>
        <List
            style={{textAlign:'left'}}
            itemLayout="horizontal"
            split = {false}
            dataSource={teacherProsData}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<Space><CheckCircleTwoTone twoToneColor="#52c41a"/> <h3>{item.title}</h3></Space>}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
}

export default Home;