import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Panel from '../../components/Panel';
import TokenSummaryCard from '../../components/StartupInfo/TokenSummaryCard';
import TeamMembers from '../../components/StartupInfo/TeamMembers';
import AboutUs from '../../components/StartupInfo/AboutUs';
import invoLogo from '../../../public/invo-logo.png';
import teamMemberPic from '../../components/Header/user.png';
import s from './StartupInfo.css';

/* eslint-disable css-modules/no-undef-class */

const startupsInfo = [
  {
    tokenId: 3,
    summary: {
      tokenLogo: invoLogo,
      tokenSymbol: 'INVO',
      companyName: 'NYDAX',
      companyDescription: 'Innovation exchange platform',
      price: '$0.08',
      soldTokens: 45920,
      totalTokenAmount: 888000000,
    },
    videoPlayer: {
      url: 'https://www.youtube.com/watch?v=Ci3PoUjtBOE',
    },
    aboutUs: {
      description: `Innovation Network is aiming to be the marketplace to tokenize and list innovation-related projects, and it's aiming to disrupt crowdfunding space by introducing its Blockchain driven Innovation Exchange Platform (IXP) on top of the revolutionary Utility and Security based Tokenizer Engine.`,
      location: 'Sydney, NSW, Australia',
      founders: 'Yousef Hosseini',
      dateFounded: 'Aug 18, 2017',
      website: 'www.innovation.net',
      facebook: 'http://www.facebook.com',
      linkedin: 'http://www.linkedin.com',
      twitter: 'http://www.twitter.com',
      contactEmail: 'contact@innovation.net',
      phoneNumber: '(461)849-566',
    },
    teamMembers: {
      description: `NYDAX has 7 current team members, including Co-Founder & CEO Sam Yousef Hosseini.`,
      members: [
        {
          picture: teamMemberPic,
          name: 'Yousef\u00a0Hosseini',
          position: 'Founder\u00a0&\u00a0CEO',
        },
        {
          picture: teamMemberPic,
          name: 'Nevile\u00a0Bradbury',
          position: 'Advisor',
        },
        {
          picture: teamMemberPic,
          name: 'Gerald\u00a0Thomas',
          position: 'Advisor',
        },
        {
          picture: teamMemberPic,
          name: 'Dr.Rita\u00a0Matulionyte',
          position: 'Advisor',
        },
        {
          picture: teamMemberPic,
          name: 'Dr.Reza\u00a0Kahlaie',
          position: 'Advisor',
        },
        {
          picture: teamMemberPic,
          name: 'Dr.Vahid\u00a0Asadi',
          position: 'Advisor',
        },
        {
          picture: teamMemberPic,
          name: 'Vaz\u00a0Hovanesian',
          position: 'Advisor',
        },
      ],
    },
  },
  {
    tokenId: 4,
    summary: {
      tokenLogo: invoLogo,
      tokenSymbol: 'ACB',
      companyName: 'Intelisa',
      companyDescription: 'AI and blockchain company',
      price: '$0.04',
      soldTokens: 0,
      totalTokenAmount: 100000000,
    },
    videoPlayer: {
      url: 'https://www.youtube.com/watch?v=Ci3PoUjtBOE',
    },
    aboutUs: {
      description: `A key issue for many institutions these days is automating answering to clients. But developing semantic
      question answering framework is a real challenge. Categorizing question types, semantically weak
      constructions, lexical ambiguities, syntactic ambiguities, scope ambiguities, spatial prepositions,
      adjective modifiers and superlatives, aggregation, comparison and negation operators, non-
      compositionality, and out of scope questions are only some of the challenges to be handled by an
      automated answering engine. With Lisa, we’ve automated as much of the process as possible. Lisa is a
      highly-accurate Semantic Question Answering Engine based on Natural Language Processing which
      listens to users questions and retrieves an answer from the provided dataset that best fits the asked
      question. Afterwards, Lisa uses artificial intelligence to clone an individual’s voice and then say the
      retrieved answer in the same voice. Lisa needs just a few minutes sample to clone a voice.`,
      location: 'Sydney, NSW, Australia',
      founders: 'Intelisa PTY LTD',
      dateFounded: 'Apr 11, 2019',
      website: 'www.intelisa.com',
      facebook: 'http://www.facebook.com',
      linkedin: 'http://www.linkedin.com',
      twitter: 'http://www.twitter.com',
      contactEmail: 'contact@intelisa.com',
      phoneNumber: '(461)849-566',
    },
    teamMembers: {
      description: `Our team is made up of professionals and specialists of proven ethical probity, having an academic
      education and professional experience and captained by a true leader. Our mission is to build the best AI
      Chatbot possible so that customers and experts have profitable and worthwhile experiences with
      conversations!`,
      members: [
        {
          picture: teamMemberPic,
          name: 'Erfan\u00a0Zangeneh',
          position: 'coFounder\u00a0&\u00a0CEO',
        },
        {
          picture: teamMemberPic,
          name: 'Reza\u00a0Agahi',
          position: 'coFounder',
        },
        {
          picture: teamMemberPic,
          name: 'Taher\u00a0Abbasi',
          position: 'coFounder',
        },
        {
          picture: teamMemberPic,
          name: 'Yousef\u00a0Hosseini',
          position: 'coFounder\u00a0&\u00a0marketing',
        },
        {
          picture: teamMemberPic,
          name: 'Mostafa\u00a0Hadian',
          position: 'Backend developer',
        },
        {
          picture: teamMemberPic,
          name: 'Mohsen\u00a0Tamiz',
          position: 'Backend developer',
        },
        {
          picture: teamMemberPic,
          name: 'Saeed\u00a0Torabzadeh',
          position: 'Frontend developer',
        },
      ],
    },
  },
  {
    tokenId: 7,
    summary: {
      tokenLogo: invoLogo,
      tokenSymbol: 'AIT',
      companyName: 'AI trader',
      companyDescription: 'AI and blockchain company',
      price: '$0.04',
      soldTokens: 0,
      totalTokenAmount: 100000000,
    },
    videoPlayer: {
      url: 'https://www.youtube.com/watch?v=Ci3PoUjtBOE',
    },
    aboutUs: {
      description: `AI-Trader utilizes artificial intelligence to benefit cryptocurrency and traditional traders by analyzing
      behaviors and determining when a prospective trade may be the result of stress, greed, or panic -
      without the fallbacks of human error. It features dynamic risk management and global diversification,
      and aims to catch the best trading opportunities and reduce error rates.`,
      location: 'Sydney, NSW, Australia',
      founders: 'Intelisa PTY LTD',
      dateFounded: 'Apr 11, 2019',
      website: 'www.intelisa.com',
      facebook: 'http://www.facebook.com',
      linkedin: 'http://www.linkedin.com',
      twitter: 'http://www.twitter.com',
      contactEmail: 'contact@intelisa.com',
      phoneNumber: '(461)849-566',
    },
    teamMembers: {
      description: `Our young, dynamic team is made up of both AI specialists and Trade experts. This way we can provide
      you with knowledgeable advice on how to increase profitability by making reliable risk assessments.`,
      members: [
        {
          picture: teamMemberPic,
          name: 'Erfan\u00a0Zangeneh',
          position: 'coFounder\u00a0&\u00a0CEO',
        },
        {
          picture: teamMemberPic,
          name: 'Reza\u00a0Agahi',
          position: 'coFounder',
        },
        {
          picture: teamMemberPic,
          name: 'Taher\u00a0Abbasi',
          position: 'coFounder',
        },
        {
          picture: teamMemberPic,
          name: 'Yousef\u00a0Hosseini',
          position: 'coFounder\u00a0marketing',
        },
        {
          picture: teamMemberPic,
          name: 'Mostafa\u00a0Hadian',
          position: 'Backend developer',
        },
        {
          picture: teamMemberPic,
          name: 'Mohsen\u00a0Tamiz',
          position: 'Backend developer',
        },
        {
          picture: teamMemberPic,
          name: 'Saeed\u00a0Torabzadeh',
          position: 'Frontend developer',
        },
      ],
    },
  },
  {
    tokenId: 6,
    summary: {
      tokenLogo: invoLogo,
      tokenSymbol: 'CRN',
      companyName: 'Carnition',
      companyDescription: 'AI company',
      price: '$0.04',
      soldTokens: 0,
      totalTokenAmount: 100000000,
    },
    videoPlayer: {
      url: 'https://www.youtube.com/watch?v=Ci3PoUjtBOE',
    },
    aboutUs: {
      description: `Carnition is a deep learning engine for processing images and video frames in real time. Afterwards, it
      sends the extracted information back to user. It can do Plate Detection, Weather Classification, Color
      Classification, Car Type Classification, Car Make and Model Classification, Fire and Smoke Detection in
      videos and images and most importantly, it has the capability to scale out.`,
      location: 'Sydney, NSW, Australia',
      founders: 'Faraadid PTY LTD',
      dateFounded: 'Aug 02, 2017',
      website: 'www.carnition.com',
      facebook: 'http://www.facebook.com',
      linkedin: 'http://www.linkedin.com',
      twitter: 'http://www.twitter.com',
      contactEmail: 'contact@carnition.com',
      phoneNumber: '(461)849-566',
    },
    teamMembers: {
      description: `Carnition team is made up of AI experts, data scientists, and seasoned veterans with experience building
      companies that drive value and change the face of technology.`,
      members: [
        {
          picture: teamMemberPic,
          name: 'Ali\u00a0Mirzaei',
          position: 'CEO',
        },
        {
          picture: teamMemberPic,
          name: 'Erfan\u00a0Zangeneh',
          position: 'Backend developer',
        },
        {
          picture: teamMemberPic,
          name: 'Reza\u00a0Agahi',
          position: 'Frontend developer',
        },
        {
          picture: teamMemberPic,
          name: 'Saeed\u00a0Torabzadeh',
          position: 'Advisor',
        },
        {
          picture: teamMemberPic,
          name: 'Ebrahim\u00a0Soroush',
          position: 'Advisor',
        },
        {
          picture: teamMemberPic,
          name: 'Alireza\u00a0Davoudi',
          position: 'Backend developer',
        },
      ],
    },
  },
  {
    tokenId: 5,
    summary: {
      tokenLogo: invoLogo,
      tokenSymbol: 'TRZ',
      companyName: 'Tradiz',
      companyDescription: 'Software engineering company',
      price: '$0.04',
      soldTokens: 0,
      totalTokenAmount: 100000000,
    },
    videoPlayer: {
      url: 'https://www.youtube.com/embed/TomPdrexk6U',
    },
    aboutUs: {
      description: `Tradiz app is designed for Tradespeople , it allows them to list their services and be on the road and in touch with their customers, customer will look up tradies profile and their calendar, ranking and rating on the map and will find the closest tradesman on the road. App allows customers to post their jobs and select a tradesman and request a quotation. It also enables tradesman to unlock the job details and quote on the jobs . Tradesman can earn points by inviting their colleges to the app and points will be used to unlock the jobs.`,
      location: 'Sydney, NSW, Australia',
      founders: 'Yousef Hosseini',
      dateFounded: 'Jan 26, 2019',
      website: 'www.tradiz.net',
      facebook: 'http://www.facebook.com',
      linkedin: 'http://www.linkedin.com',
      twitter: 'http://www.twitter.com',
      contactEmail: 'contact@tradiz.net',
      phoneNumber: '(461)849-566',
    },
    teamMembers: {
      description: `Tradiz has 8 current team members, including Co-Founder & CEO Sam Yousef Hosseini.`,
      members: [
        {
          picture: teamMemberPic,
          name: 'Yousef\u00a0Hosseini',
          position: 'Founder\u00a0CEO',
        },
        {
          picture: teamMemberPic,
          name: 'Mehdi\u00a0Nazari',
          position: 'Backend and android developer',
        },
        {
          picture: teamMemberPic,
          name: 'Sajjad\u00a0Khoshnoudi',
          position: 'Frontend developer',
        },
      ],
    },
  },
];

