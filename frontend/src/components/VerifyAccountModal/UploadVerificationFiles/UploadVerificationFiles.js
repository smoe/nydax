import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { toastr } from 'react-redux-toastr';
import s from './UploadVerificationFiles.css';
import frontUploadIcon from './drag-drop-or-click-to-upload.svg';
import backUploadIcon from './drag-drop-or-click-to-upload-back.svg';
import WizardLevels from '../WizardLevels/WizardLevels';
import C from './constants';
/* eslint-disable css-modules/no-undef-class */

class UploadVerificationFiles extends React.Component {
  constructor(props) {
    super(props);
    this.getUploadedFilePreview = this.getUploadedFilePreview.bind(this);
  }

  getUploadedFilePreview(event, isFront, isTwoSided) {
    if (
      !['image/png', 'image/jpg', 'image/jpeg'].includes(
        event.target.files[0].type,
      )
    ) {
      toastr.error(
        'File Type Error',
        'Please choose a jpeg or png image file.',
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      this.props.onDocumentUploaded(
        this.props.documentName,
        e.target.result,
        isFront,
        isTwoSided,
      );
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  properMessage(isFront, isTwoSided) {
    let isFirstTime = true;
    if ((isFront && this.props.frontPic) || (!isFront && this.props.backPic)) {
      isFirstTime = false;
    }
    let message = `Click to ${isFirstTime ? 'upload' : 'change'} your `;
    if (isFront) {
      if (isTwoSided) {
        message = `${message}front `;
      }
    } else {
      message = `${message}back `;
    }
    return `${message + this.props.documentName} image.`;
  }

  uploadInput(isFront, isTwoSided = true) {
    return (
      <div>
        <input
          onChange={e => this.getUploadedFilePreview(e, isFront, isTwoSided)}
          id={`fileInput${isFront ? 'Front' : 'Back'}`}
          type="file"
          accept="image/x-png,image/jpeg"
          ref={ref => {
            // eslint-disable-next-line no-unused-expressions
            isFront ? (this.frontFileInput = ref) : (this.backFileInput = ref);
          }}
          style={{ display: 'none' }}
        />
        <div
          onClick={() =>
            isFront ? this.frontFileInput.click() : this.backFileInput.click()
          }
          className={s.previewContainer}
          role="presentation"
        >
          <img
            alt={`${this.props.documentName} upload icon`}
            style={{ maxWidth: 180 }}
            src={
              (isFront &&
                (this.props.frontPic
                  ? this.props.frontPic
                  : frontUploadIcon)) ||
              (!isFront &&
                (this.props.backPic ? this.props.backPic : backUploadIcon))
            }
          />
          <span style={{ marginTop: 10, textAlign: 'center' }}>
            {this.properMessage(isFront, isTwoSided)}
          </span>
        </div>
      </div>
    );
  }

  render() {
    const isTwoSided = this.props.backPic !== undefined;
    return (
      <div>
        <Modal.Header closeButton>
          <WizardLevels level={2} />
        </Modal.Header>
        <Modal.Body style={{ padding: 40, paddingTop: 15, paddingBottom: 15 }}>
          <p className={s.headerTitle}>{C.TITLE}</p>
          <div>
            <p className={s.description}>
              {C.DESCRIPTION(this.props.documentName)}
            </p>
            <div className={s.formContainer}>
              <div className={s.formInline} style={{ width: '100%' }}>
                {this.uploadInput(true, isTwoSided)}
                {isTwoSided && this.uploadInput(false)}
              </div>
              <br />
              <Button
                onClick={() => this.props.onSaveButton()}
                className={s.customBtn}
              >
                {C.SAVE}
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
      </div>
    );
  }
}

UploadVerificationFiles.propTypes = {
  frontPic: PropTypes.string.isRequired,
  backPic: PropTypes.string,
  documentName: PropTypes.string.isRequired,
  onDocumentUploaded: PropTypes.func.isRequired,
  onSaveButton: PropTypes.func.isRequired,
  onBackButton: PropTypes.func.isRequired,
};

UploadVerificationFiles.defaultProps = {
  backPic: undefined,
};

export default withStyles(s)(UploadVerificationFiles);
