import React from 'react';
import { StyleSheet, StatusBar, KeyboardAvoidingView } from 'react-native';

const KeyboardAvoid = ({children}: any) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: StatusBar.currentHeight,
  },
});

export default KeyboardAvoid;
