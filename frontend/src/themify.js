import cx from 'classnames';

/**
 * Inject theme style to a class
 * @param {imported style object from a .css file} s
 * @param {className we want to add theme styles to it} className
 * @param {theme that is either light or dark} theme
 */
const themify = (s, className, theme) => {
  let output = '';
  switch (theme) {
    case 'light':
      if (arguments.length === 3) {
        output = cx(className, s.light);
      } else {
        output = s.light;
      }
      break;

    case 'dark':
      if (arguments.length === 3) {
        output = cx(className, s.dark);
      } else {
        output = s.dark;
      }
      break;

    case 'darkCmc':
      if (arguments.length === 3) {
        output = cx(className, s.darkCmc);
      } else {
        output = s.darkCmc;
      }
      break;

    default:
      break;
  }

  return output;
};

export default themify;
