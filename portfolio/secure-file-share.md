---
title: Secure File Sharing
published: 2023-07-02
path: /secure-file-share
repoUrl: https://github.com/julianstephens/secure-file-share
summary: POC using short codes to securely share files and secrets
---

# Secure File Sharing

This project is a quick proof of concept using AES encryption to securely share files, key/value secrets, or plaintext. After entering their secret data and setting an expiration time, users can generate a shareable 12 character code that can be used to decrypt the data. In a production setting, a cron job would run to regularly clean expired keys from the database, or a store with built-in expiration like Redis could alternatively be used.

### API Routes

POST `/commit`

```json
// request
{
    "contents": "string | number[]",
    "expiration": "string"
}

// response
{
    "data": {
       "code": "string",
       "exipiresAt": "Date"
    }
}
```

POST `/retrieve`

```json
// request
{
    "code": "string"
}

// response
{
    "data": {
       "content": "string | Record<string, string | number | boolean>"
    }
}
```

<img src="/secure-file-sharing.png" alt="Secure File Sharing UI" />
