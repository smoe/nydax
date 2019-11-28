/* eslint-disable react/no-unescaped-entities */
/* eslint-disable css-modules/no-unused-class */
import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Modal as BSModal,
  Button,
  FormGroup,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import copy from 'copy-to-clipboard';
import { toastr } from 'react-redux-toastr';
import TagsInput from 'react-tagsinput';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { sendInvitations } from '../../actions/user';
import { validateEmail } from '../../validation';
import Modal from '../Modal';
import config, { host } from '../../config';
import s from './InviteFriends.css';
import C from '../../constants/actions';
import prize from './prize.png';

class InviteFriends extends React.Component {
  constructor(props) {
    super(props);
    this.inviteFriend = this.inviteFriend.bind(this);
    this.state = {
      invitedFriends: [],
      tagInput: '',
    };
  }

  inviteFriend() {
    let emails = this.state.invitedFriends;
    if (this.state.invitedFriends.length < 1) {
      if (!validateEmail(this.state.tagInput)) {
        emails = [this.state.tagInput];
      } else {
        toastr.error('Validation Error!', 'please enter valid emails!');
        return;
      }
    }

    this.setState({ invitedFriends: [], tagInput: '' });
    this.props.onInvite(emails);
  }

  render() {
    return (
      <Modal
        className="inivteFriendsModal"
        show={this.props.show}
        onHide={() => {
          this.setState({ invitedFriends: [], tagInput: '' });
          this.props.onHide();
        }}
      >
        <BSModal.Header closeButton />
        {/* <span
          role="presentation"
          onClick={this.props.onHide}
          className="customCloseButton"
        >
          ×
        </span> */}
        <BSModal.Body style={{ padding: 40, paddingTop: 15 }}>
          <div>
            <p className={s.headerTitle}>
              {config.platformName} Referral Program
            </p>
            <br />
            <Row>
              <Col xs={4}>
                <img src={prize} alt="" />
              </Col>
              <Col xs={8}>
                <FormGroup className={s.customInput}>
                  <p className={s.description}>
                    You can get more Invo for free (equivanlent of $25) by
                    inviting your friends.
                  </p>
                  <p className={s.description}>Referral Link</p>
                  <InputGroup>
                    <FormControl
                      value={`${host}?ref=${this.props.referralToken}`}
                      type="text"
                      name="secret"
                    />
                    <InputGroup.Button>
                      <Button
                        onClick={() => {
                          copy(`${host}?ref=${this.props.referralToken}`);
                          toastr.info('copied!');
                        }}
                        style={{ height: 45 }}
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </Button>
                    </InputGroup.Button>
                  </InputGroup>
                </FormGroup>
                <p className={s.description}>
                  Or you can enter your Friend's email
                </p>
                <div className={s.tagsInput}>
                  <TagsInput
                    value={this.state.invitedFriends}
                    onChange={tags => this.setState({ invitedFriends: tags })}
                    inputProps={{ placeholder: 'Add new Email' }}
                    inputValue={this.state.tagInput}
                    onChangeInput={tagInput => this.setState({ tagInput })}
                  />
                </div>
                <Row>
                  <Col xs={12}>
                    <Button
                      onClick={() => this.inviteFriend()}
                      className={s.customBtn}
                      block
                    >
                      Send Invitation
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </BSModal.Body>
      </Modal>
    );
  }
}

InviteFriends.propTypes = {
  show: PropTypes.bool,
  onInvite: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  referralToken: PropTypes.string.isRequired,
};

InviteFriends.defaultProps = {
  show: false,
};

const mapState = state => ({
  show: state.showInviteFriendsModal,
  referralToken: state.userInfo.profile.referralToken,
});

const mapDispatch = dispatch => ({
  onInvite(emails) {
    dispatch(sendInvitations(emails));
  },
  onHide() {
    dispatch({ type: C.TOGGLE_SHOW_INVITE_FRIENDS_MODAL });
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(InviteFriends));
