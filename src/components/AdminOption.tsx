import React from 'react';
import {
    Link
  } from "react-router-dom";

const AdminOption = (props) => {
    return <Link to="/login">{props.t('Admin')}</Link>
}

export default AdminOption;