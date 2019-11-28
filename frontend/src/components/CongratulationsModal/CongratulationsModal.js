import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Modal as BSModal, Row, Col } from 'react-bootstrap';
import Button from '../Button';
import Modal from '../Modal';
import prize from '../InviteFriends/prize.png';
import s from './CongratulationsModal.css';
/* eslint-disable css-modules/no-undef-class */

class CongratulationsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: !props.congratulationsModalSeen,
    };
  }
  render() {
    return (
      <Modal
        className="inivteFriendsModal"
        show={this.props.congratulationsModalSeen && this.state.show}
        onHide={() => this.setState({ show: false })}
      >
        <BSModal.Header closeButton />
        <BSModal.Body style={{ padding: 40, paddingTop: 0 }}>
          <div>
            <p className={s.headerTitle}>Congratulations!</p>
            <br />
            <Row>
              <Col xs={4}>
                <img src={prize} alt="" />
              </Col>
              <Col xs={8}>
                <p className={s.description}>
                  Welcome to NYDAX. Thank you for joining us in our airdrop
                  phase. You can get free invo (equivalent of $25) after
                  submitting your identity information.
                </p>
                <br />
                <div style={{ width: '60%', margin: 'auto' }}>
                  <Button
                    width="100%"
                    onClick={() => {
                      this.setState({ show: false });
                    }}
                  >
                    Cool!
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </BSModal.Body>
      </Modal>
    );
  }
}

CongratulationsModal.propTypes = {
  congratulationsModalSeen: PropTypes.bool.isRequired,
};

const mapState = state => ({
  congratulationsModalSeen: state.congratulationsModalSeen,
});

export default connect(mapState)(withStyles(s)(CongratulationsModal));
export const WithoutRedux = withStyles(s)(CongratulationsModal);
