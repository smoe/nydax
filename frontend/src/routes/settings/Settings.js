import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab, Row, Col } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { toastr } from 'react-redux-toastr';
import ProfilePicUploaderModal from '../../components/ProfilePicUploaderModal';
import ChangePasswordModal from '../../components/ChangePasswordModal';
import SmsVerificationModal from '../../components/SmsVerificationModal';
import TwoFactorAuthenticationModal from '../../components/TwoFactorAuthenticationModal';
import SettingPanel from '../../components/SettingPanel';
import { updateCurrency } from '../../actions/currency';
import { updateTimezone } from '../../actions/timezone';
import { deleteProfilePic } from '../../actions/user';
import Tabs from '../../components/Tabs';
import { titles, infos } from '../../constants/messages';
import Select from '../../components/Select';
// import SecurityTable from '../../components/SecurityTable';
import themify from '../../themify';
import s from './Settings.css';
import profilePicDark from './profile.png';
import profilePicLight from './profile-light.png';
import verifyIdentityPicDark from './identity-verify.png';
import verifyIdentityPicLight from './identity-verify-light.png';
import verifiedIdentityPicDark from './identity-verified.png';
import verifiedIdentityPicLight from './identity-verified-light.png';
import rejectedIdentityPicDark from './identity-rejected.png';
import rejectedIdentityPicLight from './identity-rejected-light.png';
import smsAuthenticationPic from './sms-authentication.png';
import googleAuthenticationPic from './google-authentication.png';
import smsAuthenticationPicLight from './sms-authentication-light.png';
import googleAuthenticationPicLight from './google-authentication-light.png';
import Button from '../../components/Button';

/* eslint-disable css-modules/no-undef-class */

