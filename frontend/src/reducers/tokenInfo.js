const tokenInfoTestData = {
  id: 3,
  tokenName: 'Innovation',
  symbol: 'INVO',
  tokenType: 'Security',
  contractAddress: '0xkljsdfn54as5dc54Asd4fg5aD54',
  contractAddressLink:
    'https://etherscan.io/address/0xd02c52f828a35b808ce8335e7f02805dcc380b35',
  maxSupply: '2500000',
  tokenCirculation: '3521400',
  numberOfHolders: 25410,
  issuer: {
    name: 'NYDAX',
    siteUrl: 'http://innovation.net',
    siteName: 'innovation.net',
    telegramUrl: 'https://t.me/innovationNetwork',
    telegramId: '@InnovationNetwork',
    discloserUrl: 'http://innovation.net/',
  },
  aboutToken:
    'Tokens allocated to the team and advisors are subject to a 2 years distribution period. Starting from the end of the TGE, the team and advisors will receive 20% of their allocated tokens every 3 months until the distribution is fully completed.',
  buyerAgreementUrl: 'http://innovation.net',
  reDistributionAgreementUrl: 'http://innovation.net/',
  marketAllocationData: [100, 200, 300, 400],
  teamAllocationData: [100, 200, 300, 400],
};

export default function tokenInfo() {
  return tokenInfoTestData;
}
