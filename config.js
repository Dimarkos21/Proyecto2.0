const PAGE_URL = process.env.NODE_ENV === 'production'
? 'http://localhost:3003'
: 'http://localhost:3003';

module.exports = { PAGE_URL }