import TextField from '@material-ui/core/TextField';

export default function Email(props) {
  
  return (
    <div>
      <TextField
        required
        id="margin-dense"
        label="Email"
        variant="outlined"
        value={props.email}
        onChange={props.onEmailChange}
        error={props.isEmailError}
        helperText={props.emailError}
        InputProps={{
          style: {
            width: 250
          }
        }}
      />
    </div>
  )
}