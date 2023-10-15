const getCurrentDate = () => {
  return new Date().toISOString()
}

const Response = ({ code, status, message, data, h }) => {
  if (!message) {
    return h
      .response({
        status,
        data
      })
      .code(code)
  }

  if (!data) {
    return h
      .response({
        status,
        message
      })
      .code(code)
  }

  return h
    .response({
      status,
      message,
      data
    })
    .code(code)
}

module.exports = { getCurrentDate, Response }
