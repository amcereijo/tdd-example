const SERVICE_NOT_AVAILABLE = 'Service not available';

class ServiceNotAvailableError extends Error {
  constructor() {
    super();
    this.message = SERVICE_NOT_AVAILABLE;
  }
}

ServiceNotAvailableError.message = SERVICE_NOT_AVAILABLE;

module.exports = ServiceNotAvailableError;
