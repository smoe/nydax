import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './WizardLevels.css';
import FileTextIcon from './file-text.svg';
import UploadIdentityVerifierIcon from './group-9.svg';
import UserIcon from './user.svg';
/* eslint-disable css-modules/no-undef-class */

const WizardLevels = ({ level }) => (
  <div className={s.wizardLevels}>
    <div className={cx(s.circleIcon, s.active)}>
      <img width={10} height={12} src={FileTextIcon} alt="wizard level icon" />
    </div>
    <div className={level > 1 ? cx(s.divider, s.active) : s.divider} />
    <div className={level > 1 ? cx(s.circleIcon, s.active) : s.circleIcon}>
      <img
        width={15}
        height={11}
        src={UploadIdentityVerifierIcon}
        alt="wizard level icon"
      />
    </div>
    <div className={level > 2 ? cx(s.divider, s.active) : s.divider} />
    <div className={level > 2 ? cx(s.circleIcon, s.active) : s.circleIcon}>
      <img width={8} height={9} src={UserIcon} alt="wizard level icon" />
    </div>
  </div>
);
WizardLevels.propTypes = {
  level: PropTypes.number.isRequired,
};
export default withStyles(s)(WizardLevels);
