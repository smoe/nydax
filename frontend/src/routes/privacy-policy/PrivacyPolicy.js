/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PrivacyPolicy.css';

class PrivacyPolicy extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <h3> {'PRIVACY POLICY'} </h3>
        <div
          style={{ maxHeight: this.props.inModal ? '400px' : '100%' }}
          className={s.agreementCon}
        >
          <p className={s.agreementConHeader}>[Last revised: 21 Feb 2019]</p>
          <p>
            This statement sets out the privacy policy of NYDAX which is located
            at{' '}
            <a className={s.jumpLink} href="http://www.nydax.com/privacypolicy">
              http://www.nydax.com/privacypolicy
            </a>{' '}
            and any services or features which are available to you from this
            website.
          </p>
          <p>
            We are committed to protect your personal data and respect your
            privacy. This privacy notice (together with the Terms of Service
            Agreement) sets out the basis on which any personal data we collect
            from you, or that you provide to us, will be processed by us and
            what choices you have about your personal data. Please read the
            following carefully to understand our views and practices regarding
            your personal data and how we will treat it.
          </p>
          <p>
            This privacy notice is aligned with the General Data Protection
            Regulation (EU).
          </p>

          <p className={s.agreementConHeader}>
            Collection and use of personal information
          </p>
          <p>
            <b>Company</b> – Millenium mind <br />
            <b>Data Controller</b> – the natural or legal person, which, alone
            or jointly with others, determines the purposes and means of the
            processing of personal data. where the purposes and means of such
            processing are determined by the Law. In this instance, the Company
            is the Data Controller. <br />
            <b>Data Processor</b> – a natural or legal person, public authority,
            agency or other body which processes personal data on behalf of the
            controller. <br />
            <b>Data Subject</b> – the individual in relation to which the
            Company is holding information about. in the context this is
            employees, partners, customers, other individuals to whom the
            Company renders services. <br />
            <b>Law</b> – General Data Protection Regulation (EU) 2016/679 of 27
            April 2016. <br />
          </p>

          <p className={s.agreementConHeader}>
            What information do we collect?
          </p>
          <p>
            We collect personal information about you when you use our products
            or services, or deal with us in some way.
          </p>
          <p>
            We collect information about you from a variety of sources, such as:
            <ul>
              <li>
                Applications, personal financial statements, and other written
                or electronic communications reflecting information such as your
                name, address, birth date, identification number, occupation,
                assets, and income.
              </li>
              <li>
                Transactional account history including your account balance,
                payment records, and credit card usage.
              </li>
              <li>
                Information received from third parties, (e.g. government,
                regulatory, or credit agencies).
              </li>
            </ul>
            This includes collecting information when you:
            <ul>
              <li>
                Contact us — for example, when you sign up, fill in an
                application or order form, give us feedback or make a complaint.
              </li>
              <li>
                Use our products or services – for example, when you perform
                transactions, make exchange operations.
              </li>
              <li>Visit our website</li>
            </ul>
            The information we collect from you may include:
            <ul>
              <li>
                Information about your identity — including your name,
                citizenship, date of birth and other identity information.
              </li>
              <li>
                Information about correspondence data may include your actual
                address and residency, telephone number, email address.
              </li>
              <li>
                Information about transaction data may include financial,
                transaction information, card details.
              </li>
              <li>
                Information about your payment instruments (i.e. instruments
                used for deposit and withdrawal of funds within the
                Application), including details of bank cards and cryptocurrency
                public addresses.
              </li>
              <li>
                When you visit our website, we collect usage data —your location
                information, IP address, browser type and version, device ID,
                operation system and any third-party sites you access.
              </li>
              <li>
                Know your customer, Anti-Money-Laundering and other verification
                information.
              </li>
              <li>
                Other personal information, such as details of your interactions
                with us.
              </li>
            </ul>
          </p>
          <p className={s.agreementConHeader}>What are your rights?</p>
          <p>
            You have rights to transparent information, communication and
            modalities for the exercise of your rights as the Data Subject under
            General Data Protection Regulation (GDPR). Your principal rights
            under the Law are:
            <ul>
              <li>the right to be informed.</li>
              <li>the right to access.</li>
              <li>the right to rectification.</li>
              <li>the right to erasure.</li>
              <li>the right to restrict processing.</li>
              <li>the right to object to processing.</li>
              <li>the right to data portability.</li>
              <li>the right to complain to a supervisory authority.</li>
              <li>the right to withdraw consent.</li>
            </ul>
            You have the right to be informed about the collection and use of
            personal data. Information must be concise, transparent,
            intelligible, easily accessible, and written in clear and plain
            language.
          </p>
          <p>
            You have the right to request details of personal information which
            we hold about you under the Law, this includes access to the
            personal data, together with certain additional information.
            Additional information includes details of the purposes of the
            processing, the categories of personal data. The rights and freedoms
            of others are not affected.
          </p>
          <p>
            You have “the right to be forgotten”, to the erasure of your
            personal data without undue delay. It applies in following
            circumstances:
            <ul>
              <li>
                the personal data are no longer necessary in relation to the
                purposes for which they were collected or otherwise processed.
              </li>
              <li>you withdraw consent to consent-based processing.</li>
              <li>
                you object to the processing under certain rules of applicable
                data protection law.
              </li>
              <li>the processing is for direct marketing purposes.</li>
              <li>the personal data have been unlawfully processed.</li>
            </ul>
            However, there are exclusions of the right to erasure. The general
            exclusions include where processing is necessary: for exercising the
            right of freedom of expression and information. for compliance with
            a legal obligation. or for the establishment, exercise or defense of
            legal claims.
          </p>
          <p>
            In some circumstances, you have the right to restrict the processing
            of your personal data.
          </p>
          <p>
            Those circumstances are: you contest the accuracy of the personal
            data. processing is unlawful but you oppose erasure. the personal
            data is no longer needed for the purposes of processing, but you
            require personal data for the establishment, exercise or defense of
            legal claims. you have objected to processing, pending the
            verification of that objection. Where processing has been restricted
            on this basis, we may continue to store your personal data.
          </p>
          <p>
            You have the right to object to processing based on legitimate
            interests or the performance of a task in the public
            interest/exercise of official authority (including profiling).
            direct marketing (including profiling). and processing for purposes
            of scientific/historical research and statistics.
          </p>
          <p>
            To the extent that the legal basis for our processing of your
            personal data is consent. or that the processing is necessary for
            the performance of an agreement to which you are party or in order
            to take steps at your request prior to entering into a contract, and
            such processing is carried out by automated means, you have the
            right to receive your personal data from us in a structured,
            commonly used and machine-readable format. However, this right does
            not apply where it would adversely affect the rights and freedoms of
            others.
          </p>
          <p>
            If you consider that processing of your personal information
            infringes data protection laws, you have a legal right to lodge a
            complaint with a supervisory authority responsible for data
            protection.
          </p>
          <p>
            You may do so in the EU member state of your habitual residence,
            your place of work or the place of the alleged infringement.
          </p>
          <p>
            To the extent that the legal basis for our processing of your
            personal information is consent, you have the right to withdraw that
            consent at any time. Withdrawal will not affect the lawfulness of
            processing before the withdrawal.
          </p>
          <p>
            You may exercise any of your rights in relation to your personal
            data by written notice to us.
          </p>

          <p className={s.agreementConHeader}>
            How do we collect your information?
          </p>
          <p>
            <b>Direct Collection</b>
            <br />
            We collect much of the information listed above directly from you
            when you submit it on our website or through our mobile application.
            This includes information such as contact information, registration
            information and service inquiries. If you do not want to share your
            information, you can choose not to participate in a particular
            service or activity.
          </p>
          <p>
            <b>Indirect Collection – Cookies and Other Technology</b>
            <br />
            As part of offering and providing personalized services, NYDAX uses
            cookies and local device storage. We may use these technologies to:
            <ul>
              <li>
                Provide you with personalized content based on your use of the
                Website
              </li>
              <li>
                Enable you to more easily use the Website by remembering and
                using contact information, purchasing information, and
                registration information
              </li>
              <li>
                Evaluate, monitor and analyze the use of the Website and their
                traffic patterns to help improve the Website and services
              </li>
              <li>
                Assist us with ad reporting functions such as to learn which ads
                are bringing users to the Website
              </li>
            </ul>
          </p>

          <p className={s.agreementConHeader}>
            The types of technologies we use include:
          </p>
          <p>
            <b>Cookies</b>
            <br />A cookie is a small amount of data that is sent to your
            browser from a Web server and stored on your computer’s hard drive.
            Cookies enable us to identify your browser as a unique user. Cookies
            may involve the transmission of information from us to you and from
            you to us. Cookies may also be used by another party on our behalf
            to transfer information to us in accordance with their privacy
            policy.
          </p>
          <p>
            {' '}
            Some cookies are "persistent cookies". They are used by us each time
            you access our website. Other cookies are called "session cookies".
            “Session cookies”, also called “session variables”, are used only
            during a specific browsing session and expire after a pre-determined
            amount of time. We may use a session cookie, for example, to
            remember that you have already navigated through a particular menu.
            We may also use "analytics cookies" that allow web analytics
            services to recognize your browser or device and, for example,
            identify whether you have visited our website before, what you have
            previously viewed or clicked on, and how you found us. This
            information is provided anonymously for statistical analysis only.
            Analytics cookies are usually persistent cookies.
          </p>
          <p>
            {' '}
            You may disable browser cookies in your browser or set your browser
            to warn you when a cookie is being sent. You may lose some features
            or functionality when you disable cookies. Remember, also, that
            disabling cookies is browser specific.
          </p>
          <p>
            <b>Log Files</b>
            <br />
            Like most standard website servers, we use log files. Log files
            track Internet protocol (IP) addresses, browser type, Internet
            service provider (ISP), referring/exit pages, platform type,
            date/time stamp, and number of clicks. We utilize this information
            to analyze trends, administer the site, prevent fraud, track website
            navigation in the aggregate, and gather broad demographic
            information for aggregate use.
          </p>

          <p className={s.agreementConHeader}>
            How do we use your information?
          </p>
          <p>
            We are careful about how we use your information. We use it to
            deliver our products and provide our services. We also use your
            information for other reasons, such as to better understand you and
            your needs, and to let you know about other products and services
            you might be interested in. We collect, use and exchange your
            information for the following purposes:
            <ul>
              <li>
                Provision of financial services
                <ul>
                  <li>Customer identification</li>
                  <li>
                    Account servicing/ provision of the payment services:
                    <ul>
                      <li>Payment provision</li>
                      <li>
                        Issuance and servicing of payment cards/credit cards
                      </li>
                    </ul>
                  </li>
                  <li>
                    Providing remote financial institution services:
                    <ul>
                      <li>Provision of Platform services</li>
                      <li>Providing services by telephone</li>
                      <li>Using cookies</li>
                    </ul>
                  </li>
                  <li>
                    Enforcement of statutory obligations:
                    <ul>
                      <li>
                        Know-Your-Customer research, incl. identification of the
                        customer, identification of the beneficial owner and
                        clarification of a politically significant person.
                      </li>
                      <li>
                        Public Institutions/Investigations, etc. execution of
                        law enforcement requests.
                      </li>
                      <li>
                        Fulfilment of AML law requirements, such as suspicious
                        and unusual transaction tracking system maintenance and
                        reporting.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Customer support:
                    <ul>
                      <li>Provision of Email support</li>
                      <li>Online request form fulfilment</li>
                      <li>Provision of Online support chat</li>
                    </ul>
                  </li>
                  <li>
                    Marketing purposes:
                    <ul>
                      <li>Customer group evaluation and research</li>
                      <li>Sending commercial notices</li>
                      <li>Organization of customer events</li>
                      <li>Addressing potential clients</li>
                      <li>Using cookies</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            We shall use the personal data in compliance with, General Data
            Protection Regulation (EU), and the confidentiality obligation
            contained in the Terms of Service Agreement for NYDAX, and only use
            and retain such data as far and as long as this is necessary for the
            purposes of platform utilization, rendering of services on the
            platform and for keeping platform users informed of NYDAX services.
          </p>
          <p>
            In addition, our mobile application will collect and track
            information regarding the mobile experience - such as your phone
            model, the duration and frequency of your usage sessions,
            information regarding application crashes, the particular screens
            you choose to view, etc.
          </p>

          <p className={s.agreementConHeader}>Disclosure of information</p>
          <p>
            We will not disclose any of your personally identifiable information
            except when we have your permission or under special circumstances,
            such as when we believe in good faith that the law requires it or
            under the circumstances described below.
          </p>
          <p>
            These are some of the ways that your information may be disclosed:
          </p>
          <p>
            <b>Service Providers</b>
            <br />
            We occasionally hire other companies to provide limited services on
            our behalf, including Website development and operation, sending
            postal mail or email, analyzing website use, processing payments,
            providing investor information and processing data. We will only
            provide those companies the information they need to deliver the
            service, and they are contractually prohibited from using that
            information for any other reason.
          </p>
          {/* <p>
                To make an informed decision on whether to provide your personal
                data to the Company using this website,{' '}
                <b>
                  we need to make you aware of four organizations that act as
                  Data Processors for us in the provision of our services to
                  you:
                </b>
                <br />
                <ul>
                  <li>
                    [Insert Name of Company], a provider of operational
                    maintenance of the website, registered in the [Insert
                    registered company].
                  </li>
                  <li>
                    [Insert Name of Company], a provider of processing services
                    and maintenance of electronic wallets, registered in the
                    [Insert registered company]
                  </li>
                </ul>
              </p> */}
          <p>
            <b>Data in the Aggregate</b>
            <br />
            We may disclose "blinded" aggregated data and user statistics to
            prospective partners and other third parties. Blinded data is data
            that does not identify an individual person.
          </p>
          <p>
            <b>Other</b>
            <br />
            We also may disclose your information in special cases, for example,
            when we believe that we must disclose information to identify,
            contact or bring legal action against someone who may be violating
            our Terms of Service Agreement, or may be causing injury to or
            interference with our rights or property, other website users or
            customers, or anyone else who may be harmed by such activities. We
            may disclose or access account information when we believe in good
            faith that the law requires it and for administrative and other
            purposes that we deem necessary to maintain, service and improve our
            products and services.
          </p>
          <p>
            As we continue to develop our business, we may buy or sell
            businesses or assets. In such transactions, confidential customer
            information generally is one of the transferred business assets. In
            the event of a transaction involving the sale of some or all of
            NYDAX business, customer and site visitor information may be one of
            the transferred assets and may be disclosed in connection with
            negotiations relating to a proposed transaction. In such case, the
            transferred information may become subject to a different privacy
            policy.
          </p>

          <p className={s.agreementConHeader}>
            How do we keep your information safe?
          </p>
          <p>
            We use multiple security measures to ensure confidentiality your
            information. We aim to only keep your information for as long as we
            need it. We store your hard copy and electronic records in secure
            buildings and systems. Access to your personal information is
            permitted only for NYDAX authorized employees.
          </p>
          <p>
            <b>System security</b>
            <br />
            When you log into our Website or apps, we encrypt data sent from
            your computer to our systems so no one else can access it. We have
            firewalls, intrusion detection and virus scanning tools to stop
            viruses and unauthorized people accessing our systems.
          </p>
          <p>
            We use Secure Sockets Layered (SSL) technology to ensure that your
            information is fully encrypted and sent across the Internet
            securely.
          </p>
          <p>
            We use PCI DSS encryption technology for payment card numbers,
            passwords, and registration information. Every session required for
            Two Factor Authentication, is an extra layer of security that
            requires not only a password and username on your login at NYDAX.
          </p>

          <p className={s.agreementConHeader}>
            How can you control your personal information?
          </p>
          <p>
            We offer our customers choices for the collection, use and sharing
            of personal information. You may contact us at info@eestifirma.ee if
            you wish to edit your private information and we will use
            commercially reasonable efforts to accommodate your request.
          </p>
          <h4>DO YOU GET INFORMED ABOUT PERSONAL DATA BREACH?</h4>

          <p className={s.agreementConHeader}>
            When do we need to tell you about personal breach?
          </p>
          <p>
            In the case of a personal data breach, we shall without undue delay
            and, where feasible, not later than 72 hours after having become
            aware of it, notify. If a breach is likely to result in a high risk
            to the rights and freedoms of individuals, we must inform you
            directly and without undue delay.
          </p>

          <p className={s.agreementConHeader}>
            What is a personal data breach?
          </p>
          <p>
            A personal data breach means a breach of security leading to the
            accidental or unlawful destruction, loss, alteration, unauthorised
            disclosure of, or access to, personal data. This includes breaches
            that are the result of both accidental and deliberate causes. It
            also means that a breach is more than just about losing personal
            data. Personal data breaches can include:
            <ul>
              <li>access by an unauthorised third party</li>
              <li>
                deliberate or accidental action (or inaction) by a controller or
                processor
              </li>
              <li>sending personal data to an incorrect recipient</li>
              <li>
                computing devices containing personal data being lost or stolen
              </li>
              <li>alteration of personal data without permission</li>
              <li>loss of availability of personal data</li>
            </ul>
          </p>
          <p className={s.agreementConHeader}>HOW TO CONTACT US</p>
          <p>
            You can contact us any time to exercise any of your rights in
            relation to your personal data or if you have any additional
            questions about Privacy collection and storage of data by contacting
            us at info@eestifirma.ee, or by completing the relevant request form
            online at{' '}
            <a
              className={s.jumpLink}
              href="http://support.nydax.com:8080/contact"
            >
              http://support.nydax.com
            </a>
            , or by submitting request at NYDAX Online Chat.
          </p>
        </div>
      </div>
    );
  }
}

PrivacyPolicy.propTypes = {
  inModal: PropTypes.bool,
};

PrivacyPolicy.defaultProps = {
  inModal: false,
};

export default withStyles(s)(PrivacyPolicy);
