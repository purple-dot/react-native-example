import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { WebView } from "react-native-webview";
import { StatusBar } from "expo-status-bar";

const PurpleDotCheckout = ({
  apiKey,
  variantId,
  onOpen,
  onClose,
}: {
  apiKey: string;
  variantId: string;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const uri = `https://www.purpledotprice.com/embedded/placements/checkout/express?apiKey=${apiKey}&variantId=${variantId}`;
  return (
    <SafeAreaView
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      <WebView
        source={{ uri }}
        onMessage={(msg) => {
          console.log(msg.nativeEvent.data);

          if (msg.nativeEvent.data === "pd:checkout_opened") {
            onOpen();
          }
          if (msg.nativeEvent.data === "pd:checkout_closed") {
            onClose();
          }
        }}
        style={{ backgroundColor: "transparent", flex: 1 }}
      />
    </SafeAreaView>
  );
};

export default function App() {
  const [checkoutOpening, setCheckoutOpening] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>

      <Button
        onPress={() => {
          setCheckoutOpening(true);
          setCheckoutOpen(true);
        }}
        title={checkoutOpening ? "Opening..." : "Open checkout"}
      />

      <StatusBar style="auto" />

      {checkoutOpen && (
        <PurpleDotCheckout
          apiKey="b351faa2-8693-4c09-b814-759beed90d0b"
          variantId="41402618216580"
          onOpen={() => setCheckoutOpening(false)}
          onClose={() => setCheckoutOpen(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
