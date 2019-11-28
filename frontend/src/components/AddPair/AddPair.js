import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Modal as BSModal,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
} from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';
import { addFavouriteChart } from '../../actions/pairs';
import s from './AddPair.css';
import Modal from '../Modal';

class AddPair extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddingPairModal: false,
      pairId:
        props.pairs.length > 0
          ? props.pairs.filter(
              pair => !props.favouriteCharts.includes(pair.id),
            )[0].id
          : null,
    };
    this.handleAddingPair = this.handleAddingPair.bind(this);
    this.closeAddingPairModal = this.closeAddingPairModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.favouriteCharts.length === 5)
      this.setState({
        showAddingPairModal: false,
      });
    this.setState({
      pairId: nextProps.pairs.filter(
        pair => !nextProps.favouriteCharts.includes(pair.id),
      )[0].id,
    });
  }

  handleAddingPair() {
    if (!this.state.pairId) {
      toastr.warning('Select Pair', 'Please select a token pair.');
      return;
    }
    this.props.onPairAdd(this.state.pairId);
  }

  closeAddingPairModal() {
    this.setState({
      showAddingPairModal: false,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div
          data-tut="addPair"
          role="presentation"
          className={this.props.float ? s.floatRoot : s.root}
          style={{ height: this.props.height || 160 }}
          onClick={() => {
            this.setState({ showAddingPairModal: true });
          }}
        >
          <i
            className="fa fa-plus-circle"
            style={this.props.float ? { marginLeft: 5 } : { marginBottom: 5 }}
          />
          <span>Add Pair</span>
        </div>
        <Modal
          show={this.state.showAddingPairModal}
          onHide={this.closeAddingPairModal}
        >
          <BSModal.Header closeButton />
          <BSModal.Body style={{ padding: 40, paddingTop: 15 }}>
            <p className={s.headerTitle}>Add Pair History Chart</p>
            <FormGroup
              className={s.customInput}
              style={{ width: '100%', marginTop: 15 }}
            >
              <ControlLabel>Select Pair</ControlLabel>
              <FormControl
                name="pairId"
                onChange={event =>
                  this.setState({ pairId: Number(event.target.value) })
                }
                componentClass="select"
                placeholder="Select Pair"
              >
                {/* <option value="">...</option> */}
                {this.props.pairs &&
                  this.props.pairs
                    .filter(
                      pair => !this.props.favouriteCharts.includes(pair.id),
                    )
                    .map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
              </FormControl>
            </FormGroup>
            <br />
            <Button
              onClick={this.handleAddingPair}
              className={s.customBtn}
              style={{ width: '100%' }}
              block
            >
              Add Chart
            </Button>
          </BSModal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

AddPair.propTypes = {
  pairs: PropTypes.arrayOf(PropTypes.object).isRequired,
  favouriteCharts: PropTypes.arrayOf(PropTypes.number).isRequired,
  onPairAdd: PropTypes.func.isRequired,
  height: PropTypes.number,
  float: PropTypes.bool,
};

AddPair.defaultProps = {
  float: false,
  height: 160,
};

const mapState = state => ({
  pairs: state.pairs,
  favouriteCharts: state.userInfo.favouriteCharts,
});

const mapDispatch = dispatch => ({
  onPairAdd(pairId) {
    dispatch(addFavouriteChart(pairId));
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(AddPair));
export const WithoutRedux = withStyles(s)(AddPair);
