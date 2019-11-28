import xss from 'xss';

const options = {
  whiteList: [], // empty, means filter out all tags
  stripIgnoreTag: true, // filter out all HTML not in the whilelist
  stripIgnoreTagBody: ['script'], // the script tag is a special case, we need
  // to filter out its content
};

export default input => xss(input, options);
