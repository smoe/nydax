export const titles = {
  SERVER_ERROR: 'Server error',
  CONFIRM_EMAIL: 'Email confirmation',
  RESET_PASSWORD_EMAIL_ERROR: 'Reset password Email error',
  LOGIN_ERROR: 'Login error',
  REGISTRATION_ERROR: 'Registration error',
  USER_INFO_ERROR: 'User information error',
  GET_INFO_ERROR: 'Retreive info error',
  PAIR_INFO_ERROR: 'Pair information error',
  PRICE_INFO_ERROR: 'Price information error',
  INVITATION_ERROR: 'Invitation Error',
  WITHDRAW_ERROR: 'Withdrawal error',
  CANCEL_ORDER: 'Order Cancellation',
  RESET_PASSWORD: 'Reset password',
  FAVOURITE_PAIR: 'Favourite pair',
  FAVOURITE_CHART: 'Favourite chart',
  USER_PROFILE: 'User profile',
  ORDER_SENT: 'Order sent',
  ORDER_ERROR: 'Order error',
  TRANSACTION_REGISTERATION: 'Transaction registration',
  AUTHENTICATION: 'Authentication',
  INVITATION: 'Invitation',
  GOOGLE_AUTH: 'Google authentication',
  SMS_AUTHENTICATION: 'SMS authentication',
  VERIFY_IDENTITY: 'Identity verification',
  FETCH_STATE_ERROR: 'Fetching state error',
  ORDER_BOOK_ERROR: 'Fetching order book error',
  PERMISSION: 'Permission',
  PAYMENT_ERROR: 'Payment error',
  PAYMENT: 'Payment',
};

export const errors = {
  DATABASE_ERROR: 'Database error',
  EMAIL_SEND_ERROR: 'Error in sending Email.',
  FIRST_NAME_FIELD_IS_EMPTY: 'Please enter your first name.',
  FIRST_NAME_IS_NOT_PROVIDED: 'Please provide first name.',
  LAST_NAME_FIELD_IS_EMPTY: 'Please enter your last name.',
  LAST_NAME_IS_NOT_PROVIDED: 'Please provide last name.',
  NAME_IS_TOO_LONG: 'Your name is too long.',

  EMAIL_FIELD_IS_EMPTY: 'Please enter your Email.',
  EMAIL_FORMAT_IS_INCORRECT: 'Please enter your Email correctly.',
  EMAIL_IS_TOO_LONG: 'Your Email address is too long.',
  EMAIL_IS_NOT_PROVIDED: 'Please provide Email address.',

  PASSWORD_FIELD_IS_EMPTY: 'Please enter your password.',
  PASSWORD_IS_TOO_SIMPLE: 'Your password is too simple.',
  PASSWORD_IS_TOO_LONG: 'Your password is too long.',
  PASSWORD_IS_NOT_PROVIDED: 'Please provide password.',

  TOKEN_FIELD_IS_EMPTY: 'Please enter token.',
  TOKEN_IS_TOO_LONG: 'Token is too long.',

  EMAIL_PASSWORD_IS_WRONG: 'Email or password is wrong.',
  EMAIL_IS_REGISTERED_BEFORE: 'This Email is registered before.',

  PHONE_NUMBER_FIELD_IS_EMPTY: 'Please enter phone number.',
  PHONE_NUMBER_IS_TOO_LONG: 'Your phone number is too long.',
  PHONE_NUMBER_FORMAT_INCORRECT: 'Your phone number format is incorrect.',
  PHONE_NUMBER_NOT_PROVIDED: 'Please provide phone number.',

  ID_FIELD_IS_EMPTY: 'Please enter id,',
  ID_IS_TOO_LONG: 'Your id is too long.',
  ID_IS_NOT_NUMBER: 'Id type is not number.',
  ID_IS_NOT_PROVIDED: 'Please provide id.',

  PAIR_ID_IS_NOT_PROVIDED: 'Please provide pair id.',
  PAIR_NAME_IS_NOT_PROVIDED: 'Please provide pair name.',

  USER_IS_SUSPENDED: 'User has been suspended due to several failed attempts.',
  USER_EMAIL_ALREADY_CONFIRMED: 'This Email is already confirmed.',

  CONFIRM_EMAIL_TOKEN_NOT_PROVIDED: 'Confirmation token is not provided.',
  CONFIRM_EMAIL_TOKEN_NOT_VALID: 'Confirmation token is not valid.',
  PLEASE_CONFIRM_YOUR_EMAIL: 'Please confirm your Email.',

  AUTH_TOKEN_NOT_PROVIDED: 'Authentication token is not provided.',

  RESET_PASSWORD_LINK_NOT_SEND:
    'Problem in sending reset password link to your Email.',

  RESET_PASSWORD_TOKEN_NOT_PROVIDED: 'Reset password token is not provided.',
  RESET_PASSWORD_TOKEN_NOT_VALID: 'Reset password token is not valid.',

  SMS_TOKEN_IS_NOT_VALID: 'Sms token is not valid.',
  SMS_TOKEN_NOT_PROVIDED: 'Sms token is not provided.',

  GOOGLE_AUTH_TOKEN_INVALID: 'Google authentication token is not valid.',
  GOOGLE_AUTH_GET_QRCODE_ERROR: 'Can not get qrcode image.',
  GOOGLE_TOKEN_NOT_PROVIDED: 'Google authenticator token is not provided.',

  UPSERT_ERROR: 'Error in insertion or updating the record.',
  UPDATE_ERROR: 'Error in updating the record.',
  REMOVE_ERROR: 'Error in removing the record.',
  SET_NEW_PASSWORD_ERROR: 'Error in setting new password',
  EDIT_PROFILE_ERROR: 'Error in updating profile',

  FAVOURITE_CHART: 'Favourtie chart',
  FAVOURITE_CHART_EXIST_BEFORE:
    'This favourite chart exist before for this user.',
  FAVOURITE_CHART_NOT_EXIST: 'This favourite chart does not exist.',

  USER_ALREADY_SIGNED_IN: 'You are logged in before.',
  USER_DOES_NOT_EXIST: 'User does not exist.',
  TOKEN_IS_NOT_VALID: 'This token is not valid.',

  USERNAME_FIELD_IS_EMPTY: 'Please enter your username.',
  USERNAME_IS_TOO_LONG: 'Your username is too long.',

  ORDER_ADD_PROBLEM: 'Order registration problem',
  ORDER_CANCEL_PROBLEM: 'Order cancellation problem',

  WALLET_CREATION_ERROR: 'Wallets did not created successfully.',

  USER_PROFILE_NOT_FOUND: 'User profile not found',
  PROFILE_PIC_UPLOAD: 'Profile pic upload error',

  GET_COUNTRIES_INFO: 'Error in retrieving countries information.',
  GET_CURRENCIES_INFO: 'Error in retrieving currencies information.',
  GET_TIMEZONES_INFO: 'Error in retrieving timezones information.',
  GET_TOKEN_ERROR: 'Error in retrieving token information.',

  INVITATION_ERROR: 'Error in invitation.',

  WALLET_BALANCE_NOT_ENOUGH: 'Wallet balance is not enough.',

  TRANSFER_ERROR: 'Transfer error',

  RECAPTCHA_VALIDATION_ERROR: 'Problem in recaptcha token validation.',

  PROBLEM_SENDING_SMS: 'Problem in sending SMS.',

  NO_PERMISSION: 'You dont have permission to access this entity.',
  ADD_PAYMENT_ERROR: 'Charge wallet request encountered an error.',
  GET_PAYMENT_ERROR: 'There was an error fetching the payment.',
  CURRENCY_NOT_SUPPORTED_FOR_PAYMENT: 'Currency not yet supported for payment.',
  BAD_TOKEN: 'Bad token.',
  BAD_CURRENCY: 'Bad currency.',
  PAYMENT_ALREADY_PAID: 'Already paid.',
  PAYMENT_ALREADY_FAILED: 'The payment had been already failed and closed.',
  PAYMENT_FAILED: 'Payment failed.',
  PAYMENT_UNKNOWN_ERROR: 'Payment has encountered a problem.',

  USER_VERIFICATION_STATUS_DETERMINED_BEFORE:
    'User verification status is determined before',

  AMOUNT_IS_GREATER_THAN_MAX: (symbol, amount) =>
    `${symbol} amount must be smaller than ${amount}.`,
};

