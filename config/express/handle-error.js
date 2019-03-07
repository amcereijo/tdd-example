const DEFAULT_STATUS_CODE = 500;
const DEFAULT_ERROR = 'Error';
const DEFAULT_ERROR_CODE = 5000;
const DEFAULT_ERROR_MESSAGE = 'Sorry an internal error has occurred';

/**
 * handleError
 *
 * @param {Object} error
 * @param {Number} error.responseCode - response status code
 * @param {String} error.responseMessage - text to export
 * @param {Object[]} error.responseErrors
 */
function handleError(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  console.error(error.error || error);

  const {
    responseCode = DEFAULT_STATUS_CODE,
    responseError = DEFAULT_ERROR,
    responseMessage = DEFAULT_ERROR_MESSAGE,
    responseErrors,
  } = error;

  const response = {
    error: responseError,
    message: responseMessage,
    code: error.errorCode || DEFAULT_ERROR_CODE,
  };

  if (responseErrors) {
    response.errors = responseErrors;
  }

  return res
    .status(responseCode)
    .json(response);
}

function initHandleError(app) {
  app.use(handleError);

  console.log('[server] Loaded handleError middleware');
}

module.exports = initHandleError;
