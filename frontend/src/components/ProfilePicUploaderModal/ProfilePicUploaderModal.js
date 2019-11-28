import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal as BSModal, ProgressBar } from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';
import IxpSpinner from '../IxpSpinner';
import { uploadProfilePic, deleteProfilePic } from '../../actions/user';
import C from '../../constants/actions';
import s from './ProfilePicUploaderModal.css';
import avatarPic from './user.png';
import Button from '../Button';
import Modal from '../Modal';

class ProfilePicUploaderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPicPreview: null,
      fileTypeIsCorrect: false,
    };
    this.getUploadedFilePreview = this.getUploadedFilePreview.bind(this);
  }

  getUploadedFilePreview = event => {
    if (
      event.target.files.length &&
      !['image/png', 'image/jpg', 'image/jpeg'].includes(
        event.target.files[0].type,
      )
    ) {
      toastr.error(
        'File Type Error',
        'Please choose a jpeg or png image file.',
      );
      this.setState({ fileTypeIsCorrect: false });
      return;
    }
    this.setState({ fileTypeIsCorrect: true });
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({ selectedPicPreview: e.target.result });
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  deleteProfileImage = event => {
    event.stopPropagation();
    if (this.state.selectedPicPreview) {
      this.setState({ selectedPicPreview: null });
      this.userPic.value = '';
    } else {
      this.props.deleteProfile();
    }
  };

  uploadFile = file => {
    if (!this.state.fileTypeIsCorrect) {
      return;
    }

    if (file === null || file === undefined) {
      toastr.error('File not found', 'Please choose a file!');
      return;
    }
    this.props.uploadFile(file);
    this.setState({ selectedPicPreview: null });
  };

  render() {
    const profilePicUrl = this.props.profilePicUrl
      ? this.props.profilePicUrl
      : avatarPic;
    return (
      <Modal show={this.props.show} onHide={() => this.props.showToggle()}>
        <BSModal.Header closeButton />
        <BSModal.Body>
          {!this.props.isUploadingProfilePic ? (
            <div>
              <p className={s.headerTitle}>Upload profile picture</p>
              <p className={s.description}>Upload pictures ( JPEG or PNG )</p>
              <div className={s.formContainer}>
                <input
                  onChange={e => this.getUploadedFilePreview(e)}
                  type="file"
                  accept="image/x-png,image/jpeg"
                  ref={ref => {
                    this.userPic = ref;
                  }}
                  style={{ display: 'none' }}
                />
                <div
                  onClick={() => this.userPic.click()}
                  role="presentation"
                  className={s.previewContainer}
                >
                  {(this.props.profilePicUrl ||
                    this.state.selectedPicPreview) && (
                    <button
                      width="43%"
                      title="Delete current profile picture"
                      onClick={this.deleteProfileImage}
                      className={s.deleteBtn}
                    >
                      <i className="fas fa-times" />
                    </button>
                  )}

                  <img
                    alt=" profile pic preview"
                    style={{ maxWidth: 180 }}
                    src={
                      this.state.selectedPicPreview
                        ? this.state.selectedPicPreview
                        : profilePicUrl
                    }
                  />
                  <span style={{ marginTop: 10 }}>click to choose image</span>
                </div>
                <br />
                <Button
                  width="43%"
                  onClick={() => this.uploadFile(this.userPic.files[0])}
                  disabled={!this.state.fileTypeIsCorrect}
                >
                  Upload
                </Button>
                <br />
              </div>
            </div>
          ) : (
            <div>
              <IxpSpinner />
              <p className={s.headerTitle}>Uploading</p>
              <br />
              <p className={s.description}>please wait ...</p>
              <ProgressBar
                className={s.progressBar}
                active
                now={this.props.profilePicUploadProgress}
              />
            </div>
          )}
        </BSModal.Body>
      </Modal>
    );
  }
}

ProfilePicUploaderModal.propTypes = {
  isUploadingProfilePic: PropTypes.bool,
  profilePicUploadProgress: PropTypes.number,
  uploadFile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
  show: PropTypes.bool,
  showToggle: PropTypes.func,
  profilePicUrl: PropTypes.string,
};

ProfilePicUploaderModal.defaultProps = {
  isUploadingProfilePic: false,
  profilePicUploadProgress: 0,
  show: false,
  profilePicUrl: '',
  showToggle: () => {},
};

const mapState = state => ({
  isUploadingProfilePic: state.isUploadingProfilePic,
  profilePicUploadProgress: state.profilePicUploadProgress,
  show: state.showUploadProfilePicModal,
  profilePicUrl: state.userInfo.profile.profilePicUrl,
});

const mapDispatch = dispatch => ({
  uploadFile(file) {
    dispatch(uploadProfilePic(file));
  },
  deleteProfile() {
    dispatch(deleteProfilePic());
  },
  showToggle() {
    dispatch({ type: C.TOGGLE_SHOW_UPLOAD_PROFILE_PIC_MODAL });
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ProfilePicUploaderModal));
export const WithoutRedux = withStyles(s)(ProfilePicUploaderModal);
