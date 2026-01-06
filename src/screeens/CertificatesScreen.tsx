import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SectionScreen from "./SectionScreen";

const CertificatesScreen = () => {
  return (
    <SectionScreen
      sectionName="Certificates"
      section="certificates"
      iconName="document-outline"
    />
  );
};

export default CertificatesScreen;

const styles = StyleSheet.create({});
