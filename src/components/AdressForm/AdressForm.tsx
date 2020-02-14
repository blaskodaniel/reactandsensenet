import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { GeneralProps } from '../../Types';
import { ShareContext } from '../../contexts/sharecontext';

export interface IAddressForm extends GeneralProps {
  required?: string[],
  title?: string
}

export default function AddressForm (props: IAddressForm) {
  const [data, setdata] = useState<IAddressForm>()
  const sharecontext = useContext(ShareContext)

  useEffect(()=>{
      try{
        if(props){
            setdata(props)
            console.log("AddressForm: ",props)
        }
      }catch(ex){
        console.log("Error in AddressForm component with props", ex.message)
      }
  },[props])  

  const isRequired = (name:string) => {
      if(data && data.required){
          const req = data.required.find((x:any)=>name.toLowerCase() === x.toLowerCase())
          if(req){
              return true
          }else{
              return false
          }
      } 
  }

  const SubmitForm = () => {
    sharecontext.setdata("Lófing")
  }
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {data ? data.title : ""}
      </Typography>
      <p></p>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required={isRequired("firstName")}
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required={isRequired("lastName")}
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required={isRequired("address1")}
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required={isRequired("address2")}
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required={isRequired("city")}
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required={isRequired("zip")}
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required={isRequired("country")}
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={SubmitForm}>
                Register
            </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}