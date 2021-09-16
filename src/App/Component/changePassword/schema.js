export default {
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    format: {
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,100}$'
    },
    length: {
      minimum: 6,
      message: "must be at least 6 characters"
    }
  },
  rematch: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
      message: "Re-enter the password"
    }
  },
};