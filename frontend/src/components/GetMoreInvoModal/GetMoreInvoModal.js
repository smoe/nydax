import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { Modal as BSModal, Row, Col } from 'react-bootstrap';
import Button from '../Button';
import Modal from '../Modal';
import prize from '../InviteFriends/prize.png';
import C from '../../constants/actions';
import s from './GetMoreInvoModal.css';
/* eslint-disable css-modules/no-undef-class */

class GetMoreInvoModal extends React.Component {
  render() {
    return (
      <Modal
        className="inivteFriendsModal"
        show={this.props.show}
        onHide={() => this.props.showToggle()}
      >
        <BSModal.Header closeButton />
        <BSModal.Body style={{ padding: 40, paddingTop: 0 }}>
          <div>
            <p className={s.headerTitle}>Get Free Invo</p>
            <br />
            <Row>
              <Col xs={4}>
                <img src={prize} alt="" />
              </Col>
              <Col xs={8}>
                <p className={s.description}>
                  You can get more Invo for free (equivanlent of $25) by
                  submitting your identity information.
                </p>
                <br />
                <div style={{ width: '60%', margin: 'auto' }}>
                  <Button
                    width="100%"
                    onClick={() => {
                      this.props.showToggle();
                      this.props.showVerifyIdentityModalToggle();
                    }}
                  >
                    Submit Identity Info
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

GetMoreInvoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  showToggle: PropTypes.func.isRequired,
  showVerifyIdentityModalToggle: PropTypes.func.isRequired,
};

const mapState = state => ({
  show: state.showGetMoreInvoModal,
});

const mapDispatch = dispatch => ({
  showToggle() {
    dispatch({ type: C.TOGGLE_SHOW_GET_MORE_INVO_MODAL });
  },
  showVerifyIdentityModalToggle() {
    dispatch({ type: C.TOGGLE_SHOW_VERIFY_IDENTITY_MODAL });
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(GetMoreInvoModal));
export const WithoutRedux = withStyles(s)(GetMoreInvoModal);
