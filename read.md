1. npx react-native init CatatanUangku --template react-native-template-typescript
2. install ini
@react-native-async-storage/async-storage@^1.14.1 @react-native-community/masked-view@^0.1.10 @react-native-picker/picker@^1.9.12 @react-navigation/bottom-tabs@^5.11.8 @react-navigation/material-top-tabs@^5.3.14 @react-navigation/native@^5.9.3 @react-navigation/stack@^5.14.3 @reduxjs/toolkit@^1.5.0 axios@^0.21.1 formik@^2.2.6 intl@^1.2.5 moment@^2.29.1 react-native-gesture-handler@^1.10.3 react-native-global-props@^1.1.5 react-native-linear-gradient@^2.5.6 react-native-reanimated@^1.13.2 react-native-responsive-dimensions@^3.1.1 react-native-safe-area-context@^3.1.9 react-native-screens@^2.18.1 react-native-splash-screen@^3.2.0 react-native-tab-view@^2.15.2 react-native-toast-message@^1.4.9 react-native-vector-icons@^8.1.0 react-native-appearance@^0.3.4 react-native-sqlite-storage@^5.0.0 react-native-paper@^4.7.2 react-redux@^7.2.2 rn-placeholder@^3.0.3 yup@^0.32.9 @react-native-community/datetimepicker@^3.4.6

@types/react-native-vector-icons@^6.4.6 @types/react-redux@^7.1.16

npx react-native link react-native-sqlite-storage react-native-vector-icons react-native-splash-screen react-native-appearance

Note: If you are using react-native version 0.60 or higher you don't need to link react-native-linear-gradient.

<!-- tambahkan ini setelah link spalshscreen -->
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import android.content.Intent; // <--- import 
import android.content.res.Configuration; // <--- import 

protected void onCreate(Bundle savedInstanceState) {
  SplashScreen.show(this);  // here
  super.onCreate(savedInstanceState);
}


# Deploy Ke Playstore dan APK Release
https://github.com/thisWandiPratama/React-Native-Bulid-Release-APK
masuk ke D:\UBAY\react_native\CatatanUangku\android\app> keytool -genkeypair -v -keystore smarthomegoiot2020-key.keystore -alias smarthomegoiot2020-key-alias -keyalg RSA -keysize 2048 -validity 10000
Enter keystore password:  satriakuda!
Re-enter new password: satriakuda!
What is your first and last name?
  [Unknown]:  ubay dillah
What is the name of your organizational unit?
  [Unknown]:  bababay tech
What is the name of your organization?
  [Unknown]:  bababay
What is the name of your City or Locality?
  [Unknown]:  Jakarta
What is the name of your State or Province?
  [Unknown]:  DKI Jakarta
What is the two-letter country code for this unit?
  [Unknown]:  ID
Is CN=ubay dillah, OU=bababay tech, O=bababay, L=Jakarta, ST=DKI Jakarta, C=ID correct?
  [no]:  yes

Generating 2,048 bit RSA key pair and self-signed certificate (SHA256withRSA) with a validity of 10,000 days
        for: CN=ubay dillah, OU=bababay tech, O=bababay, L=Jakarta, ST=DKI Jakarta, C=ID
Enter key password for <catatanuangku2021-key-alias>
        (RETURN if same as keystore password):
Re-enter new password: 
[Storing catatanuangku2021-key.keystore]

Task :react-native-firebase_admob:signingReport
Variant: debugAndroidTest
Config: debug
Store: C:\Users\bimoa\.android\debug.keystore
Alias: AndroidDebugKey
MD5: 43:D3:AA:48:92:19:C9:E1:A2:78:7E:8E:F6:D8:52:DD
SHA1: E5:D2:0E:D8:8B:FF:7C:6B:B5:45:89:D2:E9:ED:41:A3:F4:DC:A5:B6
SHA-256: C8:E6:1B:E3:B7:2F:0C:34:FD:F2:80:A2:53:2D:FF:4B:F7:71:20:8C:3E:A5:1A:54:E0:50:1E:2D:D1:E8:E0:7C
Valid until: Saturday, January 14, 2051
----------
Variant: debugUnitTest
Config: debug
Store: C:\Users\bimoa\.android\debug.keystore
Alias: AndroidDebugKey
MD5: 43:D3:AA:48:92:19:C9:E1:A2:78:7E:8E:F6:D8:52:DD
SHA1: E5:D2:0E:D8:8B:FF:7C:6B:B5:45:89:D2:E9:ED:41:A3:F4:DC:A5:B6
SHA-256: C8:E6:1B:E3:B7:2F:0C:34:FD:F2:80:A2:53:2D:FF:4B:F7:71:20:8C:3E:A5:1A:54:E0:50:1E:2D:D1:E8:E0:7C
Valid until: Saturday, January 14, 2051
----------
Variant: releaseUnitTest
Config: debug
Store: C:\Users\bimoa\.android\debug.keystore
Alias: AndroidDebugKey
MD5: 43:D3:AA:48:92:19:C9:E1:A2:78:7E:8E:F6:D8:52:DD
SHA1: E5:D2:0E:D8:8B:FF:7C:6B:B5:45:89:D2:E9:ED:41:A3:F4:DC:A5:B6
SHA-256: C8:E6:1B:E3:B7:2F:0C:34:FD:F2:80:A2:53:2D:FF:4B:F7:71:20:8C:3E:A5:1A:54:E0:50:1E:2D:D1:E8:E0:7C
Valid until: Saturday, January 14, 2051
----------