class StartupInfo extends React.Component {
  render() {
    const info = startupsInfo.find(
      item => item.tokenId === Number(this.props.tokenId),
    );
    return (
      <React.Fragment>
        <div className={s.colContainer}>
          <div className={s.tokenSummaryCardCol}>
            <Panel theme={this.props.theme} style={{ height: '100%' }}>
              <TokenSummaryCard
                tokenLogo={info.summary.tokenLogo}
                tokenId={info.tokenId}
                tokenSymbol={info.summary.tokenSymbol}
                companyName={info.summary.companyName}
                companyDescription={info.summary.companyDescription}
                price={info.summary.price}
                soldTokens={info.summary.soldTokens}
                totalTokenAmount={info.summary.totalTokenAmount}
              />
            </Panel>
          </div>
          <div className={s.playerCol}>
            <ReactPlayer
              url={info.videoPlayer.url}
              controls
              width="100%"
              height="100%"
            />
          </div>
        </div>

        <div className={s.colContainer}>
          <div className={s.aboutUsCol}>
            <Panel theme={this.props.theme} style={{ height: '100%' }}>
              <AboutUs
                description={info.aboutUs.description}
                location={info.aboutUs.location}
                founders={info.aboutUs.founders}
                dateFounded={info.aboutUs.dateFounded}
                website={info.aboutUs.website}
                facebook={info.aboutUs.facebook}
                linkedin={info.aboutUs.linkedin}
                twitter={info.aboutUs.twitter}
                contactEmail={info.aboutUs.contactEmail}
                phoneNumber={info.aboutUs.phoneNumber}
              />
            </Panel>
          </div>
          <div className={s.teamMemberCol}>
            <Panel theme={this.props.theme} style={{ height: '100%' }}>
              <TeamMembers
                description={info.teamMembers.description}
                teamMembers={info.teamMembers.members}
              />
            </Panel>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

StartupInfo.propTypes = {
  theme: PropTypes.string,
  tokenId: PropTypes.number.isRequired,
};

StartupInfo.defaultProps = {
  theme: 'dark',
};

const mapState = state => ({
  tokens: state.tokens,
  theme: state.theme,
});

export default connect(mapState)(withStyles(s)(StartupInfo));
