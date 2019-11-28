import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'react-bootstrap';
import themify from '../../themify';
import removePic from './remove.png';
import checkPic from './check.png';
import s from './SecurityTable.css';
/* eslint-disable css-modules/no-undef-class */

const SecurityTable = ({ data, columns, type, theme, removeSession }) => (
  <div className={themify(s, s.root, theme)}>
    <div className={s.headerContainer}>
      <Row>
        {columns.map(column => (
          <Col key={column} xs={2} style={{ textAlign: 'center' }}>
            <span className={s.header}>{column}</span>
          </Col>
        ))}
        {type === 'session' && (
          <Col xs={2} style={{ textAlign: 'center' }}>
            <span className={s.header}>Remove</span>
          </Col>
        )}
      </Row>
    </div>
    {data.map(row => (
      <div key={row.id} className={s.rowContainer}>
        <Row>
          {Object.keys(row)
            .filter(column => column !== 'id' && column !== 'isCurrentSession')
            .map(column => (
              <Col
                key={`tbody${column}`}
                xs={2}
                style={{ textAlign: 'center' }}
              >
                {row[column]}
              </Col>
            ))}
          {type === 'session' && Object.keys(row).includes('isCurrentSession') && (
            <Col xs={2} style={{ textAlign: 'center' }}>
              {row.isCurrentSession && (
                <img width="22" height="22" src={checkPic} alt="check-img" />
              )}
            </Col>
          )}
          {type === 'session' && !row.isCurrentSession && (
            <Col xs={2} style={{ textAlign: 'center' }}>
              <img // eslint-disable-line
                style={{ cursor: 'pointer' }}
                width="22"
                height="22"
                src={removePic}
                onClick={() => removeSession(row.id)}
                alt="remove-img"
              />
            </Col>
          )}
        </Row>
      </div>
    ))}
  </div>
);

SecurityTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  theme: PropTypes.string,
  removeSession: PropTypes.func,
};

SecurityTable.defaultProps = {
  theme: 'dark',
  removeSession: sessionId => sessionId,
};

const mapState = state => ({
  theme: state.theme,
});

export default connect(mapState)(withStyles(s)(SecurityTable));