export const successes = {
  SIGNED_IN: 'You are logged in successfully.',
  SIGNED_UP: 'You are registered successfully.',
  ITEM_CREATED: itemType => `${itemType} created successfully.`,
  ITEM_UPDATED: itemType => `${itemType} updated successfully.`,
  ITEM_REMOVED: itemType => `${itemType} removed successfully.`,

  CONFIRM_EMAIL: 'Email confirmation',
  EMAIL_CONFIRMED_SUCCESSFULLY: 'Email confirmed successfully.',

  RESET_PASSWORD_LINK_SENT: 'Reset password link sent to your Email.',

  RESET_PASSWORD_SUCCESSFULLY:
    'Your password changed successfully. Enter with your new password.',

  FAVOURITE_PAIR_REMOVED: 'Favourite pair removed successfully.',
  FAVOURITE_PAIR_ADDED: 'Favourite pair added successfully',

  FAVOURITE_CHART_REMOVED: 'Favourite chart removed successfully',
  FAVOURITE_CHART_ADDED: 'Favourite chart added successfully',

  USER_BASE_CURRENCY_CHANGED: 'User base currency changed.',
  USER_TIMEZONE_CHANGED: 'User timezone changed.',

  CANCEL_ORDER_DONE_SUCCESSFULLY: 'Order cancellation completed successfully.',
  REGISTER_ORDER_SENT_SUCCESSFULLY: 'Order registered successfully.',

  SMS_TOKEN_VERIFIED: enabled =>
    `SMS verification ${enabled ? 'enabled' : 'disabled'} successfully.`,

  WITHDRAW_REGISTERED: (tokenName, amount) =>
    `${amount} ${tokenName} were successfully withdrawn from your account.`,
  DEPOSIT_DONE: (tokenName, amount) =>
    `${amount} ${tokenName} were successfully deposited into your account.`,

  TOKEN_IS_VERIFIED: 'Token is verified.',

  VERIFY_IDENTITY_SUCCESS: 'Your identity information uploaded successfully.',

  GOOGLE_AUTH_ENABLED: 'Google authentication enabled successfully.',
  GOOGLE_AUTH_DISABLED: 'Google authentication disabled successfully.',

  INVITATION_DONE: 'Invitation Emails sent successfully.',
  PAYMENT_SUCCESSFULL: 'Paid successfully and was added to your wallet',
};
