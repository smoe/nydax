import axios from 'axios';
import io from 'socket.io-client';
import config from '../../config';

const socket = io(config.api.websocketUrl, {
  secure: true,
  transports: ['websocket'],
});

const supportedResolutions = [
  '1S',
  '1',
  '3',
  '5',
  '15',
  '30',
  '60',
  '120',
  '240',
  'D',
];

const datafeed = pairs => ({
  onReady: cb => {
    setTimeout(
      cb({
        exchanges: [
          // {
          //   value: 'NYDAX',
          //   name: 'NYDAX',
          //   desc: 'Digital Asset Exchange',
          // },
        ],
        symbols_types: [{ name: 'Cryptocurrency', value: 'Cryptocurrency' }],
        supported_resolutions: supportedResolutions,
        supports_marks: false, // Boolean showing whether your datafeed supports marks on bars or not.
        supports_timescale_marks: false, // showing whether your datafeed supports timescale marks or not.
        supports_time: false, // Set this one to true if your datafeed provides server time (unix time).
      }),
      0,
    );
  },
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    onResultReadyCallback(
      pairs
        .map(pair => pair.name)
        .filter(item => item.toLowerCase().includes(userInput.toLowerCase())),
    );
  },
  resolveSymbol: (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback,
  ) => {
    // TODO: use a correct value for timezone
    // expects a symbolInfo object in response
    const symbolInfo = {
      name: symbolName,
      // ticker: null, // If you specify this property then its value will be used for all data requests for this symbol.
      // description: pairs.find(item => item.name === symbolName).description,
      // type: pairs.find(item => item.name === symbolName).type,
      // session: pairs.find(item => item.name === symbolName).session, // Trading hours for this symbol
      session: '24x7',
      supported_resolutions: supportedResolutions,
      timezone: 'America/New_York', // Exchange timezone for this symbol. We expect to get name of time zone in olsondb format.
      minmov: 1,
      pricescale: 100000000,
      // fractional: false,
      // minmove2: 0,
      has_seconds: true,
      seconds_multipliers: ['1'],
      has_intraday: true, // Boolean showing whether symbol has intraday (minutes) history data.
      intraday_multipliers: ['1'],
      // has_weekly_and_monthly: false, // The boolean value showing whether datafeed has its own W and M resolution bars or not.
      // has_empty_bars: false,
      // force_session_rebuild: null, // The boolean value showing whether library should filter bars with current session.
      // has_no_volume: null, // Boolean showing whether symbol has volume data or not.
      volume_precision: 8, // Integer showing typical volume value decimal places for this symbol.
      // expired: null, // Boolean showing whether this symbol is expired futures contract or not.
      // expiration_date: null, // Unix timestamp of expiration date. One must set this value if expired = true. Charting Library will request data for this symbol starting from that time point instead of actual moment.
      // sector: null, // Sector for stocks to be displayed in Symbol Info.
      // industry: null, // Industry for stocks to be displayed in Symbol Info.
      data_status: 'streaming',
    };
    setTimeout(onSymbolResolvedCallback(symbolInfo), 0);
    setTimeout(
      onResolveErrorCallback('Something went wrong with symbol resolve.'),
      0,
    );
  },
  getBars(
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest, // eslint-disable-line no-unused-vars
  ) {
    let requiredHistory = 'tickHistory';
    switch (resolution) {
      case '1':
        requiredHistory = 'minuteHistory';
        break;
      case '1S':
        requiredHistory = 'tickHistory';
        break;
      case '1D':
        requiredHistory = 'dayHistory';
        break;
      default:
        break;
    }

    return axios
      .get(
        `${config.api.serverUrl}/v1/price/${requiredHistory}?pairId=${
          pairs.find(pair => pair.name === symbolInfo.name).id
        }`,
        { headers: { [config.apiKeyHeader]: config.apiKey } },
      )
      .then(response => {
        let bars = response.data;
        switch (resolution) {
          case '1':
            bars = bars.map(bar => ({
              open: bar.open,
              high: bar.high,
              low: bar.low,
              close: bar.close,
              volume: bar.volume,
              time: new Date(bar.createdAt).getTime(),
            }));
            break;
          case '1S':
            bars = bars.map(bar => ({
              open: bar.price,
              high: bar.price,
              low: bar.price,
              close: bar.price,
              // volume: bar.volume,
              time: new Date(bar.createdAt).getTime(),
            }));
            break;
          case '1D':
            bars = bars.map(bar => ({
              open: bar.open,
              high: bar.high,
              low: bar.low,
              close: bar.close,
              volume: bar.volume,
              time: new Date(bar.createdAt).getTime(),
            }));
            break;
          default:
            break;
        }
        if (bars.length) {
          onHistoryCallback(bars.reverse(), { noData: false });
        } else {
          onHistoryCallback(bars, { noData: true });
        }
      })
      .catch(err => {
        onErrorCallback(err);
      });
  },
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID, // eslint-disable-line no-unused-vars
  ) => {
    if (resolution === '1') {
      socket.on(subscriberUID, data => {
        if (data)
          onRealtimeCallback({
            ...data,
            time: new Date(data.createdAt).getTime(),
          });
      });
    } else if (resolution === '1S') {
      const pairName = subscriberUID.split('_')[0];
      socket.on(`${pairName}_price`, data => {
        data = JSON.parse(data); // eslint-disable-line
        if (data && data.type === 'price') {
          const date = new Date();
          let time = date.getTime();
          time -= date.getTimezoneOffset() * 60 * 1000;
          // TODO: check it after matching prepared price object
          onRealtimeCallback({
            open: data.payload.lastPrice,
            close: data.payload.lastPrice,
            low: data.payload.lastPrice,
            high: data.payload.lastPrice,
            time,
          });
        }
      });
    }
    // subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID);
  },
  unsubscribeBars: subscriberUID => {
    // console.log('res', subscriberUID);
    // eslint-disable-line no-unused-vars
    const resolution = subscriberUID.split('_')[1];
    if (resolution === '1') socket.removeAllListeners(subscriberUID);
  },
});

export default datafeed;