const rowStyle = { margin: 0 };
const colStyle = { padding: 0 };

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTimeZoneId: props.timezoneId,
      selectedCurrencyId: props.baseCurrencyId,
      showSaveNDiscardButtons: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedTimeZoneId: nextProps.timezoneId,
      selectedCurrencyId: nextProps.baseCurrencyId,
    });
  }

  onCurrencyChange(currencyId) {
    this.setState({
      selectedCurrencyId: currencyId,
      showSaveNDiscardButtons: true,
    });
  }

  onTimezoneChange(timezoneId) {
    this.setState({
      selectedTimeZoneId: timezoneId,
      showSaveNDiscardButtons: true,
    });
  }

  onSave() {
    if (this.state.selectedTimeZoneId !== this.props.timezoneId) {
      toastr.info(
        titles.TIMEZONE_CHANGE,
        infos.TIMEZONE_CHANGED_TO(
          this.props.timezones.find(
            item => item.id === this.state.selectedTimeZoneId,
          ).name,
        ),
      );
    }
    if (this.state.selectedCurrencyId !== this.props.baseCurrencyId) {
      toastr.info(
        titles.BASE_CURRENCY_CHANGE,
        infos.BASE_CURRENCY_CHANGED_TO(
          this.props.currencies.find(
            item => item.id === this.state.selectedCurrencyId,
          ).abbreviation,
        ),
      );
    }
    this.props.onTimezoneChange(this.state.selectedTimeZoneId);
    this.props.onCurrencyChange(this.state.selectedCurrencyId);
    this.setState({ showSaveNDiscardButtons: false });
  }

  onDiscard() {
    this.setState({
      selectedCurrencyId: this.props.baseCurrencyId,
      selectedTimeZoneId: this.props.timezoneId,
      showSaveNDiscardButtons: false,
    });
  }

  getProperVerifyImage() {
    if (this.props.verificationStatusId === 4) {
      return this.props.theme === 'dark'
        ? verifiedIdentityPicDark
        : verifiedIdentityPicLight;
    } else if (this.props.verificationStatusId === 5) {
      return this.props.theme === 'dark'
        ? rejectedIdentityPicDark
        : rejectedIdentityPicLight;
    }
    return this.props.theme === 'dark'
      ? verifyIdentityPicDark
      : verifyIdentityPicLight;
  }

  getProperVerifyTitle() {
    switch (this.props.verificationStatusId) {
      case 1:
        return 'Verify your identity';
      case 2:
        return 'You have submitted your identity informations';
      case 3:
        return 'Modify your identity informations';
      case 4:
        return 'You are verified';
      case 5:
        return 'Refused to verify your identity';
      default:
        return '';
    }
  }

  getProperVerifyDescription() {
    switch (this.props.verificationStatusId) {
      case 1:
        return 'If you would like to deposit or withdraw, its mandatory.';
      case 2:
        return 'Stay tuned, we are in the process of checking your verification informations. Thanks for your patience';
      case 3:
        return 'We need some modification in your identity informations, Please check your email.';
      case 4:
        return 'Congratulations! You are successfully  verified';
      case 5:
        return "Sorry! We couldn't verify your identity";
      default:
        return '';
    }
  }

  render() {
    let { profilePicUrl } = this.props;
    if (!profilePicUrl) {
      profilePicUrl =
        this.props.theme === 'dark' ? profilePicDark : profilePicLight;
    }
    return (
      <div className={themify(s, s.root, this.props.theme)}>
        <Tabs align="left" theme={this.props.theme}>
          <Tab eventKey={0} title="My Profile">
            <div className={s.profileContainer}>
              <Row style={rowStyle}>
                <div className={s.headerTitle}>User Profile</div>
              </Row>
              <Row style={rowStyle}>
                <Col lg={6} style={colStyle}>
                  <div className={s.dividerRight} data-tut="changeProfilePic">
                    <SettingPanel
                      image={profilePicUrl}
                      title="Change Profile Picture"
                      description="Max file size is 20MB. You can also use avatars."
                      buttonText="Upload"
                      secondBtn={{
                        onClick: this.props.deleteProfile,
                        disabled: false,
                        buttonText: 'Delete Image',
                      }}
                      hasUserImage={
                        this.props.profilePicUrl &&
                        this.props.profilePicUrl.length > 0
                      }
                    />
                  </div>
                </Col>
                <Col lg={6} style={colStyle}>
                  <div data-tut="changePassword">
                    <SettingPanel
                      image=""
                      title="Change Password"
                      description="Enable 2-factor authentication on the Security tab."
                      buttonText="Change Password"
                    />
                  </div>
                </Col>
              </Row>
              <Row style={rowStyle}>
                <div className={s.secondRowContainer}>
                  <Col lg={6} style={colStyle}>
                    <div className={s.inputsContainer}>
                      <h6>Email</h6>
                      <input
                        disabled
                        type="text"
                        className={s.customInput}
                        value={this.props.email}
                      />
                      <br />
                      <br />
                      <h6>Time zone</h6>
                      <div
                        className={s.dropdownContainer}
                        data-tut="changeTimeZone"
                      >
                        <Select
                          options={this.props.timezones}
                          onChange={timezone => {
                            if (
                              timezone.value !== this.state.selectedTimeZoneId
                            )
                              this.onTimezoneChange(timezone.value);
                          }}
                          className="dropUp"
                          selectedValue={this.state.selectedTimeZoneId}
                        />
                      </div>
                      <br />
                      <h6>Base currency</h6>
                      <div
                        className={s.dropdownContainer}
                        data-tut="changeCurrency"
                      >
                        <Select
                          options={this.props.currencies}
                          onChange={currency => {
                            if (
                              currency.value !== this.state.selectedCurrencyId
                            )
                              this.onCurrencyChange(currency.value);
                          }}
                          selectedValue={this.state.selectedCurrencyId}
                          className="dropUp"
                          isBaseCurrency
                        />
                      </div>
                    </div>
                    {this.state.showSaveNDiscardButtons && (
                      <Row style={{ marginTop: 15 }}>
                        <Col lg={5} style={{ display: 'flex' }}>
                          <div style={{ padding: 5 }}>
                            <Button
                              onClick={() => this.onDiscard()}
                              color="#b40000"
                            >
                              discard
                            </Button>
                          </div>
                          <div style={{ padding: 5 }}>
                            <Button
                              onClick={() => this.onSave()}
                              color="#08a044"
                            >
                              save
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    )}
                  </Col>
                  <Col lg={6} style={colStyle}>
                    <div data-tut="verifyYourIdentity">
                      <SettingPanel
                        image={this.getProperVerifyImage()}
                        title={this.getProperVerifyTitle()}
                        description={this.getProperVerifyDescription()}
                        buttonText="Verify"
                        disabled={
                          this.props.verificationStatusId === 2 ||
                          this.props.verificationStatusId === 4 ||
                          this.props.verificationStatusId === 5
                        }
                      />
                    </div>
                  </Col>
                </div>
              </Row>
            </div>
          </Tab>
          <Tab eventKey={1} title="Security">
            <div className={s.profileContainer}>
              <Row style={rowStyle}>
                <div className={s.headerTitle}>Security</div>
              </Row>
              <Row style={rowStyle}>
                <Col lg={6} style={colStyle}>
                  <div className={s.dividerRight}>
                    <SettingPanel
                      image={
                        this.props.theme === 'light'
                          ? smsAuthenticationPicLight
                          : smsAuthenticationPic
                      }
                      title="SMS Authentication"
                      description="Secure your account by texting a confirmation code to your phone"
                      buttonText={this.props.smsEnabled ? 'Disable' : 'Enable'}
                      disabled={this.props.twoFAEnabled}
                    />
                  </div>
                </Col>
                <Col lg={6} style={colStyle}>
                  <SettingPanel
                    image={
                      this.props.theme === 'light'
                        ? googleAuthenticationPicLight
                        : googleAuthenticationPic
                    }
                    title="Google Authentication"
                    description="Secure your account by using Google authenticator."
                    buttonText={this.props.twoFAEnabled ? 'Disable' : 'Enable'}
                    disabled={this.props.smsEnabled}
                  />
                </Col>
              </Row>
              <Row style={rowStyle}>
                {/* <div
                  className={themify(s, s.sessionsContainer, this.props.theme)}
                >
                  <p className={s.sectionTitle}>Sessions</p>
                  <p className={s.sectionDescription}>
                    These sessions are currently signed in to your
                    account.&nbsp;
                    <span // eslint-disable-line
                      className={s.signoutAllSessions}
                      onClick={() => this.props.signoutAllSessions()}
                    >
                      Sign out all other sessions
                    </span>
                  </p>
                  <br />
                  <SecurityTable
                    data={this.props.sessions}
                    columns={[
                      'Signed in',
                      'Browser',
                      'IP address',
                      'Near',
                      'Current',
                    ]}
                    type="session"
                  />
                </div> */}
                {/* <div
                  className={themify(s, s.sessionsContainer, this.props.theme)}
                >
                  <p className={s.sectionTitle}>Account activity</p>
                  <p className={s.sectionDescription}>
                    Recent activity on your account.
                  </p>
                  <br />
                  <SecurityTable
                    data={this.props.accountActivity}
                    columns={[
                      'Time',
                      'Source',
                      'IP address',
                      'Location',
                      'Action',
                    ]}
                    type="accountActivity"
                  />
                </div> */}
              </Row>
            </div>
          </Tab>
        </Tabs>
        <ProfilePicUploaderModal />
        <ChangePasswordModal />
        <SmsVerificationModal />
        <TwoFactorAuthenticationModal />
      </div>
    );
  }
}

