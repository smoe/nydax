import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { titles, errors } from '../../constants/messages';
import C from '../../constants/actions';
import NAMES from './constants';
import PersonalInfoForm from './PersonalInfoForm';
import VerificationComplete from './VerificationComplete';
import UploadVerificationFiles from './UploadVerificationFiles';
import ChooseVerificationType from './ChooseVerificationType';
import FaceVerification from './FaceVerification';
import Modal from '../Modal';
import config from '../../config';
import { camelize, dataURItoBlob } from '../../utils';

class VerifyAccountModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'PersonalInfoForm',
      legalFirstName: this.props.legalFirstName || this.props.firstName || '',
      legalMiddleName: this.props.legalMiddleName,
      legalLastName: this.props.legalLastName || this.props.lastName || '',
      countryId: this.props.countryId,
      passportPic: this.props.passportPic,
      driversLicenseFrontPic: this.props.driversLicenseFrontPic,
      driversLicenseBackPic: this.props.driversLicenseBackPic,
      identityCardFrontPic: this.props.identityCardFrontPic,
      identityCardBackPic: this.props.identityCardBackPic,
      facePic: this.props.facePic,
      kycToken: this.props.kycToken,
      isSubmittingVerifyAccountInfo: false,
    };
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleSelectVerificationType = this.handleSelectVerificationType.bind(
      this,
    );
    this.handleDocumentUpload = this.handleDocumentUpload.bind(this);
    this.handleTakePicture = this.handleTakePicture.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.setState({ isSubmittingVerifyAccountInfo: true });
    this.handleNextButton();
    const formdata = new FormData();
    formdata.append('legalFirstName', this.state.legalFirstName);
    formdata.append('legalLastName', this.state.legalLastName);
    formdata.append('legalMiddleName', this.state.legalMiddleName);
    formdata.append('countryId', this.state.countryId);
    formdata.append('passportPic', dataURItoBlob(this.state.passportPic));
    formdata.append(
      'driverLicenseFrontPic',
      dataURItoBlob(this.state.driversLicenseFrontPic),
    );
    formdata.append(
      'driverLicenseBackPic',
      dataURItoBlob(this.state.driversLicenseBackPic),
    );
    formdata.append(
      'identityCardFrontPic',
      dataURItoBlob(this.state.identityCardFrontPic),
    );
    formdata.append(
      'identityCardBackPic',
      dataURItoBlob(this.state.identityCardBackPic),
    );
    formdata.append('facePic', dataURItoBlob(this.state.facePic));
    return axios
      .post(`${config.api.serverUrl}/v1/user/identityVerification`, formdata, {
        headers: {
          Authorization: this.props.authToken,
        },
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ isSubmittingVerifyAccountInfo: false });
          // toastr.success(res.data.message.title, res.data.message.description);
        }
      })
      .catch(err => {
        if (err.message === 'Network Error') {
          toastr.error(titles.CONNECTION_ERROR, errors.SERVER_CONNECTION_LOST);
        } else if (err.response && err.response.data.error) {
          toastr.error(
            err.response.data.error.title,
            err.response.data.error.description,
          );
        }
        this.handleBackButton();
        this.setState({ isSubmittingVerifyAccountInfo: false });
      });
  }

  handleInputFieldChange(event) {
    this.setState({
      [event.target.name]:
        event.target.type === 'text'
          ? event.target.value
          : parseInt(event.target.value, 10),
    });
  }

  handleNextButton() {
    this.setState(state => {
      switch (state.currentPage) {
        case 'PersonalInfoForm':
          return { currentPage: 'ChooseVerificationType' };
        case 'ChooseVerificationType':
          return { currentPage: 'FaceVerification' };
        case 'passportUpload':
        case 'driversLicenseUpload':
        case 'identityCardUpload':
          return { currentPage: 'ChooseVerificationType' };
        case 'FaceVerification':
          return { currentPage: 'VerificationComplete' };
        default:
          return null;
      }
    });
  }

  handleBackButton() {
    this.setState(state => {
      switch (state.currentPage) {
        case 'ChooseVerificationType':
          return { currentPage: 'PersonalInfoForm' };
        case 'FaceVerification':
          return { currentPage: 'ChooseVerificationType' };
        case 'passportUpload':
        case 'driversLicenseUpload':
        case 'identityCardUpload':
          return { currentPage: 'ChooseVerificationType' };
        case 'VerificationComplete':
          return { currentPage: 'FaceVerification' };
        default:
          return null;
      }
    });
  }

  handleSelectVerificationType(documentName) {
    let pageName = camelize(documentName.toLowerCase().replace(/(')/g, ''));
    pageName += 'Upload';
    this.setState({ currentPage: pageName });
  }

  handleDocumentUpload(documentName, value, isFront, isTwoSided) {
    let fieldName = camelize(documentName.replace(/(')/g, ''));
    if (isTwoSided) {
      fieldName += isFront ? 'Front' : 'Back';
    }
    fieldName += 'Pic';
    this.setState({ [fieldName]: value });
  }

  handleTakePicture(value) {
    this.setState({ facePic: value });
  }

  pageComponent(pageName) {
    switch (pageName) {
      case 'PersonalInfoForm':
        return (
          <PersonalInfoForm
            legalFirstName={this.state.legalFirstName}
            legalMiddleName={this.state.legalMiddleName}
            legalLastName={this.state.legalLastName}
            countryId={this.state.countryId}
            countries={this.props.countries}
            onInputFieldChanged={this.handleInputFieldChange}
            onNextButton={this.handleNextButton}
            waitingForModification={this.props.verificationStatusId === 3}
          />
        );
      case 'ChooseVerificationType':
        return (
          <ChooseVerificationType
            passportPicUploaded={!!this.state.passportPic}
            passportDocumentName={NAMES.PASSPORT_DOCUMENT_NAME}
            driversLicensePicUploaded={
              !!(
                this.state.driversLicenseFrontPic &&
                this.state.driversLicenseBackPic
              )
            }
            driversLicenseDocumentName={NAMES.DRIVERS_LICENSE_DOCUMENT_NAME}
            identityCardPicUploaded={
              !!(
                this.state.identityCardFrontPic &&
                this.state.identityCardBackPic
              )
            }
            identityCardDocumentName={NAMES.ID_CARD_DOCUMENT_NAME}
            onNextButton={this.handleNextButton}
            onBackButton={this.handleBackButton}
            onSelectVerificationType={this.handleSelectVerificationType}
            waitingForModification={this.props.verificationStatusId === 3}
          />
        );
      case 'passportUpload':
        return (
          <UploadVerificationFiles
            frontPic={this.state.passportPic}
            backPic={undefined}
            documentName={NAMES.PASSPORT_DOCUMENT_NAME}
            onDocumentUploaded={this.handleDocumentUpload}
            onSaveButton={this.handleNextButton}
            onBackButton={this.handleBackButton}
          />
        );
      case 'driversLicenseUpload':
        return (
          <UploadVerificationFiles
            frontPic={this.state.driversLicenseFrontPic}
            backPic={this.state.driversLicenseBackPic}
            documentName={NAMES.DRIVERS_LICENSE_DOCUMENT_NAME}
            onDocumentUploaded={this.handleDocumentUpload}
            onSaveButton={this.handleNextButton}
            onBackButton={this.handleBackButton}
          />
        );
      case 'identityCardUpload':
        return (
          <UploadVerificationFiles
            frontPic={this.state.identityCardFrontPic}
            backPic={this.state.identityCardBackPic}
            documentName={NAMES.ID_CARD_DOCUMENT_NAME}
            onDocumentUploaded={this.handleDocumentUpload}
            onSaveButton={this.handleNextButton}
            onBackButton={this.handleBackButton}
          />
        );
      case 'FaceVerification':
        return (
          <FaceVerification
            facePic={this.state.facePic}
            kycToken={this.state.kycToken}
            onTakePicture={this.handleTakePicture}
            onSubmitButton={this.onSubmit}
            onBackButton={this.handleBackButton}
            waitingForModification={this.props.verificationStatusId === 3}
          />
        );
      case 'VerificationComplete':
        return (
          <VerificationComplete
            isUploading={this.state.isSubmittingVerifyAccountInfo}
            onFinish={() => {
              this.handleNextButton();
              this.props.onHide();
            }}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => {
          this.setState({ currentPage: 'PersonalInfoForm' });
          this.props.onHide();
        }}
      >
        {this.pageComponent(this.state.currentPage)}
      </Modal>
    );
  }
}

VerifyAccountModal.propTypes = {
  show: PropTypes.bool,
  authToken: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  legalFirstName: PropTypes.string,
  legalMiddleName: PropTypes.string,
  legalLastName: PropTypes.string,
  countryId: PropTypes.number,
  passportPic: PropTypes.string,
  driversLicenseFrontPic: PropTypes.string,
  driversLicenseBackPic: PropTypes.string,
  identityCardFrontPic: PropTypes.string,
  identityCardBackPic: PropTypes.string,
  facePic: PropTypes.string,
  kycToken: PropTypes.number,
  onHide: PropTypes.func.isRequired,
  verificationStatusId: PropTypes.number.isRequired,
};

VerifyAccountModal.defaultProps = {
  show: false,
  firstName: '',
  lastName: '',
  legalFirstName: '',
  legalMiddleName: '',
  legalLastName: '',
  countryId: undefined,
  passportPic: '',
  driversLicenseFrontPic: '',
  driversLicenseBackPic: '',
  identityCardFrontPic: '',
  identityCardBackPic: '',
  facePic: '',
  kycToken: 0,
};

const mapState = state => ({
  show: state.showVerifyIdentityModal,
  authToken: state.userInfo.authToken,
  countries: state.countries,
  firstName: state.userInfo.profile.firstName,
  lastName: state.userInfo.profile.lastName,
  legalFirstName: state.userInfo.profile.legalFirstName,
  legalMiddleName: state.userInfo.profile.legalMiddleName,
  legalLastName: state.userInfo.profile.legalLastName,
  countryId: state.userInfo.profile.countryId,
  passportPic: state.userInfo.profile.passportPic,
  driversLicenseFrontPic: state.userInfo.profile.driverLicenseFrontPic,
  driversLicenseBackPic: state.userInfo.profile.driverLicenseBackPic,
  identityCardFrontPic: state.userInfo.profile.identityCardFrontPic,
  identityCardBackPic: state.userInfo.profile.identityCardBackPic,
  facePic: state.userInfo.profile.facePic,
  kycToken: state.userInfo.profile.kycToken,
  uploadProgress: state.userInfo.profile.uploadProgress,
  verificationStatusId: state.userInfo.profile.verificationStatusId,
});

const mapDispatch = dispatch => ({
  onHide() {
    dispatch({ type: C.TOGGLE_SHOW_VERIFY_IDENTITY_MODAL });
  },
  // onSubmit(data) {
  //   dispatch(submitIdentityVerificationInfo(data));
  // },
});

export default connect(
  mapState,
  mapDispatch,
)(VerifyAccountModal);

export const WidthoutRedux = VerifyAccountModal;
