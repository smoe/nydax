const text = {
  TITLE: 'Take a selfie',
  DESCRIPTION: token =>
    `${'Hold up a ' +
      '<b> handwritten </b>' +
      ' note with this character sequence: "' +
      '<b>'}${token}</b>` +
    `" and take a selfie.` +
    `<br/>` +
    `Make sure your selfie clearly shows your face`,
  SUBMIT: 'Submit',
  GO_BACK: 'Go Back',
  GO_LIVE_MESSAGE: 'Click to use your device camera.',
  TAKE_PICTURE_MESSAGE: 'Click to take picture',
  ERROR:
    'Can not receive a media stream. It seems there is a problem with your device webcam.',
};
export default text;
