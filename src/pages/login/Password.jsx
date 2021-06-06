import TextField from '@material-ui/core/TextField';

export default function PassWord(props) {

  return (
    <div>
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        value={props.password}
        autoComplete="current-password"
        variant="outlined"
        onChange={props.onPasswordChange}
        InputProps={{
          style: {
            width: 250
          }
        }}
      />
    </div>
  )
}