import "bootstrap/dist/css/bootstrap.min.css";

import { useRef, useState } from "react";

function App() {  

  const fpw = useRef('');
  const spw = useRef('');

  const [match, setMatch] = useState(null);
  const [validLength, setValidLength] = useState(null);
  const [upperCase, setUpperCase] = useState(null);
  const [lowerCase, setLowerCase] = useState(null);
  const [hasNumber, setHasNumber] = useState(null);
  const [specialChar, setSpecialChar] = useState(null);
  const [hidePws, setHidePws] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  let firstPassword = ''
  let secondPassword = '';
  const requiredLength = 6

  const onSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    firstPassword = fpw.current.value
    secondPassword = spw.current.value
    
    setMatch(firstPassword && firstPassword === secondPassword);
    setValidLength(firstPassword.length >= requiredLength ? true : false);
    setUpperCase(firstPassword.toLowerCase() !== firstPassword);
    setLowerCase(firstPassword.toUpperCase() !== firstPassword);
    setHasNumber(/\d/.test(firstPassword));
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(firstPassword));

  };

  const handleClickShowPassword = e => {setHidePws(!hidePws)}

  return (
    <div 
      className='bg-light border border-primary rounded p-2 m-2'
      style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
      <form onSubmit={onSubmit} className='p-2 m-2'>
        <div className="row p-2 mx-auto my-2">
          <div className='col-sm-4 col-12 p-2 text-center'>Password:</div>
          <div className='col-sm-8 col-12 p-2 text-center'>
            <input type={(hidePws) ? 'password' : 'text'} ref={fpw} />
          </div>
          <div className='col-sm-4 col-12 p-2 text-center nowrap'>Confirm Password:</div>
          <div className='col-sm-8 col-12 p-2 text-center'>
            <input type={(hidePws) ? 'password' : 'text'} ref={spw} />
          </div>
          <div className='col-12 p-2 text-center'>
            <input type="checkbox" class="form-check-input" id="hideshow" onClick={handleClickShowPassword} />
            <label class="form-check-label" for="hideshow">{(hidePws) ? 'show passwords' : 'hide passwords'}</label>
          </div>
          <div className='col-12 p-2 text-center'>
            <button className='btn btn-primary'>Submit</button>
          </div>
        </div>
      </form>

    {submitted &&
      <div>
        {(match && validLength && hasNumber && upperCase && lowerCase && specialChar) ?
          <div className='bg-success text-left text-white p-2 border border-primary rounded'>
            <p>Congratulations!</p><p>Your password has been created.</p>
          </div>
        :
        <ul className='list-unstyled bg-warning text-left text-white p-2 border border-primary rounded'>
          {!match &&  
          <li>
            Your passwords must match
          </li>}
          {!validLength &&  
          <li>
            Your password must be at least 6 characters
          </li>}
          {!upperCase &&  
          <li>
            Your password must contain at least one uppercase
          </li>}
          {!lowerCase &&  
          <li>
            Your password must contain at least one lowercase
          </li>}
          {!hasNumber &&  
          <li>
            Your password must contain at least one number
          </li>}
          {!specialChar &&  
          <li>
            Your password must contain at least one special character
          </li>}
        </ul>
      }
    </div>
  }
    
</div>);
}

export default App;