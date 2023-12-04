const search = require('./search/search');
const unfitSearch = require('./search/unfitSearch');
import _prefixPN from './prefixPN';

module.exports = {
  unfitSearch,
  search,
};

export const prefixPN = _prefixPN;