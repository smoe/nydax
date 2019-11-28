import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getGoogleAutheticator } from '../../actions/authentication';
import themify from '../../themify';
import C from '../../constants/actions';
import s from './SettingPanel.css';
/* eslint-disable css-modules/no-undef-class */

const SettingPanel = ({
  image,
  title,
  buttonText,
  description,
  theme,
  showModal,
  disabled,
  hasUserImage,
  secondBtn,
}) => (
  <div className={themify(s, s.root, theme)}>
    {image && (
      <div className={s.imageContainer}>
        <img
          src={image}
          alt="setting-panel"
          style={hasUserImage ? { borderRadius: '1000px' } : {}}
        />
      </div>
    )}
    <div className={s.descriptionContainer}>
      <h5>{title}</h5>
      <p>{description}</p>
    </div>
    <div className={s.buttonContainer}>
      <button
        className={s.button}
        onClick={() => showModal(title)}
        disabled={disabled}
        style={disabled ? { cursor: 'not-allowed', filter: 'blur(1px)' } : {}}
      >
        {buttonText}
      </button>
    </div>
    {secondBtn && (
      <div className={s.buttonContainer}>
        <button
          className={s.button}
          onClick={secondBtn.onClick}
          disabled={secondBtn.disabled}
          style={
            secondBtn.disabled
              ? { cursor: 'not-allowed', filter: 'blur(1px)' }
              : {}
          }
        >
          {secondBtn.buttonText}
        </button>
      </div>
    )}
  </div>
);

SettingPanel.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  theme: PropTypes.string,
  showModal: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  hasUserImage: PropTypes.string,
  secondBtn: PropTypes.shape({
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    buttonText: PropTypes.string,
  }),
};

SettingPanel.defaultProps = {
  secondBtn: false,
  theme: 'dark',
  disabled: false,
  hasUserImage: '',
};

const mapState = state => ({
  theme: state.theme,
});

const mapDispatch = dispatch => ({
  showModal(title) {
    switch (title) {
      case 'Change Profile Picture':
        dispatch({ type: C.TOGGLE_SHOW_UPLOAD_PROFILE_PIC_MODAL });
        break;
      case 'Change Password':
        dispatch({ type: C.TOGGLE_SHOW_CHANGE_PASSWORD_MODAL });
        break;
      case 'Verify your identity':
      case 'Modify your identity informations':
        dispatch({ type: C.TOGGLE_SHOW_VERIFY_IDENTITY_MODAL });
        break;
      case 'SMS Authentication':
        dispatch({ type: C.TOGGLE_SHOW_SMS_AUTHENTICATION_MODAL });
        break;
      case 'Google Authentication':
        dispatch(getGoogleAutheticator());
        // dispatch({ type: C.TOGGLE_SHOW_GOOGLE_AUTHENTICATION_MODAL });
        break;

      default:
        break;
    }
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(SettingPanel));
export const WithoutRedux = withStyles(s)(SettingPanel);
