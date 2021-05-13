```sequece
title Accept-Payment

participant User-Agent
participant Server
participant "Server Not Supporting Webmon" as ServerNoWebmon

User-Agent->Server:Accept-Payment: webmon/*;q=.8
User-Agent<--Server:Status:200\nPayment: webmon\n

Server->(3)ServerNoWebmon
User-Agent->ServerNoWebmon:Accept-Payment: webmon/*;q=.8
User-Agent<--ServerNoWebmon:Status:402\nPayment: \n
```

https://sequencediagram.org/
