import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  FormGroup,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import QRCode from 'qrcode.react';
import { toastr } from 'react-redux-toastr';
import copy from 'copy-to-clipboard';
import themify from '../../themify';
import s from './DepositAddress.css';
import { infos } from '../../constants/messages';
/* eslint-disable css-modules/no-undef-class */

const DepositAddress = ({ wallets, tokens, selectedTokenId, theme }) => {
  const wallet = wallets.find(item => item.tokenId === selectedTokenId);
  const token = tokens.find(item => item.id === selectedTokenId);
  const copyToClipboard = () => {
    copy(wallet.address);
    toastr.info(
      infos.COPY_TO_CLIPBOARD_TITLE,
      infos.COPY_TO_CLIPBOARD_DESCRIPTION_DEPOSIT,
    );
  };

  return (
    <div className={themify(s, s.root, theme)}>
      {/* <p className={s.depositAddressLabel}>
        {token.name} Token Deposit Address
      </p> */}
      <Row style={{ margin: 0 }}>
        <Col style={{ padding: 0 }} md={3} xs={4}>
          <QRCode value={wallet.address} size={120} />
        </Col>
        <Col md={9} xs={8} style={{ padding: 0 }}>
          <FormGroup className={s.customInput} controlId="selectCountry">
            <p
              className={s.description}
            >{`${token.name.toUpperCase()} Wallet Address`}</p>
            <InputGroup>
              <FormControl
                value={wallet.address}
                type="text"
                name="walletAddress"
                readOnly
              />
              <InputGroup.Button>
                <Button
                  className={s.copyButton}
                  onClick={() => {
                    copyToClipboard();
                  }}
                >
                  <i className="fa fa-copy" />
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
      {/* <span
        role="presentation"
        onClick={() => {
          copyToClipboard();
        }}
        className={s.copyAddress}
      >
        <i className="fa fa-copy" />
      </span> */}
    </div>
  );
};

DepositAddress.propTypes = {
  theme: PropTypes.string,
  wallets: PropTypes.arrayOf(PropTypes.object).isRequired,
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTokenId: PropTypes.number.isRequired,
};

DepositAddress.defaultProps = {
  theme: 'dark',
};

const mapState = state => ({
  tokens: state.tokens,
  wallets: state.userInfo.wallets,
  selectedTokenId: state.selectedTokenId,
  theme: state.theme,
});

export default connect(mapState)(withStyles(s)(DepositAddress));
export const WithoutRedux = withStyles(s)(DepositAddress);
