# Message App
- A simple message app that accepts a message and returns a sha256 digest of the message
- Allows you to retrieve the message by inputing the sha256 digest of the same app

# Docs
- POST / message
1. Request format:
```bash
$ curl -X POST -H "Content-Type: application/json" -d '{"message": "foo"}' http://localhost:3000/messages
```
2. Response format:
```json
{
    "success": "<if the digest was computed and returned>",
    "reusable": "<If the digest can be used to retrieve original message>",
    "digest": "53c6187f30a50e54f205bf250a6652394d5b8f92d03c39a27208703ab9e21079"
}
```

- GET / message/{digest}
1. Request format:
```bash
$ curl -X GET -H "Content-Type: application/json"' http://localhost:3000/messages/{digest}
```
2. Response format:
```json
{
    "success": "<if the digest was used to get the original message>",
    "message": "<Original message or failure reason>"
}
```