# Message App
- A simple message app that accepts a message and returns a sha256 digest of the message
- Allows you to retrieve the message by inputing the sha256 digest of the same app

# Docs
- POST / message
```bash
$ curl -X POST -H "Content-Type: application/json" -d '{"message": "foo"}' http://localhost:3000/messages
```