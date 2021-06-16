import React, { useState } from 'react'
import { Dimensions } from 'react-native';

export const getOrientations = () => {
  if (Dimensions.get('window').width < Dimensions.get('window').height) {
    return 'portrait';
  }
  else {
    return 'landscape';
  }
}
