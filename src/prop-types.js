import PropTypes from 'prop-types'

export const authPropType = PropTypes.shape({
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
})