> Task :react-native-firebase_app:signingReport
Variant: debugAndroidTest
Config: debug
Store: C:\Users\bimoa\.android\debug.keystore
Alias: AndroidDebugKey
MD5: 43:D3:AA:48:92:19:C9:E1:A2:78:7E:8E:F6:D8:52:DD
SHA1: E5:D2:0E:D8:8B:FF:7C:6B:B5:45:89:D2:E9:ED:41:A3:F4:DC:A5:B6
SHA-256: C8:E6:1B:E3:B7:2F:0C:34:FD:F2:80:A2:53:2D:FF:4B:F7:71:20:8C:3E:A5:1A:54:E0:50:1E:2D:D1:E8:E0:7C
Valid until: Saturday, January 14, 2051
----------
Variant: debugUnitTest
Config: debug
Store: C:\Users\bimoa\.android\debug.keystore
Alias: AndroidDebugKey
MD5: 43:D3:AA:48:92:19:C9:E1:A2:78:7E:8E:F6:D8:52:DD
SHA1: E5:D2:0E:D8:8B:FF:7C:6B:B5:45:89:D2:E9:ED:41:A3:F4:DC:A5:B6
SHA-256: C8:E6:1B:E3:B7:2F:0C:34:FD:F2:80:A2:53:2D:FF:4B:F7:71:20:8C:3E:A5:1A:54:E0:50:1E:2D:D1:E8:E0:7C
Valid until: Saturday, January 14, 2051
----------
Variant: releaseUnitTest
Config: debug
Store: C:\Users\bimoa\.android\debug.keystore
Alias: AndroidDebugKey
MD5: 43:D3:AA:48:92:19:C9:E1:A2:78:7E:8E:F6:D8:52:DD
SHA1: E5:D2:0E:D8:8B:FF:7C:6B:B5:45:89:D2:E9:ED:41:A3:F4:DC:A5:B6
SHA-256: C8:E6:1B:E3:B7:2F:0C:34:FD:F2:80:A2:53:2D:FF:4B:F7:71:20:8C:3E:A5:1A:54:E0:50:1E:2D:D1:E8:E0:7C
Valid until: Saturday, January 14, 2051

# Membuat keystore baru petunjuk dari google
PS E:\CODE\react native\catatan_uangku_v2\android\app> keytool -genkeypair -v -storetype PKCS12 -keystore catatanuangku2021.keystore -alias catatanuangku2021 -keyalg RSA -keysize 2048 -validity 9125
Enter keystore password:  
Re-enter new password: 
What is your first and last name?
  [Unknown]:  ubay dillah
What is the name of your organizational unit?
  [Unknown]:  ubay tech
What is the name of your organization?
  [Unknown]:  ubay
  [Unknown]:  id
Is CN=ubay dillah, OU=ubay tech, O=ubay, L=jakarta, ST=dki jakarta, C=id correct?
  [no]:  yes

Generating 2,048 bit RSA key pair and self-signed certificate (SHA256withRSA) with a validity of 9,125 days   
        for: CN=ubay dillah, OU=ubay tech, O=ubay, L=jakarta, ST=dki jakarta, C=id
[Storing catatanuangku2021.keystore]

# export ke PEM
PS E:\CODE\react native\catatan_uangku_v2\android> keytool -export -rfc -alias upload -file upload_certificate.pem -keystore catatanuangku2021.jks
