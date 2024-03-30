import React from 'react';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

const CustomIcon = ({ icon = eyeOff, size = 20, ...props }) => {
  return <Icon icon={icon} size={size} {...props} />;
};

export default CustomIcon;