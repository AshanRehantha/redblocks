import React from 'react'
import SystemRouters from './routers/SystemRouters';
import { UiErrorMessageModal, UiSuccessMessageModal } from './common/MessageModal';
import Loader from './common/Loader';

const App = () => {
  return (
    <React.Fragment>
      <UiSuccessMessageModal/>
      <UiErrorMessageModal/>
      <Loader/>
      <SystemRouters/>
    </React.Fragment>
  )
}

export default App;

