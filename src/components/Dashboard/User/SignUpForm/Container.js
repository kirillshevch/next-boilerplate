import { connect } from 'react-redux'
import { withFormik } from 'formik'
import { replace } from 'utils/redirect'
import Path from 'constants/Path'
import Component from './Component'
import User from 'store/User'
import Cookie from 'utils/cookie'
import formError from 'utils/formError'

const onSuccess = ({ props, setSubmitting, setErrors }) => (response) => {
  setSubmitting(false)
  User.actions.insertUser(response.data.data)
  Cookie.saveHeaders({}, response.headers)
  replace(Path.Dashboard.Root)
}

const handleSubmit = (values, props) =>
  User.requests.signUp(values).then(onSuccess(props)).catch(formError(props))

const formProps = ({
  handleSubmit
})

const formikComponent = withFormik(formProps)(Component)

export default connect(null, null)(formikComponent)
