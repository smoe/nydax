// from https://stackoverflow.com/questions/2530377/list-of-phone-number-country-codes
const countries = [
  {
    phoneCode: '+7 840',
    name: 'Abkhazia',
  },
  {
    phoneCode: '+93',
    name: 'Afghanistan',
  },
  {
    phoneCode: '+355',
    name: 'Albania',
  },
  {
    phoneCode: '+213',
    name: 'Algeria',
  },
  {
    phoneCode: '+1 684',
    name: 'American Samoa',
  },
  {
    phoneCode: '+376',
    name: 'Andorra',
  },
  {
    phoneCode: '+244',
    name: 'Angola',
  },
  {
    phoneCode: '+1 264',
    name: 'Anguilla',
  },
  {
    phoneCode: '+1 268',
    name: 'Antigua and Barbuda',
  },
  {
    phoneCode: '+54',
    name: 'Argentina',
  },
  {
    phoneCode: '+374',
    name: 'Armenia',
  },
  {
    phoneCode: '+297',
    name: 'Aruba',
  },
  {
    phoneCode: '+247',
    name: 'Ascension',
  },
  {
    phoneCode: '+61',
    name: 'Australia',
  },
  {
    phoneCode: '+672',
    name: 'Australian External Territories',
  },
  {
    phoneCode: '+43',
    name: 'Austria',
  },
  {
    phoneCode: '+994',
    name: 'Azerbaijan',
  },
  {
    phoneCode: '+1 242',
    name: 'Bahamas',
  },
  {
    phoneCode: '+973',
    name: 'Bahrain',
  },
  {
    phoneCode: '+880',
    name: 'Bangladesh',
  },
  {
    phoneCode: '+1 246',
    name: 'Barbados',
  },
  {
    phoneCode: '+1 268',
    name: 'Barbuda',
  },
  {
    phoneCode: '+375',
    name: 'Belarus',
  },
  {
    phoneCode: '+32',
    name: 'Belgium',
  },
  {
    phoneCode: '+501',
    name: 'Belize',
  },
  {
    phoneCode: '+229',
    name: 'Benin',
  },
  {
    phoneCode: '+1 441',
    name: 'Bermuda',
  },
  {
    phoneCode: '+975',
    name: 'Bhutan',
  },
  {
    phoneCode: '+591',
    name: 'Bolivia',
  },
  {
    phoneCode: '+387',
    name: 'Bosnia and Herzegovina',
  },
  {
    phoneCode: '+267',
    name: 'Botswana',
  },
  {
    phoneCode: '+55',
    name: 'Brazil',
  },
  {
    phoneCode: '+246',
    name: 'British Indian Ocean Territory',
  },
  {
    phoneCode: '+1 284',
    name: 'British Virgin Islands',
  },
  {
    phoneCode: '+673',
    name: 'Brunei',
  },
  {
    phoneCode: '+359',
    name: 'Bulgaria',
  },
  {
    phoneCode: '+226',
    name: 'Burkina Faso',
  },
  {
    phoneCode: '+257',
    name: 'Burundi',
  },
  {
    phoneCode: '+855',
    name: 'Cambodia',
  },
  {
    phoneCode: '+237',
    name: 'Cameroon',
  },
  {
    phoneCode: '+1',
    name: 'Canada',
  },
  {
    phoneCode: '+238',
    name: 'Cape Verde',
  },
  {
    phoneCode: '+ 345',
    name: 'Cayman Islands',
  },
  {
    phoneCode: '+236',
    name: 'Central African Republic',
  },
  {
    phoneCode: '+235',
    name: 'Chad',
  },
  {
    phoneCode: '+56',
    name: 'Chile',
  },
  {
    phoneCode: '+86',
    name: 'China',
  },
  {
    phoneCode: '+61',
    name: 'Christmas Island',
  },
  {
    phoneCode: '+61',
    name: 'Cocos-Keeling Islands',
  },
  {
    phoneCode: '+57',
    name: 'Colombia',
  },
  {
    phoneCode: '+269',
    name: 'Comoros',
  },
  {
    phoneCode: '+242',
    name: 'Congo',
  },
  {
    phoneCode: '+243',
    name: 'Congo, Dem. Rep. of (Zaire)',
  },
  {
    phoneCode: '+682',
    name: 'Cook Islands',
  },
  {
    phoneCode: '+506',
    name: 'Costa Rica',
  },
  {
    phoneCode: '+385',
    name: 'Croatia',
  },
  {
    phoneCode: '+53',
    name: 'Cuba',
  },
  {
    phoneCode: '+599',
    name: 'Curacao',
  },
  {
    phoneCode: '+537',
    name: 'Cyprus',
  },
  {
    phoneCode: '+420',
    name: 'Czech Republic',
  },
  {
    phoneCode: '+45',
    name: 'Denmark',
  },
  {
    phoneCode: '+246',
    name: 'Diego Garcia',
  },
  {
    phoneCode: '+253',
    name: 'Djibouti',
  },
  {
    phoneCode: '+1 767',
    name: 'Dominica',
  },
  {
    phoneCode: '+1 809',
    name: 'Dominican Republic',
  },
  {
    phoneCode: '+670',
    name: 'East Timor',
  },
  {
    phoneCode: '+56',
    name: 'Easter Island',
  },
  {
    phoneCode: '+593',
    name: 'Ecuador',
  },
  {
    phoneCode: '+20',
    name: 'Egypt',
  },
  {
    phoneCode: '+503',
    name: 'El Salvador',
  },
  {
    phoneCode: '+240',
    name: 'Equatorial Guinea',
  },
  {
    phoneCode: '+291',
    name: 'Eritrea',
  },
  {
    phoneCode: '+372',
    name: 'Estonia',
  },
  {
    phoneCode: '+251',
    name: 'Ethiopia',
  },
  {
    phoneCode: '+500',
    name: 'Falkland Islands',
  },
  {
    phoneCode: '+298',
    name: 'Faroe Islands',
  },
  {
    phoneCode: '+679',
    name: 'Fiji',
  },
  {
    phoneCode: '+358',
    name: 'Finland',
  },
  {
    phoneCode: '+33',
    name: 'France',
  },
  {
    phoneCode: '+596',
    name: 'French Antilles',
  },
  {
    phoneCode: '+594',
    name: 'French Guiana',
  },
  {
    phoneCode: '+689',
    name: 'French Polynesia',
  },
  {
    phoneCode: '+241',
    name: 'Gabon',
  },
  {
    phoneCode: '+220',
    name: 'Gambia',
  },
  {
    phoneCode: '+995',
    name: 'Georgia',
  },
  {
    phoneCode: '+49',
    name: 'Germany',
  },
  {
    phoneCode: '+233',
    name: 'Ghana',
  },
  {
    phoneCode: '+350',
    name: 'Gibraltar',
  },
  {
    phoneCode: '+30',
    name: 'Greece',
  },
  {
    phoneCode: '+299',
    name: 'Greenland',
  },
  {
    phoneCode: '+1 473',
    name: 'Grenada',
  },
  {
    phoneCode: '+590',
    name: 'Guadeloupe',
  },
  {
    phoneCode: '+1 671',
    name: 'Guam',
  },
  {
    phoneCode: '+502',
    name: 'Guatemala',
  },
  {
    phoneCode: '+224',
    name: 'Guinea',
  },
  {
    phoneCode: '+245',
    name: 'Guinea-Bissau',
  },
  {
    phoneCode: '+595',
    name: 'Guyana',
  },
  {
    phoneCode: '+509',
    name: 'Haiti',
  },
  {
    phoneCode: '+504',
    name: 'Honduras',
  },
  {
    phoneCode: '+852',
    name: 'Hong Kong SAR China',
  },
  {
    phoneCode: '+36',
    name: 'Hungary',
  },
  {
    phoneCode: '+354',
    name: 'Iceland',
  },
  {
    phoneCode: '+91',
    name: 'India',
  },
  {
    phoneCode: '+62',
    name: 'Indonesia',
  },
  {
    phoneCode: '+98',
    name: 'Iran',
  },
  {
    phoneCode: '+964',
    name: 'Iraq',
  },
  {
    phoneCode: '+353',
    name: 'Ireland',
  },
  {
    phoneCode: '+972',
    name: 'Israel',
  },
  {
    phoneCode: '+39',
    name: 'Italy',
  },
  {
    phoneCode: '+225',
    name: 'Ivory Coast',
  },
  {
    phoneCode: '+1 876',
    name: 'Jamaica',
  },
  {
    phoneCode: '+81',
    name: 'Japan',
  },
  {
    phoneCode: '+962',
    name: 'Jordan',
  },
  {
    phoneCode: '+7 7',
    name: 'Kazakhstan',
  },
  {
    phoneCode: '+254',
    name: 'Kenya',
  },
  {
    phoneCode: '+686',
    name: 'Kiribati',
  },
  {
    phoneCode: '+965',
    name: 'Kuwait',
  },
  {
    phoneCode: '+996',
    name: 'Kyrgyzstan',
  },
  {
    phoneCode: '+856',
    name: 'Laos',
  },
  {
    phoneCode: '+371',
    name: 'Latvia',
  },
  {
    phoneCode: '+961',
    name: 'Lebanon',
  },
  {
    phoneCode: '+266',
    name: 'Lesotho',
  },
  {
    phoneCode: '+231',
    name: 'Liberia',
  },
  {
    phoneCode: '+218',
    name: 'Libya',
  },
  {
    phoneCode: '+423',
    name: 'Liechtenstein',
  },
  {
    phoneCode: '+370',
    name: 'Lithuania',
  },
  {
    phoneCode: '+352',
    name: 'Luxembourg',
  },
  {
    phoneCode: '+853',
    name: 'Macau SAR China',
  },
  {
    phoneCode: '+389',
    name: 'Macedonia',
  },
  {
    phoneCode: '+261',
    name: 'Madagascar',
  },
  {
    phoneCode: '+265',
    name: 'Malawi',
  },
  {
    phoneCode: '+60',
    name: 'Malaysia',
  },
  {
    phoneCode: '+960',
    name: 'Maldives',
  },
  {
    phoneCode: '+223',
    name: 'Mali',
  },
  {
    phoneCode: '+356',
    name: 'Malta',
  },
  {
    phoneCode: '+692',
    name: 'Marshall Islands',
  },
  {
    phoneCode: '+596',
    name: 'Martinique',
  },
  {
    phoneCode: '+222',
    name: 'Mauritania',
  },
  {
    phoneCode: '+230',
    name: 'Mauritius',
  },
  {
    phoneCode: '+262',
    name: 'Mayotte',
  },
  {
    phoneCode: '+52',
    name: 'Mexico',
  },
  {
    phoneCode: '+691',
    name: 'Micronesia',
  },
  {
    phoneCode: '+1 808',
    name: 'Midway Island',
  },
  {
    phoneCode: '+373',
    name: 'Moldova',
  },
  {
    phoneCode: '+377',
    name: 'Monaco',
  },
  {
    phoneCode: '+976',
    name: 'Mongolia',
  },
  {
    phoneCode: '+382',
    name: 'Montenegro',
  },
  {
    phoneCode: '+1664',
    name: 'Montserrat',
  },
  {
    phoneCode: '+212',
    name: 'Morocco',
  },
  {
    phoneCode: '+95',
    name: 'Myanmar',
  },
  {
    phoneCode: '+264',
    name: 'Namibia',
  },
  {
    phoneCode: '+674',
    name: 'Nauru',
  },
  {
    phoneCode: '+977',
    name: 'Nepal',
  },
  {
    phoneCode: '+31',
    name: 'Netherlands',
  },
  {
    phoneCode: '+599',
    name: 'Netherlands Antilles',
  },
  {
    phoneCode: '+1 869',
    name: 'Nevis',
  },
  {
    phoneCode: '+687',
    name: 'New Caledonia',
  },
  {
    phoneCode: '+64',
    name: 'New Zealand',
  },
  {
    phoneCode: '+505',
    name: 'Nicaragua',
  },
  {
    phoneCode: '+227',
    name: 'Niger',
  },
  {
    phoneCode: '+234',
    name: 'Nigeria',
  },
  {
    phoneCode: '+683',
    name: 'Niue',
  },
  {
    phoneCode: '+672',
    name: 'Norfolk Island',
  },
  {
    phoneCode: '+850',
    name: 'North Korea',
  },
  {
    phoneCode: '+1 670',
    name: 'Northern Mariana Islands',
  },
  {
    phoneCode: '+47',
    name: 'Norway',
  },
  {
    phoneCode: '+968',
    name: 'Oman',
  },
  {
    phoneCode: '+92',
    name: 'Pakistan',
  },
  {
    phoneCode: '+680',
    name: 'Palau',
  },
  {
    phoneCode: '+970',
    name: 'Palestinian Territory',
  },
  {
    phoneCode: '+507',
    name: 'Panama',
  },
  {
    phoneCode: '+675',
    name: 'Papua New Guinea',
  },
  {
    phoneCode: '+595',
    name: 'Paraguay',
  },
  {
    phoneCode: '+51',
    name: 'Peru',
  },
  {
    phoneCode: '+63',
    name: 'Philippines',
  },
  {
    phoneCode: '+48',
    name: 'Poland',
  },
  {
    phoneCode: '+351',
    name: 'Portugal',
  },
  {
    phoneCode: '+1 787',
    name: 'Puerto Rico',
  },
  {
    phoneCode: '+974',
    name: 'Qatar',
  },
  {
    phoneCode: '+262',
    name: 'Reunion',
  },
  {
    phoneCode: '+40',
    name: 'Romania',
  },
  {
    phoneCode: '+7',
    name: 'Russia',
  },
  {
    phoneCode: '+250',
    name: 'Rwanda',
  },
  {
    phoneCode: '+685',
    name: 'Samoa',
  },
  {
    phoneCode: '+378',
    name: 'San Marino',
  },
  {
    phoneCode: '+966',
    name: 'Saudi Arabia',
  },
  {
    phoneCode: '+221',
    name: 'Senegal',
  },
  {
    phoneCode: '+381',
    name: 'Serbia',
  },
  {
    phoneCode: '+248',
    name: 'Seychelles',
  },
  {
    phoneCode: '+232',
    name: 'Sierra Leone',
  },
  {
    phoneCode: '+65',
    name: 'Singapore',
  },
  {
    phoneCode: '+421',
    name: 'Slovakia',
  },
  {
    phoneCode: '+386',
    name: 'Slovenia',
  },
  {
    phoneCode: '+677',
    name: 'Solomon Islands',
  },
  {
    phoneCode: '+27',
    name: 'South Africa',
  },
  {
    phoneCode: '+500',
    name: 'South Georgia and the South Sandwich Islands',
  },
  {
    phoneCode: '+82',
    name: 'South Korea',
  },
  {
    phoneCode: '+34',
    name: 'Spain',
  },
  {
    phoneCode: '+94',
    name: 'Sri Lanka',
  },
  {
    phoneCode: '+249',
    name: 'Sudan',
  },
  {
    phoneCode: '+597',
    name: 'Suriname',
  },
  {
    phoneCode: '+268',
    name: 'Swaziland',
  },
  {
    phoneCode: '+46',
    name: 'Sweden',
  },
  {
    phoneCode: '+41',
    name: 'Switzerland',
  },
  {
    phoneCode: '+963',
    name: 'Syria',
  },
  {
    phoneCode: '+886',
    name: 'Taiwan',
  },
  {
    phoneCode: '+992',
    name: 'Tajikistan',
  },
  {
    phoneCode: '+255',
    name: 'Tanzania',
  },
  {
    phoneCode: '+66',
    name: 'Thailand',
  },
  {
    phoneCode: '+670',
    name: 'Timor Leste',
  },
  {
    phoneCode: '+228',
    name: 'Togo',
  },
  {
    phoneCode: '+690',
    name: 'Tokelau',
  },
  {
    phoneCode: '+676',
    name: 'Tonga',
  },
  {
    phoneCode: '+1 868',
    name: 'Trinidad and Tobago',
  },
  {
    phoneCode: '+216',
    name: 'Tunisia',
  },
  {
    phoneCode: '+90',
    name: 'Turkey',
  },
  {
    phoneCode: '+993',
    name: 'Turkmenistan',
  },
  {
    phoneCode: '+1 649',
    name: 'Turks and Caicos Islands',
  },
  {
    phoneCode: '+688',
    name: 'Tuvalu',
  },
  {
    phoneCode: '+1 340',
    name: 'U.S. Virgin Islands',
  },
  {
    phoneCode: '+256',
    name: 'Uganda',
  },
  {
    phoneCode: '+380',
    name: 'Ukraine',
  },
  {
    phoneCode: '+971',
    name: 'United Arab Emirates',
  },
  {
    phoneCode: '+44',
    name: 'United Kingdom',
  },
  {
    phoneCode: '+1',
    name: 'United States',
  },
  {
    phoneCode: '+598',
    name: 'Uruguay',
  },
  {
    phoneCode: '+998',
    name: 'Uzbekistan',
  },
  {
    phoneCode: '+678',
    name: 'Vanuatu',
  },
  {
    phoneCode: '+58',
    name: 'Venezuela',
  },
  {
    phoneCode: '+84',
    name: 'Vietnam',
  },
  {
    phoneCode: '+1 808',
    name: 'Wake Island',
  },
  {
    phoneCode: '+681',
    name: 'Wallis and Futuna',
  },
  {
    phoneCode: '+967',
    name: 'Yemen',
  },
  {
    phoneCode: '+260',
    name: 'Zambia',
  },
  {
    phoneCode: '+255',
    name: 'Zanzibar',
  },
  {
    phoneCode: '+263',
    name: 'Zimbabwe',
  },
];

export default countries;
