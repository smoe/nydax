export const titles = {
  CONNECTION_ERROR: 'Connection Error',
  USER_PROFILE_UPDATED: 'Profile update',
  RESET_PASSWORD: 'Password reset',
  EMAIL_CONFIRMATION: 'Email confirmation',
  CONFIRMATION_EMAIL: 'Confirmation Email',
  BASE_CURRENCY_CHANGE: 'Change in base currency',
  TIMEZONE_CHANGE: 'Change in timezone',
  LOGOUT: 'Logout',
};

export const errors = {
  SERVER_CONNECTION_LOST: 'Server connection is lost.',

  THIS_IS_BETA:
    'The information presented here is for the platform demonstration only and should not be considered for trading or making a financial decision.',

  FIRST_NAME_FIELD_IS_EMPTY: 'Please enter your first name.',
  LAST_NAME_FIELD_IS_EMPTY: 'Please enter your last name.',
  NAME_IS_TOO_LONG: 'Your name is too long.',

  EMAIL_FIELD_IS_EMPTY: 'Please enter your Email.',
  EMAIL_FORMAT_IS_INCORRECT: 'Please enter your Email correctly.',
  EMAIL_IS_TOO_LONG: 'Your Email address is too long.',

  PASSWORD_FIELD_IS_EMPTY: 'Please enter your password.',
  PASSWORD_IS_TOO_SIMPLE: 'Your password is too simple.',
  PASSWORD_IS_TOO_LONG: 'Your password is too long.',

  PASSWORD_CONFIRMATION_FAILED: 'Passwords are not the same.',

  GRECAPTCHA_VERIFICATION_FAILED: 'Please try again.',

  USERNAME_FIELD_IS_EMPTY: 'Please enter your username.',
  USERNAME_IS_TOO_LONG: 'Your username is too long.',

  ORDER_FAILED_ERROR_TITLE: 'Order Failed',
  ORDER_FAILED_PRICE_VALIDATION: 'Please enter price.',
  ORDER_FAILED_AMOUNT_VALIDATION: 'Please enter amount.',
  ORDER_FAILED_TOTAL_VALIDATION: minimumTradeAmount =>
    `Total must be at least ${minimumTradeAmount}`,

  BALANCE_IS_NOT_ENOUGH: 'Your balance is not enough.',

  INTERNET_CONNECTION_LOST: 'Your internet connection is lost.',

  PHONE_NUMBER_IS_NOT_PROVIDED: 'Phone number is not provided.',
  PHONE_NUMBER_IS_INCORRECT: 'Please enter your Phone Number correctly.',

  EMAIL_NOT_CONFIRMED: 'Problem in Email confirmation.',
};

export const infos = {
  COPY_TO_CLIPBOARD_TITLE: 'Copied!',
  COPY_TO_CLIPBOARD_DESCRIPTION_DEPOSIT:
    'The deposit address copied to clipboard.',

  DEPOSIT_OCCURANCE: (tokenName, amount) =>
    `${amount} ${tokenName} were successfully deposited into your account.`,
  TRADE_OCCURANCE: 'The trade done successfully.',
  // TRADE_OCCURANCE: (tokenName, amount, bought) =>
  //   `${amount} ${tokenName} were ${bought ? 'bought' : 'sold'} successfully.`,
  BASE_CURRENCY_CHANGED_TO: baseCurrency =>
    `Your base currency updated to ${baseCurrency}.`,

  TIMEZONE_CHANGED_TO: timezone => `Your timezone updated to ${timezone}.`,
};

export const successes = {
  PROFILE_UPDATED: 'Your user profile is updated successfully.',
  PROFILE_IMAGE_UPDATED_SUCCESSFULLY: 'Profile image updated successfully.',
  RESET_PASSWORD_DESCRIPTION: 'Your password has been updated successfully.',
  EMAIL_CONFIRMATION_DESCRIPTION: 'Your Email has been confirmed successfully.',
  CONFIRMATION_EMAIL_SENT: email => `Verification Email sent to ${email}.`,
  USER_LOGOUT: 'You have successfully logged out.',
};
