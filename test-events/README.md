# Example Desole events

This repository contains examples for two types of Desole events.

* [from-browser-to-api.json](from-browser-to-api.json) is an example of an event format posted to the Collector API from client side apps, before enrichment
* [full-event.json](full-event.json) is an example of an event posted from the Collector API to the Collector SNS topic, after enrichment

## Submitting using CURL

```
curl -X POST https://<API URL>/prod/desole -H "Content-Type: application/json" -i --data @from-browser-to-api.json
```