Settings.propTypes = {
  deleteProfile: PropTypes.func.isRequired,
  theme: PropTypes.string,
  email: PropTypes.string.isRequired,
  timezones: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  baseCurrencyId: PropTypes.number.isRequired,
  timezoneId: PropTypes.number.isRequired,
  smsEnabled: PropTypes.bool.isRequired,
  twoFAEnabled: PropTypes.bool.isRequired,
  // sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
  // accountActivity: PropTypes.arrayOf(PropTypes.object).isRequired,
  // signoutAllSessions: PropTypes.func.isRequired,
  onTimezoneChange: PropTypes.func.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
  profilePicUrl: PropTypes.string.isRequired,
  verificationStatusId: PropTypes.number.isRequired,
};

Settings.defaultProps = {
  theme: 'dark',
};

const mapState = state => ({
  email: state.userInfo.profile.email,
  baseCurrencyId: state.userInfo.profile.baseCurrencyId,
  timezoneId: state.userInfo.profile.timezoneId,
  timezones: state.timezones,
  currencies: state.currencies,
  smsEnabled: state.userInfo.authStatus.smsEnabled,
  twoFAEnabled: state.userInfo.authStatus.twoFAEnabled,
  sessions: state.userInfo.sessions,
  accountActivity: state.userInfo.accountActivity,
  profilePicUrl: state.userInfo.profile.profilePicUrl,
  theme: state.theme,
  verificationStatusId: state.userInfo.profile.verificationStatusId,
});

const mapDispatch = dispatch => ({
  onTimezoneChange(timezoneId) {
    dispatch(updateTimezone(timezoneId));
  },
  deleteProfile() {
    dispatch(deleteProfilePic());
  },
  onCurrencyChange(currencyId) {
    dispatch(updateCurrency(currencyId));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(Settings));
