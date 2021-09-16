export default {
    fName: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        minimum: 3,
        message: "must be at least 3 characters"
      }
    },
    lName: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
          minimum: 3,
          message: "must be at least 3 characters"
        }
      },
      addLine1: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
          minimum: 6,
          message: "must be at least 6 characters"
        }
      },
      phone: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
          minimum: 10,
          maximum: 10,
          message: "valid phone number with 10 digits"
        }
      },
      zipcode: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
          minimum: 6,
          maximum: 6,
          message: "valid zipcode"
        }
      },
      city: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
          minimum: 3,
          message: "must be at least 3 characters"
        }
      },
      state: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
          minimum: 3,
          message: "must be at least 3 characters"
        }
      }
  };