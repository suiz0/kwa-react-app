import React from 'react';
import {UserAvatarFilled20} from '@carbon/icons-react';
import {
    Link
  } from "react-router-dom";

const AdminOption = (props) => {
    return <Link to="/login"><UserAvatarFilled20 /></Link>
}

export default AdminOption;