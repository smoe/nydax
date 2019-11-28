/* eslint-disable css-modules/no-unused-class */
/* eslint-disable css-modules/no-undef-class */
import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import {
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Alert,
} from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';
import s from './PersonalInfoForm.css';
import WizardLevels from '../WizardLevels/WizardLevels';
import { validateFirstName, validateLastName } from '../../../validation';
import FieldError from '../../FieldError/FieldError';
import C from './constants';

class PersonalInfoForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      showErrors: false,
    };
  }

  handleSubmit() {
    if (
      validateLastName(this.props.legalLastName) ||
      validateFirstName(this.props.legalFirstName)
    ) {
      this.setState({ showErrors: true });
      return;
    }
    if (
      !this.props.countryId ||
      !this.props.legalFirstName ||
      !this.props.legalLastName
    ) {
      toastr.error(C.ERROR_TITLE, C.ERROR_DESCRIPTION);
      return;
    }
    this.props.onNextButton();
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
          <WizardLevels level={1} />
        </Modal.Header>
        <Modal.Body className={s.modalBody}>
          <p className={s.headerTitle}> {C.TITLE} </p>
          <br />
          <p className={s.description}> {C.DESCRIPTION} </p>
          <div className={s.formContainer}>
            <div className={s.formInline}>
              <FormGroup className={s.customInput} style={{ width: '50%' }}>
                <ControlLabel>{C.LEGAL_NAME}</ControlLabel>
                <FormControl
                  onChange={this.props.onInputFieldChanged}
                  type="text"
                  name={C.LEGAL_FIRST_NAME}
                  placeholder={C.FIRST_NAME}
                  value={this.props.legalFirstName || ''}
                />
                <FieldError
                  color="red"
                  error={validateFirstName(this.props.legalFirstName || '')}
                  show={this.state.showErrors}
                />
              </FormGroup>
              <FormGroup
                style={{ marginTop: 25, marginLeft: 5, width: '50%' }}
                className={s.customInput}
              >
                <FormControl
                  onChange={this.props.onInputFieldChanged}
                  type="text"
                  name={C.LEGAL_MIDDLE_NAME}
                  placeholder={C.MIDDLE_NAME}
                  value={this.props.legalMiddleName || ''}
                />
              </FormGroup>
            </div>
            <FormGroup className={s.customInput} style={{ width: '80%' }}>
              <FormControl
                onChange={this.props.onInputFieldChanged}
                type="text"
                name={C.LEGAL_LAST_NAME}
                placeholder={C.LAST_NAME}
                value={this.props.legalLastName || ''}
              />
              <FieldError
                color="red"
                error={validateLastName(this.props.legalLastName || '')}
                show={this.state.showErrors}
              />
            </FormGroup>
            <FormGroup className={s.customInput} style={{ width: '80%' }}>
              <ControlLabel> {C.COUNTRY_OF_RESIDENCY}</ControlLabel>
              <FormControl
                name={C.COUNTRY_ID}
                onChange={this.props.onInputFieldChanged}
                componentClass="select"
                placeholder={C.COUNTRY_OF_RESIDENCY}
                value={this.props.countryId}
              >
                <option value="">...</option>
                {this.props.countries &&
                  [].concat(this.props.countries).map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </FormControl>
            </FormGroup>
            <Button
              onClick={this.handleSubmit}
              disabled={
                !this.props.countryId ||
                !this.props.legalFirstName ||
                !this.props.legalLastName
              }
              className={s.customBtn}
            >
              {C.NEXT}
            </Button>
          </div>
        </Modal.Body>
      </React.Fragment>
    );
  }
}

PersonalInfoForm.propTypes = {
  legalFirstName: PropTypes.string.isRequired,
  legalMiddleName: PropTypes.string.isRequired,
  legalLastName: PropTypes.string.isRequired,
  countryId: PropTypes.number.isRequired,
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInputFieldChanged: PropTypes.func.isRequired,
  onNextButton: PropTypes.func.isRequired,
  waitingForModification: PropTypes.bool.isRequired,
};

export default withStyles(s)(PersonalInfoForm);
