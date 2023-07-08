import { Button, Col, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ImagesUrl } from '../../helpers/AppConstants';
import './Home.css'

const mainBanner: React.CSSProperties = {
  textAlign: 'center',
  width: '40%'
}

const imageStyle: React.CSSProperties = {
  width: '15%',
  padding: '4%'
};


const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* <AppBreadcrumb path="Home"/> */}
      <Row className="bannerWrapper">
        <Col span={8}>
          <h1 className="titleStyle">Ψωνίστε στις καλύτερες τιμές της αγοράς</h1>

          <p className="titleDescription">Σας βοηθάμε να συγκρίνετε τις τιμές από όλες τις μεγάλες αλυσίδες super-market και να κάνετε την παραγγελία σας συνδιάζοντας τις καλύτερες τιμές</p>

          <Button type="primary" onClick={()=>navigate("/products")} block={true} size={"large"} className="bannerButton">Παράγγειλε Τώρα</Button>
          
        </Col>
        <Col span={16} style={{textAlign:'center'}}>
          <img style={mainBanner} src={ImagesUrl + "grocery.jpg"} alt="NA"></img>
        </Col>
      </Row>

      <Row className="contentStyle">
        <Col span={24}>
          <h1>Μας εμπιστεύονται οι καλύτερες αλυσίδες supermarket</h1>
          <div>
            <img src={ImagesUrl + "/ab_stores.png"} style = {imageStyle} alt="NA"></img>
            <img src={ImagesUrl + "sklavenitis_stores.png"} style = {imageStyle}  alt="NA"></img>
            <img src={ImagesUrl + "lidl_stores.png"} style = {imageStyle}  alt="NA"></img>
            <img src={ImagesUrl + "kritikos_stores.png"} style = {imageStyle}  alt="NA"></img>
          </div>
        </Col>
      </Row>
      
    </div>
  );
}

export default Home;