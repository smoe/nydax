import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import themify from '../../../themify';
import s from './AboutUs.css';
import contactEmailIcon from './contact-email.svg';
import facebookIcon from './facebook.svg';
import linkedInIcon from './linked-in.svg';
import twitterIcon from './twitter.svg';
import websiteIcon from './website.svg';
import phoneNumberIcon from './phone-number.svg';
import foundersIcon from './founders.svg';
import foundedDateIcon from './founded-date.svg';
import locationIcon from './location.svg';
/* eslint-disable css-modules/no-undef-class */

const InfoRow = ({ icon, title, value, link }) => (
  <div style={{ margin: 5 }}>
    <img
      className={s.icon}
      style={{ width: 17, height: 17 }}
      src={icon}
      alt="icon"
    />
    <div className={s.title}>{title}</div>
    <div className={s.value}>{link ? <a href={link}>{value}</a> : value}</div>
  </div>
);

InfoRow.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  link: PropTypes.string,
};

InfoRow.defaultProps = {
  link: null,
};

const AboutUs = ({
  theme,
  description,
  location,
  founders,
  dateFounded,
  website,
  facebook,
  linkedin,
  twitter,
  contactEmail,
  phoneNumber,
}) => (
  <div className={themify(s, s.root, theme)}>
    <div className={s.header}>About us</div>
    <div className={s.description}>
      <p>{description}</p>
    </div>
    <div className={s.info1}>
      <InfoRow icon={locationIcon} title="Location" value={location} />
      <InfoRow icon={foundersIcon} title="Founders" value={founders} />
      <InfoRow
        icon={foundedDateIcon}
        title="Founded Date"
        value={dateFounded}
      />
    </div>
    <div className={s.info2}>
      <InfoRow
        icon={websiteIcon}
        title="Website"
        value={website}
        link={`http://${website}`}
      />
      <InfoRow
        icon={facebookIcon}
        title="Facebook"
        value="View on Facebook"
        link={facebook}
      />
      <InfoRow
        icon={linkedInIcon}
        title="Linkedin"
        value="View on Linkedin"
        link={linkedin}
      />
      <InfoRow
        icon={twitterIcon}
        title="Twitter"
        value="View on Twitter"
        link={twitter}
      />
      <InfoRow
        icon={contactEmailIcon}
        title="Contact Email"
        value={contactEmail}
      />
      <InfoRow
        icon={phoneNumberIcon}
        title="Phone Number"
        value={phoneNumber}
      />
    </div>
  </div>
);

AboutUs.propTypes = {
  theme: PropTypes.string,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  founders: PropTypes.string.isRequired,
  dateFounded: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  facebook: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
  contactEmail: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};

AboutUs.defaultProps = {
  theme: 'darkCmc',
};

const mapState = state => ({
  theme: state.theme,
});

export default connect(mapState)(withStyles(s)(AboutUs));
export const WithoutRedux = withStyles(s)(AboutUs);
