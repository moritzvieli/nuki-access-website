# Simple PHP Website to Lock/Unlock a NUKI SmartLock

NUKI provides smart locks which can be operated remotely. Check https://nuki.io for more information.

## Setup

1. Connect your smart lock to a NUKI Web Account: https://web.nuki.io/
2. Go to API and create an "API tokens" with the scope "Operate devices"
3. Evaluate the smartLockId of your connected smart lock by going to "Devices", opening your smart lock and checking the URL. In the example, https://web.nuki.io/#/pages/smartlock/1234, the smartLockId would be 1234. Alternatively, you can query the ID with the following cURL: `curl -X GET --header 'Accept: application/json' --header 'Authorization: Bearer yourtoken' 'https://api.nuki.io/smartlock'`. Make sure to replace "yourtoken" with your API token and adding the scope "View devices" in the token.
4. Open the file `api.php` and fill in the two values for `AUTH_TOKEN` and `SMART_LOCK_ID`.
5. Copy the all files to your webserver and *make sure to protect it properly*.