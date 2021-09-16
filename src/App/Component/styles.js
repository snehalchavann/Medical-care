const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: theme.spacing.unit
  },
  fieldError: {
    color: 'red',
    fontSize: 10
  },
  AdminTop: {
    backgroundColor: '#1fc8db',
    height: 50,
    position: 'fixed',
    width: '100%',
    zIndex: 100
  },
  AdminAdd: {
    position: 'fixed',
    width: '100%',
    zIndex: 100,
    marginTop: 50
  },
  AdminTitle: {
    height: '100%',
    justifyContent: 'center',
    margin: 0
  },
  layout: {
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    opacity: 1,
    zIndex: 200
  },
  EditName: {
    position: 'relative',
    width: 400,
    minHeight: 130,
    top: '50%',
    padding: 10,
    textAlign: 'center',
    left: '50%',
    background: '#2196F3',
    transform: 'translate(-50%,-50%)'
  },
  EditNameInput: {
    width: '60%',
    height: 25
  },
  buttonLayout: {
    position: 'relative',
    margin: 10
  },
  buttonStyle: {
    minWidth: 80,
    minHeight: 30,
    margin: 10,
    fontSize: '1rem',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 400,
    background: '#1fc8db',
    padding: 10,
    color: 'black',
    border: 0,
    letterSpacing: '0.00938em'
  },
  FlowTop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    background: '#1fc8db'
  },
  progressWrapper: {
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white'
  }
});
export { styles };