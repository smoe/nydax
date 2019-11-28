import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { toastr } from 'react-redux-toastr';
// import Toggle from 'react-bootstrap-toggle';
import routes from '../../constants/routes';
import s from './Footer.css';
import { titles, infos } from '../../constants/messages';
// import moonIcon from './moon.svg';
// import sunIcon from './sun.svg';
// import Button from '../Button';
import themify from '../../themify';
import { updateCurrency } from '../../actions/currency';
import Select from '../Select';
import C from '../../constants/actions';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeColor = this.handleChangeColor.bind(this);
  }

  handleChangeColor = color => {
    if (color === '#ffffff') {
      this.props.setTheme('light');
    } else if (color === '#252d47') {
      this.props.setTheme('dark');
    } else if (color === '#202020') {
      this.props.setTheme('darkCmc');
    }
  };

  render() {
    let colors = [];
    switch (this.props.theme) {
      case 'light':
        colors = ['#252d47', '#202020'];
        break;

      case 'dark':
        colors = ['#ffffff', '#202020'];
        break;

      case 'darkCmc':
        colors = ['#ffffff', '#252d47'];
        break;

      default:
        break;
    }
    return (
      <div className={themify(s, s.root, this.props.theme)}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* <Button>Need Help?</Button> */}
          {/* &nbsp; */}
          <div>
            {/* <Toggle
              style={{ height: 40 }}
              onClick={this.onToggle}
              on={
                <span>
                  <img src={moonIcon} height={15} width={15} alt="moon" />
                </span>
              }
              off={
                <span>
                  <img src={sunIcon} height={15} width={15} alt="sun" />
                </span>
              }
              size="lg"
              offstyle="warning"
              active={this.props.theme !== 'light'}
            /> */}
            {colors.map(color => (
              <span // eslint-disable-line
                className={s.circle}
                style={{ backgroundColor: color }}
                onClick={() => this.handleChangeColor(color)}
              />
            ))}
          </div>
        </div>
        <div>
          {this.props.currentRoute === routes.TRADING_PLATFORM && (
            <div className={s.selectCurrencyContainer}>
              <Select
                options={this.props.currencies}
                onChange={currency => {
                  this.props.onCurrencyChange(currency.value);
                  toastr.info(
                    titles.BASE_CURRENCY_CHANGE,
                    infos.BASE_CURRENCY_CHANGED_TO(
                      this.props.currencies.find(
                        item => currency.value === item.id,
                      ).abbreviation,
                    ),
                  );
                }}
                selectedValue={this.props.baseCurrencyId}
                className="dropUp"
                isBaseCurrency
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  theme: PropTypes.string,
  onCurrencyChange: PropTypes.func,
  baseCurrencyId: PropTypes.number,
  setTheme: PropTypes.func.isRequired,
  currentRoute: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Footer.defaultProps = {
  theme: 'dark',
  onCurrencyChange: () => {},
  baseCurrencyId: 1,
};

const mapState = state => ({
  currencies: state.currencies,
  theme: state.theme,
  baseCurrencyId: state.userInfo.profile.baseCurrencyId,
  currentRoute: state.currentRoute,
});

const mapDispatch = dispatch => ({
  onCurrencyChange(currencyId) {
    dispatch(updateCurrency(currencyId));
  },
  setTheme(theme) {
    dispatch({ type: C.SET_THEME, payload: theme });
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(Footer));
