// /* eslint-env mocha */
const expect = require('chai').expect
const request = require('axios')
const Procmonrest = require('procmonrest')

describe('the not found page', () => {
  let server = null
  let response = null

  before(() => {
    server = new Procmonrest({
      command: 'npm start',
      waitFor: /Listening on port \d{4}/
    })

    return server
      .start()
      .then(() => {
        return request('http://localhost:3000')
      })
      .then((res) => {
        response = res
      })
  })

  after(() => {
    return server.stop()
  })

  it('must have a status code of 200', () => {
    const expected = 200
    const actual = response.statusCode
    expect(actual).to.equal(expected)
  })

  it('must have the correct content-type', () => {
    const pattern = /^text\/html/
    const actual = response.headers['content-type']
    expect(actual).to.match(pattern)
  })
})
