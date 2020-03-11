import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../actions/index';
import LogIn from './LogIn';

interface IRootState {
  user: any;
}

const mapStateToProps = (state: IRootState) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ setUser }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn)