/* eslint-disable import/prefer-default-export */
import config from './config';

const zeros = count => {
  let str = '';
  for (let i = 0; i < count; i += 1) {
    str += '0';
  }
  return str;
};

function scientificToDecimal(num) {
        const sign = Math.sign(num);
        //if the number is in scientific notation remove it
        if(/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
            const zero = '0';
            const parts = String(num).toLowerCase().split('e'); //split into coeff and exponent
            const e = parts.pop(); //store the exponential part
            let l = Math.abs(e); //get the number of zeros
            const direction = e/l; // use to determine the zeroes on the left or right
            const coeff_array = parts[0].split('.');

            if (direction === -1) {
                coeff_array[0] = Math.abs(coeff_array[0]);
                num = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
            }
            else {
                const dec = coeff_array[1];
                if (dec) l = l - dec.length;
                num = coeff_array.join('') + new Array(l+1).join(zero);
            }
        }

        if (sign < 0) {
            num = -num;
        }

        return num;
    }

export const numberFormat = (x, precision) => {
  if (x === undefined || x === null) return x;
  let xString = String(scientificToDecimal(x));
  if (!xString.includes('.')) xString += '.0';
  const parts = xString.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (precision)
    parts[1] = Number(`0.${parts[1]}`)
      .toFixed(precision)
      .split('.')[1];
  return Number(parts[1]) > 0
    ? parts.join('.')
    : `${parts[0]}${precision ? '.' : ''}${precision ? zeros(precision) : ''}`;
};

export const arrayOfPairsNumberFormat = array =>
  array.map(obj => {
    const newObj = {};
    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i += 1) {
      if (
        obj[keys[i]] &&
        !isNaN(obj[keys[i]]) && // eslint-disable-line
        !['id', 'name', 'address', 'change24Percentage'].includes(keys[i])
      ) {
        newObj[keys[i]] = numberFormat(obj[keys[i]], obj.priceDecimals);
      } else {
        newObj[keys[i]] = obj[keys[i]];
      }
    }
    return newObj;
  });

export const camelize = str =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(/\s+/g, '');

export const dataURItoBlob = dataURI => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  if (dataURI.indexOf(config.api.serverUrl) !== -1 || !dataURI) return dataURI;
  const byteString = atob(dataURI.split(',')[1]);
  // separate out the mime component
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];
  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const dw = new DataView(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    dw.setUint8(i, byteString.charCodeAt(i));
  }
  // write the ArrayBuffer to a blob, and you're done
  return new Blob([ab], { type: mimeString, size: byteString.length });
};

export const relu = x => (x < 0 ? 0 : x);

export const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
