export class MaxNumberOfCheckInError extends Error {
  constructor() {
    super('Max number of check-ins reached.')
  }
}
