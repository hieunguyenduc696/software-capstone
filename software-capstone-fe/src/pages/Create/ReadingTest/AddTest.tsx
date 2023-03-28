import React from "react";
import styles from './AddTest.module.css';
import { Row, Col } from "antd";

const AddingTestPage = () => {
  return (
    <div className={styles.container}>

      <Row>
        <Col className={styles.header} span={24}>Header</Col>
      </Row>
      <Row>
        <Col className={`${styles.column} ${styles.left}`} span={12}>1</Col>
        <Col className={styles.column} span={12}>
          <div className={styles.questionHeader}>
            Question 1 - 7 
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddingTestPage;
