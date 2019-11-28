import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
// import IxpSpinner from '../IxpSpinner';
import datafeed from './datafeed';
import s from './TradingView.css';
import C from '../../constants/actions';

const getLanguageFromURL = () => {
  const regex = new RegExp('[\\?&]lang=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const getColorBasedOnTheme = theme => {
  let output;
  switch (theme) {
    case 'light':
      output = '#fff';
      break;

    case 'dark':
      output = '#252d47';
      break;

    case 'darkCmc':
      output = '#202020';
      break;

    default:
      break;
  }
  return output;
};

const getCssFilePath = theme => {
  let output;
  switch (theme) {
    case 'light':
      output = '/charting_library/custom-light.css';
      break;

    case 'dark':
      output = '/charting_library/custom-dark.css';
      break;

    case 'darkCmc':
      output = '/charting_library/custom-darkCmc.css';
      break;

    default:
      break;
  }
  return output;
};

class TradingView extends React.Component {
  componentDidMount() {
    this.props.setChartReady(false);
    this.pair = this.props.pairs.find(
      pair => pair.id === this.props.selectedPairId,
    );

    const tz = this.props.timezones.find(
      item => item.id === this.props.timezoneId,
    );

    const widgetOptions = {
      debug: false,
      symbol: this.pair && this.pair.name, // Initial symbol
      interval: '1', // Initial interval
      container_id: this.props.containerId, // id attribute of a DOM element you want to contain the widget.
      datafeed: datafeed(this.props.pairs), // JavaScript object implementing appropriate interface to feed the chart data
      timezone: tz && tz.tvCategory, // 'Etc/UTC', Initial timezone of the chart. Numbers on time scale depend on this timezone
      library_path: '/charting_library/', // A path to static folder
      // width: null, // The desired width of a widget.
      // height: null, // The desired height of a widget.
      fullscreen: false, // Boolean value showing whether chart should occupy all the available space in the window.
      autosize: true, // Boolean value showing whether chart should occupy all the available space in the container and resize with it is resized.
      symbol_search_request_delay: 0, // Delay in milliseconds to wait after key is pressed before making a symbol search request.
      auto_save_delay: 0, // Delay in seconds to wait before onAutoSaveNeeded can be called again.
      toolbar_bg: getColorBasedOnTheme(this.props.theme),
      // study_count_limit: null, // Maximum amount of studies on a chart or multichart layout. Minimum value is 2.
      locale: getLanguageFromURL() || 'en', // Locale to be used by Charting Library.
      // studies_access: null,
      // drawings_access: null,
      // saved_data: null,
      favorites: {
        chartTypes: ['Area', 'Line', 'Candles', 'Bars', 'Baseline'],
      },
      disabled_features: this.props.isAdvanced
        ? [
            'header_saveload',
            'header_screenshot',
            'create_volume_indicator_by_default',
            'header_compare',
            'header_settings',
            'save_chart_properties_to_local_storage',
            'header_symbol_search',
            // 'symbol_info',
          ]
        : [
            'header_saveload',
            'header_indicators',
            'header_screenshot',
            'header_undo_redo',
            'header_compare',
            'header_fullscreen_button',
            'header_settings',
            'create_volume_indicator_by_default',
            'control_bar',
            'timeframes_toolbar',
            'edit_buttons_in_legend',
            'save_chart_properties_to_local_storage',
            'header_symbol_search',
          ], // The array containing names of features which should be disabled
      enabled_features: ['side_toolbar_in_fullscreen_mode'], // The array containing names of features which should be enabled
      // snapshot_url: null,
      // indicators_file_name: null,
      // preset: null, // preset is a name of a set of pre-defined widget settings.  For now, the only mobile preset is supported.
      // time_frames: null, // List of time frames visible in timeframes picker at the bottom of the chart.
      // charts_storage_url: 'https://saveload.tradingview.com',
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
      charts_storage_api_version: '1.1',
      custom_css_url: getCssFilePath(this.props.theme), // Adds your custom css to the chart.(since 1.4)
      // favorites: null, // Items which should be favored by default.
      // studies_overrides: null, // Use this option to customize default indicators' style or inputs.
      overrides: {
        'mainSeriesProperties.showCountdown': true,
        'paneProperties.background': getColorBasedOnTheme(this.props.theme),
        'paneProperties.vertGridProperties.color': getColorBasedOnTheme(
          this.props.theme,
        ),
        'paneProperties.horzGridProperties.color': getColorBasedOnTheme(
          this.props.theme,
        ),
        'symbolWatermarkProperties.transparency': 90,
        'scalesProperties.textColor': '#AAA',
        'mainSeriesProperties.candleStyle.wickUpColor': '#336854',
        'mainSeriesProperties.candleStyle.wickDownColor': '#7f323f',
      },
    };

    this.tvWidget = new window.TradingView.widget(widgetOptions); // eslint-disable-line new-cap
    this.tvWidget.onChartReady(() => {
      this.props.setChartReady(true);
    });
    if (this.props.isAdvanced) window.tvWidgetAdvanced = this.tvWidget;
    else window.tvWidgetSimple = this.tvWidget;
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  componentWillUnmount() {
    if (this.tvWidget && this.props.tvChartIsReady) {
      this.tvWidget.remove();
      this.tvWidget = null;
      window.tvWidgetSimple = null;
      window.tvWidgetAdvanced = null;
    }
  }

  render() {
    // console.log('this.props.tvChartIsReady', this.props.tvChartIsReady);

    return (
      <div style={{ height: this.props.height, position: 'relative' }}>
        <div id={this.props.containerId} className={s.container} />
      </div>
    );
  }
}

TradingView.propTypes = {
  pairs: PropTypes.arrayOf(PropTypes.object).isRequired,
  timezones: PropTypes.arrayOf(PropTypes.object).isRequired,
  timezoneId: PropTypes.number.isRequired,
  containerId: PropTypes.string.isRequired,
  selectedPairId: PropTypes.number.isRequired, // eslint-disable-line
  isAdvanced: PropTypes.bool,
  theme: PropTypes.string.isRequired,
  height: PropTypes.string,
  setChartReady: PropTypes.func.isRequired,
  tvChartIsReady: PropTypes.bool.isRequired,
};

TradingView.defaultProps = {
  isAdvanced: false,
  height: '408px',
};

const mapState = state => ({
  theme: state.theme,
  pairs: state.pairs,
  timezones: state.timezones,
  timezoneId: state.userInfo.profile.timezoneId || 1,
  selectedPairId:
    state.pairs.length >= state.selectedPairId ? state.selectedPairId : 1,
  tvChartIsReady: state.tvChartIsReady,
});

const mapDispatch = dispatch => ({
  setChartReady(isReady) {
    dispatch({ type: C.SET_TV_CHART_READY, payload: isReady });
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(TradingView));
export const WithoutRedux = withStyles(s)(TradingView);
