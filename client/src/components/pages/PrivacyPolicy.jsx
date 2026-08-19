import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mt-15 px-23 py-12 font-basis-web text-gray-800">
      {/* Main Heading */}
      <h1 className="text-4xl  text-start tracking-wide mb-2">
        Privacy Policy
      </h1>
      
      {/* Subheading */}
      <h2 className="text-xl font-medium text-start mt-8 text-gray-700 mb-1">
        BLUE CHALK MEDIA LLC – PRIVACY POLICY
      </h2>
      
      {/* Last Updated */}
      <p className="text-start text-gray-500 text-[15px] mt-4 italic mb-12">
        Last Updated on November 17, 2013
      </p>

      {/* Section 1 */}
      <section className="mb-10">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          1. Introduction
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Blue Chalk Media LLC ("Blue Chalk") respects and is committed to protecting your privacy.
        </p>
        <p className="text-gray-700 leading-relaxed">
          This Privacy Policy ("Privacy Policy"), together with Blue Chalk's Terms and Conditions, explains how Blue Chalk uses your personal information and data collected from the Website and your rights in respect of such information and data. Capitalized terms that are used in this Privacy Policy have the same meanings given to them in the Terms and Conditions.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          2. Personal Information
        </h3>
        <p className="text-gray-700 leading-relaxed">
          When using the Blue Chalk site, Blue Chalk may collect personal information for communication purposes (updating you on the latest Blue Chalk works). In addition, Blue Chalk's Website (as discussed below in section 4) may use cookies and other technologies to keep track of your interactions with the Blue Chalk websites and services to offer a personalized experience.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          3. Uses of Information
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Blue Chalk solely collects and uses your information to inform you of Blue Chalk works. Blue Chalk does not sell, rent, or lease its customer lists to third parties. Blue Chalk employs Campaign Manager, an email management and communications software product, to collect email addresses through the Website and communicate with those who provide such information. You can find further information about Campaign Manager here:{' '}
          <a 
            href="http://www.campaignmonitor.com/privacy/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline transition-colors"
          >
            http://www.campaignmonitor.com/privacy/
          </a>
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-10">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          4. Tracking Software and Cookies
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Blue Chalk may use tracking software to help analyze your use of the Website. Such analytical tools may use cookies which are text files placed on your computer's hard drive that collect certain information and data about your use of the Website, such as your IP address, browser type, the time and length of your visit, the pages of the Website you visit and other relevant data of that nature.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Most internet browsers allow you to erase cookies and tracking software from your computer's hard drive, receive a warning before they are stored, or to turn off the cookie or tracking software altogether. If you want to know how to do this please refer to your browser instructions or help screen, but please be aware that if you refuse cookies or tracking software it may lead to a decreased level of functionality of the Website.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Among the tracking software tools that Blue Chalk may use on its Website include Google Analytics, a web analytics service provided by Google, Inc. (1600 Amphitheatre Parkway, Mountain View, CA 94043). You can find further information here:{' '}
          <a 
            href="http://www.google.com/intl/en/analytics/privacyoverview.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline transition-colors"
          >
            http://www.google.com/intl/en/analytics/privacyoverview.html
          </a>
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-10">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          5. Disclosure of Information
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Blue Chalk may from time to time employ other companies and individuals to carry out functions on its behalf including delivering services, providing marketing assistance, analyzing data and enforcing the Terms and Conditions. In order to carry out their functions these companies and individuals may require access to your personal information but Blue Chalk shall only disclose such relevant personal information as is needed by them to perform their functions. Where requested to do so, Blue Chalk may co-operate with any court, tribunal, regulatory body, police authority or other similar authority in any investigations or proceedings concerning you or your use of the Website. This may include disclosing information about communications transmitted via the Services to the authorities where required.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Whilst Blue Chalk takes measures to safeguard the personal information that you provide, no transmission over the Internet can be guaranteed secure. Accordingly, please note that Blue Chalk cannot guarantee the security of any personal information that you provide as part of your use of the Website.
        </p>
      </section>
    </div>
  )
}

export default PrivacyPolicy