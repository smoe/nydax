/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TermsAndConditions.css';

class TermsAndConditions extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <h3> {'TERMS AND CONDITIONS'} </h3>
        <div
          style={{ maxHeight: this.props.inModal ? '400px' : '100%' }}
          className={s.agreementCon}
        >
          <p className={s.agreementConHeader}>[Last revised: 21 Feb 2019]</p>

          <p className={s.agreementConHeader}>Terms</p>
          <p>
            These Terms of Service ("Terms") set out the conditions under which
            Millenium Mind offers the use of its trading platform (the
            "Platform") to Users (Users are described in Section 7 of these
            Terms and are referred to in these Terms as “Users”, “you”, “your”).
          </p>
          <p>
            You should read the entire Terms and Conditions carefully before you
            use this web site ("Site") or any of the services of this Site. As
            used herein, "NYDAX" refers to the company Millenium Mind, including
            without limitation thereby, its owners, directors, investors,
            employees or other related parties.
          </p>
          <p>
            Your use of the Platform indicates your acceptance of and agreement
            with these Terms. Depending upon context, "NYDAX" may also refer to
            the services, products, Site, content or other materials
            (collectively, "Materials") provided by NYDAX.
          </p>
          <p>
            The Service operated by NYDAX allows buyers ("Buyers") and sellers
            ("Sellers"), to buy, sell and transfer the cryptocurrencies Bitcoin,
            Ripple, Ether, Bitcoin Cash, Litecoin, Invo, (known as “digital
            currencies” from herein) and utility tokens TRZ, CRN, AIC.
          </p>
          <p>
            Depending on Your country of residence, You may not be able to use
            all the functions of the Site. It is your responsibility to follow
            those rules and laws in Your country of residence and/or country
            from which You access this Site and Services.
          </p>
          <p>
            As long as you agree to and actually comply with these Terms and
            Conditions, NYDAX grants to you a personal, non-exclusive,
            non-transferable, and limited right to enter and use the Site and
            the Service. If you do not accept the terms and conditions outlined
            in this agreement, do not access this site and do not use this
            service. By opening an account to use the Service ("Account"), You
            expressly represent and warrant that You have accepted these Terms.
          </p>

          <p className={s.agreementConHeader}>Risks</p>
          <p>
            Holding and trading digital currencies carries a high level of risk
            and may not be suitable for all investors. Before deciding to hold
            or trade digital currencies you should carefully consider your
            objectives, financial situation, needs and investment experience.
          </p>
          <p>
            You should carefully consider and evaluate each of the following
            risk factors and all other information contained in these Terms
            before deciding to purchasing digital currencies via the platform.
          </p>
          <p>
            By using the NYDAX platform, you acknowledge that you are aware of
            the risks associated with digital currency transactions, including
            but not limited to:
            <ul>
              <li>
                Digital currencies are not offered by any financial institution,
                corporation or the Website, nor are nor are they backed by any
                government or other legal entities, or by commodities such as
                gold or silver.
              </li>
              <li>
                Digital currency transactions are highly risky, due to the fact
                that they are traded throughout the day without limits on the
                rise or fall in price, and market makers and global government
                policies may cause major fluctuations in their prices.
              </li>
              <li>
                Digital currency transactions may be suspended or prohibited at
                any time due to the enactment or modification of national laws,
                regulations and regulatory policies.
              </li>
              <li>
                Digital currencies may not be transferrable for value or
                accepted for transfer for value or payment of goods and services
                by any third party.
              </li>
              <li>
                Digital currencies and/or other data held by NYDAX on your
                behalf may be lost if you or the NYDAX or any third party
                holding the digital currencies on behalf of NYDAX is subject to
                system / hardware failure, unauthorised access or a fraud event,
                and in general you bear the risk of that loss
              </li>
            </ul>
            There may be additional risks that we have not foreseen or
            identified in our Terms and Conditions. You should carefully assess
            whether your financial situation and tolerance for risk is suitable
            for buying, selling or trading digital currencies.
          </p>
          <p className={s.agreementConHeader}>Liability</p>
          <p>
            You indemnify NYDAX for any losses, costs, expenses or similar
            should you breach this Agreement or any applicable law, regulation
            or regulatory policy, including all costs and expenses relating to
            damage or loss (including consequential loss) incurred by NYDAX or
            its related bodies corporate arising or flowing from such breach
            (including legal or consultancy fees, among others).
          </p>
          <p>
            To the full extent permitted by law, NYDAX is not liable for any
            damages, losses, costs, loss of profit, loss of revenue, loss of
            business, loss of opportunity, loss of data, loss of digital or any
            other direct, indirect or consequential loss to any person including
            the User arising out of any use of the Platform, NYDAX acting or
            failing to act on any Instruction, any Transaction, any failure of
            the Platform, any error or failure or lack of any security measures
            by NYDAX or any third party including in relation to storage or
            transfer of digital currencies by or on behalf of NYDAX or for any
            other reason, except to the extent the loss is directly caused by
            the NYDAX’s fraud or wilful default. NYDAX shall not be liable for
            any loss as a result of cancelling in whole or in part a User's
            Instructions.
          </p>

          <p className={s.agreementConHeader}>Use of Third Parties</p>
          <p>
            NYDAX will not be liable for any breakdown, delay or interruption to
            the Internet connection, or if for any reason the Platform is
            unavailable at any time or for any period.
          </p>
          <p>
            Where NYDAX website contains links to other sites and resources
            provided by third parties, these links are provided for your
            information only. NYDAX have no control over the contents of those
            sites or resources, and accept no responsibility for them or for any
            loss or damage that may arise from your use of them.
          </p>
          <p className={s.agreementConHeader}>Limited Rights of Use</p>
          <p>
            Unless otherwise specified, all Materials on this Site are the
            property of NYDAX and are protected by copyright, trademark and
            other applicable laws. You may view, print and/or download a copy of
            the Materials from this Site on any single computer solely for your
            personal, informational, non-commercial use, provided you keep
            intact all copyright and other proprietary notices. The trademarks,
            service marks and logos of NYDAX and others used in this Site
            ("Trademarks") are the property of NYDAX and their respective
            owners. The software, text, images, graphics, data, prices, trades,
            charts, graphs, video and audio used on this Site belong to NYDAX.
            The Trademarks and Material should not be copied, reproduced,
            modified, republished, uploaded, posted, transmitted, scraped,
            collected or distributed in any form or by any means, whether manual
            or automated. The use of any such Materials on any other Site or
            networked computer environment for any other purpose is strictly
            prohibited. any such unauthorized use may violate copyright,
            trademark and other applicable laws and could result in criminal or
            civil penalties.
          </p>

          <p className={s.agreementConHeader}>Maintaining Your Account</p>
          <p>
            We are vigilant in maintaining the security of our Site and the
            Service. By registering with us, You agree to provide NYDAX with
            current, accurate, and complete information about Yourself as
            prompted by the registration process, and to keep such information
            updated. You further agree that You will not use any Account other
            than Your own, or access the Account of any other Member at any
            time, or assist others in obtaining unauthorized access. The
            creation or use of Accounts without obtaining the prior express
            permission from NYDAX will result in the immediate suspension of all
            said Accounts, as well as all pending purchase/sale offers. Any
            attempt to do so or to assist others (Members or otherwise), or the
            distribution of instructions, software or tools for that purpose,
            will result in the Accounts of such Members being terminated.
            Termination is not the exclusive remedy for such a violation, and
            NYDAX may elect to take further action against You. You are also
            responsible for maintaining the confidentiality of Your Account
            information, including your password, safeguarding your own
            cryptocurrencies, and for all activity including Transactions that
            are posted to Your Account. If there is suspicious activity related
            to your Account, we may, but are not obligated, to request
            additional information from You, including authenticating documents,
            and to freeze any transactions pending our review. You are obligated
            to comply with these security requests, or accept termination of
            Your Account. You are required to notify NYDAX immediately of any
            unauthorized use of Your Account or password, or any other breach of
            security. Any Member who violates these rules may be terminated, and
            thereafter held liable for losses incurred by NYDAX or any user of
            the Site. Finally, You agree that You will not use the Service to
            perform criminal activity of any sort, including but not limited to,
            money laundering, illegal gambling operations, terrorist financing,
            or malicious hacking.
          </p>

          <p className={s.agreementConHeader}>Debit Account Balances</p>
          <p>
            If at any time your NYDAX account has a debit balance, you agree to
            pay us:
            <ul>
              <li>
                An account overdraft fee determined by us from time to time to
                cover our reasonable costs and expenses arising from the debit
                account balance
              </li>
              <li>
                The total debit balance including the account overdraft fee
              </li>
            </ul>
            We may suspend your account at any time and without notice to you if
            you fail to pay the outstanding debit account balance and account
            overdraft fees.
          </p>
          <p>
            If, after a demand is made by NYDAX, you have not made payment of
            the outstanding debit balance, then:
            <ul>
              <li>
                You authorise us to sell any cryptocurrency assets on your
                account to recover the outstanding balance. and
              </li>
              <li>
                You agree to indemnify us against all costs, expenses and losses
                incurred, including brokerage, GST, overdraft fees and any other
                fees as a result of not paying the outstanding debit balance
              </li>
            </ul>
          </p>

          <p className={s.agreementConHeader}>Termination</p>
          <p>
            <ul>
              <li>
                The Company may suspend or terminate your account, use of the
                Service, or the processing of any Digital Asset Transaction, at
                any time in its sole discretion.
              </li>
              <li>
                This Agreement shall be terminated on the date of the
                cancellation of your Member Account.
              </li>
              <li>
                After the termination of this Agreement, you do not have the
                right to require the Website to continue to provide you with any
                Service or perform any other obligation, including, but not
                limited to, requesting the Website to keep or disclose to you
                any information in your Member Account, or to forward to you or
                any third party any information therein that is not read or
                sent. You should retain your own records of your Digital Asset
                Transactions and any Transaction Requests in the event you may
                require them in the future. You may need to produce your records
                for the purposes of taxation.
              </li>
              <li>
                Within a reasonable period after termination of this Agreement,
                we will transfer to you all Fiat Money and Digital Assets we
                hold for you, after deduction of any amounts you owe us under
                this Agreement and subject to any applicable laws which would
                prevent us from transferring the Fiat Money and Digital Assets
                to you.
              </li>
              <li>
                The termination of this Agreement shall not prevent the either
                party from demanding a breaching party to assume other
                liabilities
              </li>
            </ul>
            You may terminate this agreement with NYDAX, and close Your Account
            at any time, following settlement of any pending transactions.
          </p>
          <p>
            You also agree that NYDAX may, by giving notice, in its sole
            discretion terminate Your access to the Site and to Your Account,
            including without limitation, our right to: limit, suspend or
            terminate the service and Members' Accounts, prohibit access to the
            Site and its content, services and tools, delay or remove hosted
            content, and take technical and legal steps to keep Members off the
            Site if we think that they are creating problems or possible legal
            liabilities, infringing the intellectual property rights of third
            parties, or acting inconsistently with the letter or spirit of these
            Terms.
          </p>
          <p>
            Additionally, we may, in appropriate circumstances and at our
            discretion, suspend or terminate Accounts of Members for any reason,
            including without limitation: (1) attempts to gain unauthorized
            access to the Site or another Member's account or providing
            assistance to others' attempting to do so, (2) overcoming software
            security features limiting use of or protecting any content, (3)
            usage of the Service to perform illegal activities such as money
            laundering, illegal gambling operations, financing terrorism, or
            other criminal activities, (4) violations of these Terms and
            Conditions, (5) failure to pay or fraudulent payment for
            Transactions, (6) unexpected operational difficulties, or (7) upon
            the request of law enforcement or other government agencies, if
            deemed to be legitimate and compelling by NYDAX, acting in its sole
            discretion. We also reserve the right to cancel unconfirmed Accounts
            or Accounts that have been inactive for a period of 6 months or
            more, and/or to modify or discontinue our Site or Service. Members
            agree that NYDAX will not be liable to them or to any third party
            for termination of their Account or access to the Site. The
            suspension of an Account shall not affect the payment of the
            commissions due for past Transactions. Upon termination, Members
            shall communicate a valid bank account to allow for the transfer of
            any currencies credited to their account. Said bank account shall be
            held by the Member. Cryptocurrency may be transferred to a valid
            bank account only after conversion into a currency. NYDAX shall
            transfer the currencies as soon as possible following the Member's
            request in the time frames specified by NYDAX. NYDAX will send to
            You the credit balance of Your account, however in circumstances a
            number of intermediaries may be involved in an international payment
            and these or the beneficiary bank may deduct charges. We will use
            reasonable efforts to ensure that such charges are disclosed to You
            prior to sending Your payment, however where they cannot be avoided,
            You acknowledge that these charges cannot always be calculated in
            advance, and that you agree to be responsible for such charges.
          </p>
          <p>
            A User may close its Account at any time by notification to the
            Company in the form determined by the Company.
          </p>
          <p>
            The Company may suspend or terminate a User's Account at any time
            immediately upon written notice to the User for any reason,
            including without limitation for: (1) attempts to gain unauthorized
            access to the Platform or another User's Account or providing
            assistance to others attempting to do so. (2) overcoming software
            security features limiting use of or protecting any content. (3)
            using the Platform to perform illegal activities such as money
            laundering, terrorism financing, paying of ransomware, online
            gambling or other criminal activities. (4) violations of these
            Terms. (5) failure to pay or fraudulent payment for Transactions.
            (6) unexpected operational difficulties. or (7) requests by law
            enforcement or other government agencies. (8) Abusive behaviour.
          </p>
          <p>
            The Company may by notice to Users discontinue or modify the
            Platform and/or revise or terminate these Terms at any time in
            accordance with these Terms. Users are deemed to have accepted these
            revisions or termination to the extent that they continue using the
            Platform.
          </p>
          <p>
            Subject to these Terms and applicable laws, within 60 days of
            closure of a User's Account, whether by the User or the Company, the
            Company must (insofar as it is possible):
            <ul>
              <li>
                In respect of any Deposited Currency held in the User's Account,
                pay to the User's nominated bank account the amount of the
                Deposited Currency. and
              </li>
              <li>
                In respect of any Token held in the User's Account, in its
                absolute discretion either:
                <ol>
                  <li>
                    transfer the Tokens to the User or a person nominated by the
                    User (which may be another Token trading platform provider).
                    or
                  </li>
                  <li>
                    sell the Tokens at the prevailing market price and pay the
                    amount raised to the User's nominated bank account.
                  </li>
                </ol>
              </li>
            </ul>
            The Company is entitled to retain from any amounts (whether Token or
            Deposited Currency) which may otherwise be payable to the User on
            closure of its Account any amount payable by the User to the
            Company, including as Fees or Commissions on sale of Tokens under 2
            above. The Company may be legally limited in the values it may
            refund over a certain period of time and a User shall not hold the
            Company liable for an inability to refund all values as
            expeditiously as the User may desire.
          </p>
          <p>
            In the event the Company has made reasonable efforts to obtain
            instructions from the User as to where to transfer any Deposited
            currency or Tokens in a closed Account but is unable to obtain such
            instructions or is unable to transfer as instructed the Deposited
            Currency and/or the Tokens held in the User’s Account or otherwise
            held by the Company on behalf of the User, due to no fault of the
            Company, within 120 days of closure of a User’s Account, ownership
            of the Deposited Currency and the Tokens will transfer to the
            Company.
          </p>
          <p>
            The User also agrees that the Company may, in its sole discretion by
            giving notice, terminate Users' access to the Platform, prohibit
            access to the Platform and its content, services and tools, delay or
            remove hosted content, and take technical and legal steps to prevent
            the User's access to the Platform if the Company, in its exclusive
            discretion, believes that the User has breached or may breach these
            Terms or is otherwise acting inconsistently with the intentions of
            these Terms.
          </p>
          <p>
            The Company reserves the right to terminate Accounts that have been
            inactive for a period of 6 months or more.
          </p>
          <p>
            Notwithstanding any suspension or termination of a User's Account,
            the User remains liable for all Fees and Commissions payable in
            respect of the Account or any Transaction entered prior to the
            suspension or termination.
          </p>

          <p className={s.agreementConHeader}>Availability</p>
          <p>
            All services are provided without warranty of any kind, either
            express or implied. We do not represent that this Site will be
            available 100% of the time to meet your needs. We will strive to
            provide You with the Service as soon as possible but there are no
            guarantees that access will not be interrupted, or that there will
            be no delays, failures, errors, omissions or loss of transmitted
            information. We will use reasonable endeavours to ensure that the
            Site can normally be accessed by You in accordance with these Terms
            and Conditions. We may suspend use of the Site for maintenance and
            will make reasonable efforts to give you notice. You acknowledge
            that this may not be possible in an emergency.
          </p>

          <p className={s.agreementConHeader}>Limitation of Liability</p>
          <p>
            To the extent permitted by law, NYDAX will not be held liable for
            any damages, loss of profit, loss of revenue, loss of business, loss
            of opportunity, loss of data, indirect or consequential loss unless
            the loss suffered arising from negligence or wilful deceit or fraud.
            Nothing in these terms excludes or limits the liability of either
            party for fraud, death or personal injury caused by its negligence,
            breach of terms implied by operation of law, or any other liability
            which may not by law be limited or excluded. Subject to the
            foregoing, NYDAX's aggregate liability in respect of claims based on
            events arising out of or in connection with any single Member's use
            of the Site and/or Service, whether in contract or tort (including
            negligence) or otherwise, shall in no circumstances exceed the
            greater of either (a) the total amount held on Account for the
            Member making a claim less any amount of Commission that may be due
            and payable in respect of such Account. or (b) the amount of the
            Transaction(s) that are the subject of the claim less any amount of
            Commission that may be due and payable in respect of such
            Transaction(s).
          </p>

          <p className={s.agreementConHeader}>Trade Fee Reduction</p>
          <p>
            Trade fee reductions apply from the date that you pay the Premium
            Account plan fee and will continue until the expiry date of your
            Premium Account Plan. Trade fee reductions apply in addition to the
            existing Trade Volume Discount schedule, down to a minimum fee of
            0.05%. If the combined Trade fee reduction and trade volume discount
            would reduce the fee to lower than 0.05%, then the fee for that
            transaction will be 0.05%.
          </p>
          <p>
            We take all reasonable steps to ensure that support tickets raised
            by Premium Account plan customers who have a plan containing the
            Premium Support feature are responded to within 1 hour during
            business hours. During times of extreme market conditions, this may
            not be possible. During such times, premium support customers will
            receive priority support. Business hours are between 8:30am and
            6:00pm Sydney time, Monday to Friday, excluding Australian national
            and New South Wales public holidays.
          </p>

          <p className={s.agreementConHeader}>Force Majeure</p>
          <p>
            If NYDAX is unable to perform the Services outlined in the Terms and
            Conditions due to factors beyond our control including but not
            limited to an event of Force Majeure, change of law or change in
            sanctions policy we will not have any liability to You with respect
            to the Services provided under this agreement and for a time period
            coincident with the event.
          </p>
          <p className={s.agreementConHeader}>Modification of Terms</p>
          <p>
            NYDAX reserves the right to change, add or remove portions of these
            Terms, at any time, in an exercise of its sole discretion. Your
            continued use of the Site following the posting of a notice of
            changes to the Terms signifies that you accept and agree to the
            changes, and that all subsequent transactions by you will be subject
            to the amended Terms.
          </p>
        </div>
      </div>
    );
  }
}

TermsAndConditions.propTypes = {
  inModal: PropTypes.bool,
};

TermsAndConditions.defaultProps = {
  inModal: false,
};

export default withStyles(s)(TermsAndConditions);
