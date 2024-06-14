import { useMask } from '@react-input/mask';
import { useState } from 'react';
import doAPIRequest from './utils/doAPIRequest';
import Spinner from './subcomponents/Spinner';
import List from './subcomponents/List';

function App() {

  const inputMaskRef = useMask({ mask: '__-__-__', replacement: { _: /\d/ } });

  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [listItems, setListItems] = useState([]);
  const [listVisible, setListVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const updateEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const updateNumber = (event) => {
    const value = event.target.value;
    const valueFormatted = value.split('-').join('');
    setNumber(valueFormatted);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const urlQuery = number ? new URLSearchParams({ email, number }) : new URLSearchParams({ email });
    setListVisible(true);
    doAPIRequest(`/api/search?${urlQuery}`).then((response) => {
      console.log(response.result)
      setLoading(false);
      setListItems(response.result);
    });
  }


    return (
      <div className='container'>
        <div className='row'>
          <form onSubmit={submitHandler} className="text-center">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address:</label>
              <input type="email" onKeyUp={updateEmail} className="form-control" id="email" name="email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="form-label">Number:</label>
              <input type="text" onKeyUp={updateNumber} ref={inputMaskRef} className="form-control" id="number" name="number" />
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
        <div className='row'>
          <ul>
            {listVisible ? (loading ? <Spinner /> : <List listItems={listItems} />) : ''}
          </ul>
        </div>
      </div>
    )
 



}

export default App
