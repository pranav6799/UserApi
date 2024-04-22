module.exports = (err, req, resp, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status

  resp.status(err.statusCode).json({
    status:err.status,
    message:err.message
  })
}
