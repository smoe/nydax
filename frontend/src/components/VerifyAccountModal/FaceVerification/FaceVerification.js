import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Webcam from 'react-webcam';
import WizardLevels from '../WizardLevels';
import s from './FaceVerification.css';
import sampleImage from './sample.svg';
import C from './constants';

/* eslint-disable css-modules/no-undef-class */
class FaceVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isLive: false,
    };
    this.toggleLive = this.toggleLive.bind(this);
    this.handleVideoContent = this.handleVideoContent.bind(this);
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  imageComponent() {
    return (
      <img
        alt="selfie"
        style={{ maxWidth: 180 }}
        src={this.props.facePic ? this.props.facePic : sampleImage}
      />
    );
  }

  toggleLive() {
    this.setState(state => {
      if (state.isLive) {
        this.props.onTakePicture(this.webcam.getScreenshot());
      }
      return { isLive: !state.isLive };
    });
  }

  handleVideoContent(hasError) {
    this.setState({ error: hasError });
  }

  webcamComponent() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user',
    };

    return (
      <Webcam
        audio={false}
        width={180}
        height={120}
        ref={this.setRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMediaError={() => this.handleVideoContent(true)}
        onUserMedia={() => this.handleVideoContent(false)}
      />
    );
  }

  render() {
    return (
      <React.Fragment>
        <Modal.Header closeButton>
          {this.props.waitingForModification && (
            <Alert variant="warning">
              We need you to modify your identity informations, Please check
              your email for further informations.
            </Alert>
          )}
          <WizardLevels level={3} />
        </Modal.Header>
        <Modal.Body style={{ padding: 40, paddingTop: 15, paddingBottom: 15 }}>
          <p className={s.headerTitle}>{C.TITLE}</p>
          <div>
            <p
              className={s.description}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: C.DESCRIPTION(this.props.kycToken),
              }}
            />
            <div className={s.formContainer}>
              <div className={s.formInline} style={{ width: '100%' }}>
                <div
                  onClick={this.toggleLive}
                  className={s.previewContainer}
                  role="presentation"
                >
                  {this.state.isLive
                    ? this.webcamComponent()
                    : this.imageComponent()}
                  <span style={{ marginTop: 10, textAlign: 'center' }}>
                    <span style={{ color: 'red' }}>
                      {this.state.error && C.ERROR}
                    </span>
                    {this.state.isLive
                      ? C.TAKE_PICTURE_MESSAGE
                      : C.GO_LIVE_MESSAGE}
                  </span>
                </div>
              </div>
              <br />
              <Button
                disabled={!this.props.facePic}
                onClick={() => this.props.onSubmitButton()}
                className={s.customBtn}
              >
                {C.SUBMIT}
              </Button>
              <br />
              <p
                role="presentation"
                onClick={() => this.props.onBackButton()}
                style={{ cursor: 'pointer' }}
                className={s.description}
              >
                {C.GO_BACK}
              </p>
            </div>
          </div>
        </Modal.Body>
      </React.Fragment>
    );
  }
}

FaceVerification.propTypes = {
  facePic: PropTypes.string.isRequired,
  kycToken: PropTypes.number.isRequired,
  onTakePicture: PropTypes.func.isRequired,
  onSubmitButton: PropTypes.func.isRequired,
  onBackButton: PropTypes.func.isRequired,
  waitingForModification: PropTypes.bool.isRequired,
};

export default withStyles(s)(FaceVerification);
