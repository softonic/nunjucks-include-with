import nunjucks from 'nunjucks';
import path from 'path';

const RELATIVE_PATH_REGEXP = /^\.{1,2}\//;

/**
 * Include file with scoped data implementation for Nunjucks
 * @example
 * //Initialize IncludeWithNunjucksExtension
 * nunjucksEnv.addExtension('includeWith', new IncludeWithNunjucksExtension({
 *  nunjucksEnv
 * }));
 *
 * //Template
 * {% includeWith "objects/media/media_user_opinion_extended.tpl",
 *  { name: 'Test' },
 *  { useContext: true }
 * %}
 * @class
 */
export default class IncludeWithNunjucksExtension {
  constructor({ nunjucksEnv, tagName = 'includeWith' }) {
    this._nunjucksEnv = nunjucksEnv;
    this._cwd = null;
    this.tags = [tagName];
  }

  /**
   * @param {Object} parser
   * @param {Object} nodes
   * @return {Object}
   */
  parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);

    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtension(this, 'run', args, null);
  }

  /**
   * @param {string} templateSrc
   * @param {string} templatePath
   * @return {string}
   */
  preprocess(templateSrc, templatePath) {
    this._cwd = path.dirname(templatePath);
    return templateSrc;
  }

  /**
   * @param {Object} context
   * @param {string} partialPath
   * @param {Object} [data]
   * @param {boolean} [config.useContext=true]
   * @return {string}
   */
  run(context, partialPath, data = {}, { useContext = true } = {}) {
    const fullPartialPath = RELATIVE_PATH_REGEXP.test(partialPath) ?
      path.resolve(this._cwd, partialPath) :
      partialPath;

    const composedData = useContext ? Object.assign({}, context.ctx, data) : data;
    const renderResult = this._nunjucksEnv.render(fullPartialPath, composedData);
    return new nunjucks.runtime.SafeString(renderResult);
  }
}
