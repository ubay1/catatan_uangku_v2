import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, ScrollView } from 'react-native';

const ScrollViewAtom = ({children, backgroundColor}: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{...styles.scrollView, backgroundColor: backgroundColor}}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});

export default ScrollViewAtom;
