import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Alert } from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ChooseVerificationType.css';
import WizardLevels from '../WizardLevels/WizardLevels';
import PassportIcon from './passport.svg';
import DriversLicenseIcon from './driver-s-license.svg';
import IdentityCardIcon from './identity-card.svg';
import PassportActiveIcon from './passport-active.svg';
import DriversLicenseActiveIcon from './driver-s-license-active.svg';
import IdentityCardActiveIcon from './identity-card-active.svg';
import C from './constants';
/* eslint-disable css-modules/no-undef-class */

class ChooseVerificationType extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    if (
      !this.props.passportPicUploaded &&
      !this.props.driversLicensePicUploaded &&
      !this.props.identityCardPicUploaded
    ) {
      toastr.error(C.ERROR_TITLE, C.ERROR_DESCRIPTION);
      return;
    }
    this.props.onNextButton();
  }

  render() {
    const properPassportIcon = this.props.passportPicUploaded
      ? PassportActiveIcon
      : PassportIcon;
    const properDriversLicenseIcon = this.props.driversLicensePicUploaded
      ? DriversLicenseActiveIcon
      : DriversLicenseIcon;
    const properIdentityCardIcon = this.props.identityCardPicUploaded
      ? IdentityCardActiveIcon
      : IdentityCardIcon;

    return (
      <div>
        <Modal.Header closeButton>
          {this.props.waitingForModification && (
            <Alert variant="warning">
              We need you to modify your identity informations, Please check
              your email for further informations.
            </Alert>
          )}
          <WizardLevels level={2} />
        </Modal.Header>
        <Modal.Body style={{ padding: 40, paddingTop: 15, paddingBottom: 15 }}>
          <p className={s.headerTitle}> {C.TITLE} </p>
          <br />
          <p className={s.description}> {C.DESCRIPTION} </p>
          <div
            style={{ width: '100%' }}
            className={cx(s.iconsContainer, s.formInline)}
          >
            <div
              onClick={() =>
                this.props.onSelectVerificationType(
                  this.props.passportDocumentName,
                )
              }
              className={s.formContainer}
              role="presentation"
            >
              <img
                width={34}
                height={48}
                src={properPassportIcon}
                alt={`${this.props.passportDocumentName} icon`}
              />
              <span
                style={{ marginTop: 10 }}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: this.props.passportDocumentName.replace(
                    /( )/g,
                    '&nbsp;',
                  ),
                }}
              />
            </div>
            <div
              onClick={() =>
                this.props.onSelectVerificationType(
                  this.props.driversLicenseDocumentName,
                )
              }
              className={s.formContainer}
              role="presentation"
            >
              <img
                width={52}
                height={36}
                src={properDriversLicenseIcon}
                alt={`${this.props.driversLicenseDocumentName} icon`}
              />
              <span
                style={{ marginTop: 15 }}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: this.props.driversLicenseDocumentName.replace(
                    /( )/g,
                    '&nbsp;',
                  ),
                }}
              />
            </div>
            <div
              onClick={() =>
                this.props.onSelectVerificationType(
                  this.props.identityCardDocumentName,
                )
              }
              className={s.formContainer}
              role="presentation"
            >
              <img
                width={52}
                height={36}
                src={properIdentityCardIcon}
                alt={`${this.props.identityCardDocumentName} icon`}
              />
              <span
                style={{ marginTop: 15 }}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: this.props.identityCardDocumentName.replace(
                    /( )/g,
                    '&nbsp;',
                  ),
                }}
              />
            </div>
          </div>
          <br />
          <div>
            <Button
              onClick={this.handleSubmit}
              disabled={
                !this.props.passportPicUploaded &&
                !this.props.driversLicensePicUploaded &&
                !this.props.identityCardPicUploaded
              }
              className={cx(s.customBtn)}
            >
              {C.NEXT}
            </Button>
          </div>
          <br />
          <p
            role="presentation"
            onClick={() => this.props.onBackButton()}
            className={s.description}
            style={{ cursor: 'pointer' }}
          >
            {C.GO_BACK}
          </p>
        </Modal.Body>
      </div>
    );
  }
}

ChooseVerificationType.propTypes = {
  passportPicUploaded: PropTypes.bool.isRequired,
  passportDocumentName: PropTypes.string.isRequired,
  driversLicensePicUploaded: PropTypes.bool.isRequired,
  driversLicenseDocumentName: PropTypes.string.isRequired,
  identityCardPicUploaded: PropTypes.bool.isRequired,
  identityCardDocumentName: PropTypes.string.isRequired,
  onNextButton: PropTypes.func.isRequired,
  onBackButton: PropTypes.func.isRequired,
  onSelectVerificationType: PropTypes.func.isRequired,
  waitingForModification: PropTypes.bool.isRequired,
};

export default withStyles(s)(ChooseVerificationType);
