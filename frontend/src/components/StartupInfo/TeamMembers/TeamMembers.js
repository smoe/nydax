import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'react-bootstrap';
import themify from '../../../themify';
import s from './TeamMembers.css';
/* eslint-disable css-modules/no-undef-class */

const TeamMemberInfo = ({ picture, name, position }) => (
  <Col xs={6}>
    <div className={s.teamMemberCard}>
      <img src={picture} alt="team member" />
      <div>
        <p className={s.teamMemberName}>{name}</p>
        <p className={s.teamMemberPosition}>{position}</p>
      </div>
    </div>
  </Col>
);

TeamMemberInfo.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};

const TeamMembers = ({ theme, description, teamMembers }) => (
  <div className={themify(s, s.root, theme)}>
    <div className={s.header}>Team Members</div>
    <div className={s.description}>
      <p>{description}</p>
    </div>
    <div className={s.members}>
      <Row>
        {teamMembers.map(item => (
          <TeamMemberInfo
            picture={item.picture}
            name={item.name}
            position={item.position}
          />
        ))}
      </Row>
    </div>
  </div>
);

TeamMembers.propTypes = {
  theme: PropTypes.string,
  description: PropTypes.string.isRequired,
  teamMembers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TeamMembers.defaultProps = {
  theme: 'darkCmc',
};

const mapState = state => ({
  theme: state.theme,
});

export default connect(mapState)(withStyles(s)(TeamMembers));
export const WithoutRedux = withStyles(s)(TeamMembers);
