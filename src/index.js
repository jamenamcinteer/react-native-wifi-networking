const { NativeModules } = require('react-native');

const { WifiManager } = NativeModules;

const GET_CURRENT_WIFI_SSID_ERRRORS = {
    CouldNotDetectSSID: 'CouldNotDetectSSID',
};

const CONNECT_ERRORS = {
    unavailableForOSVersion: 'unavailableForOSVersion',
    invalid: 'invalid',
    invalidSSID: 'invalidSSID',
    invalidSSIDPrefix: 'invalidSSIDPrefix',
    invalidPassphrase: 'invalidPassphrase',
    userDenied: 'userDenied',
    locationPermissionDenied: 'locationPermissionDenied',
    unableToConnect: 'unableToConnect',
    locationPermissionRestricted: 'locationPermissionRestricted',
    locationPermissionMissing: 'locationPermissionMissing',
    locationServicesOff: 'locationServicesOff',
    couldNotEnableWifi: 'couldNotEnableWifi',
    couldNotScan: 'couldNotScan',
    couldNotDetectSSID: 'couldNotDetectSSID',
    didNotFindNetwork: 'didNotFindNetwork',
    authenticationErrorOccurred: 'authenticationErrorOccurred',
    android10ImmediatelyDroppedConnection: 'android10ImmediatelyDroppedConnection',
    timeoutOccurred: 'timeoutOccurred',
};

const DISCONNECT_ERRORS = {
    couldNotGetWifiManager: 'couldNotGetWifiManager',
    couldNotGetConnectivityManager: 'couldNotGetConnectivityManager',
};

const IS_REMOVE_WIFI_NETWORK_ERRORS = {
    locationPermissionMissing: 'locationPermissionMissing',
    couldNotGetWifiManager: 'couldNotGetWifiManager',
    couldNotGetConnectivityManager: 'couldNotGetConnectivityManager',
};

const FORCE_WIFI_USAGE_ERRORS = {
    couldNotGetConnectivityManager: 'couldNotGetConnectivityManager',
};

const LOAD_WIFI_LIST_ERRORS = {
    locationPermissionMissing: 'locationPermissionMissing',
    locationServicesOff: 'locationServicesOff',
    jsonParsingException: 'jsonParsingException',
    illegalViewOperationException: 'illegalViewOperationException',
};

module.exports = WifiManager;
module.exports.default = WifiManager;
module.exports.GET_CURRENT_WIFI_SSID_ERRRORS = GET_CURRENT_WIFI_SSID_ERRRORS;
module.exports.CONNECT_ERRORS = CONNECT_ERRORS;
module.exports.DISCONNECT_ERRORS = DISCONNECT_ERRORS;
module.exports.IS_REMOVE_WIFI_NETWORK_ERRORS = IS_REMOVE_WIFI_NETWORK_ERRORS;
module.exports.FORCE_WIFI_USAGE_ERRORS = FORCE_WIFI_USAGE_ERRORS;
module.exports.LOAD_WIFI_LIST_ERRORS = LOAD_WIFI_LIST_ERRORS;
