# Sequence Diagrams

https://sequencediagram.org/

## Overview

```sequence
title Accept-Payment

participant User-Agent
participant "Server\n(Accepts WebMon, No Requirements)" as Server
participant "Server\n(Requiring Payment Method Ads)" as ServerNoWebmon

==User Agent configured to accept payment "webmon"==
User-Agent->Server:Accept-Payment: webmon/*;q=.8
User-Agent<--Server:Status:200\nContent-Payment: webmon\n

Server->(3)ServerNoWebmon
space
User-Agent->ServerNoWebmon:Accept-Payment: webmon/*;q=.8
User-Agent<--ServerNoWebmon:Status:402\n\n<h1> Payment Method Baz Required </h1>

space
==User Agent configured to accept payment "ads"==
User-Agent->ServerNoWebmon:Accept-Payment: ads/acceptable
User-Agent<--ServerNoWebmon:Status:200\nContent-Payment: ads/acceptable\n<h1> Showing only "Acceptable Ads" </h1>

space
==User Agent configured to NOT accept payment "ads"==
User-Agent->ServerNoWebmon:Accept-Payment: ads/*;q=0
User-Agent<--ServerNoWebmon:Status:402\n<h1> Ads are required to view this content </h1>
```
