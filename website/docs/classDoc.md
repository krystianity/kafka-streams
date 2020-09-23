---
id: classDoc
title: Class Documentation
sidebar_label: Class Documentation
---

## Summary

| Class | Description |
| - | - |
| [KeyCount](#keycount) | used to count keys in a stream |
| [LastState](#laststate) | used to hold the last state of key values in a stream e.g. building KTables |
| [Max](#max) | used to grab the highest value of key values in a stream |
| [Min](#min) | used grab the lowest value of key values in a stream |
| [Sum](#sum) | used to sum up key values in a stream |
| [Window](#window) | used to build windows of key value states in a stream |
| [JSKafkaClient](#jskafkaclient) |  |
| [NativeKafkaClient](#nativekafkaclient) |  |
| [KStream](#kstream) | change-log representation of a stream |
| [KTable](#ktable) | table representation of a stream |
| [StreamDSL](#streamdsl) | Stream base class |

## KeyCount
used to count keys in a stream

**Kind**: global class  

## LastState
used to hold the last state of key values
in a stream e.g. building KTables

**Kind**: global class  

## Max
used to grab the highest value of key values
in a stream

**Kind**: global class  

## Min
used grab the lowest value of
key values in a stream

**Kind**: global class  

## Sum
used to sum up key values in a stream

**Kind**: global class  

## Window
used to build windows of key value states
in a stream

**Kind**: global class  

## JSKafkaClient
**Kind**: global class  

* [JSKafkaClient](#jskafkaclient)
    * [new JSKafkaClient(topic, config)](#new_jskafkaclient_new)
    * [.setProduceHandler(handler)](#jskafkaclient+setproducehandler)
    * [.getProduceHandler()](#jskafkaclient+getproducehandler) ⇒ `null` \| `EventEmitter`
    * [.overwriteTopics(topics)](#jskafkaclient+overwritetopics)
    * [.start(readyCallback, kafkaErrorCallback, withProducer, withBackPressure)](#jskafkaclient+start)
    * [.setupProducer(produceTopic, partitions, readyCallback, kafkaErrorCallback, outputKafkaConfig)](#jskafkaclient+setupproducer)
    * [.send(topic, message)](#jskafkaclient+send) ⇒ `\*`
    * [.buffer(topic, identifier, payload, compressionType)](#jskafkaclient+buffer) ⇒ `\*`
    * [.bufferFormat(topic, identifier, payload, version, compressionType)](#jskafkaclient+bufferformat) ⇒ `\*`


### new JSKafkaClient(topic, config)
KafkaClient (EventEmitter)
that wraps an internal instance of a
Sinek kafka- Consumer and/or Producer


| Param |
| --- |
| topic | 
| config | 

### jsKafkaClient.setProduceHandler(handler)
sets a handler for produce messages
(emits whenever kafka messages are produced/delivered)

**Kind**: instance method of [`JSKafkaClient`](#jskafkaclient)  

| Param | Type |
| --- | --- |
| handler | `EventEmitter` | 


### jsKafkaClient.getProduceHandler() ⇒ `null` | `EventEmitter`
returns the produce handler instance if present

**Kind**: instance method of [`JSKafkaClient`](#jskafkaclient)  

### jsKafkaClient.overwriteTopics(topics)
overwrites the topic

**Kind**: instance method of [`JSKafkaClient`](#jskafkaclient)  

| Param | Type |
| --- | --- |
| topics | `Array.&lt;string&gt;` | 

### jsKafkaClient.start(readyCallback, kafkaErrorCallback, withProducer, withBackPressure)
starts a new kafka consumer (using sinek's partition drainer)
will await a kafka-producer-ready-event if started withProducer=true

**Kind**: instance method of [`JSKafkaClient`](#jskafkaclient)  

| Param | Default |
| --- | --- |
| readyCallback |  | 
| kafkaErrorCallback |  | 
| withProducer | `false` | 
| withBackPressure | `false` | 

### jsKafkaClient.setupProducer(produceTopic, partitions, readyCallback, kafkaErrorCallback, outputKafkaConfig)
starts a new kafka-producer using sinek's publisher
will fire kafka-producer-ready-event
requires a topic's partition count during initialisation

**Kind**: instance method of [`JSKafkaClient`](#jskafkaclient)  

| Param | Default |
| --- | --- |
| produceTopic |  | 
| partitions | `1` | 
| readyCallback |  | 
| kafkaErrorCallback | | 
| outputKafkaConfig | | 

### jsKafkaClient.send(topic, message) ⇒ `*`
simply produces a message or multiple on a topic
if producerPartitionCount is > 1 it will randomize
the target partition for the message/s

**Kind**: instance method of [`JSKafkaClient`](#jskafkaclient)  

| Param |
| --- |
| topic | 
| message | 

### jsKafkaClient.buffer(topic, identifier, payload, compressionType) ⇒ `*`
buffers a keyed message to be send
a keyed message needs an identifier, if none is provided
an uuid.v4() will be generated

**Kind**: instance method of [`JSKafkaClient`](#jskafkaclient)  

| Param | Default |
| --- | --- |
| topic |  | 
| identifier |  | 
| payload |  | 
| compressionType | `0` | 

### jsKafkaClient.bufferFormat(topic, identifier, payload, version, compressionType) ⇒ `*`
buffers a keyed message in (a base json format) to be send
a keyed message needs an identifier, if none is provided
an uuid.4() will be generated

**Kind**: instance method of [`JSKafkaClient`](#jskafkaclient)  

| Param | Default |
| --- | --- |
| topic |  | 
| identifier |  | 
| payload |  | 
| version | `1` | 
| compressionType | `0` | 

## NativeKafkaClient
**Kind**: global class  

* [NativeKafkaClient](#nativekafkaclient)
    * [new NativeKafkaClient(topic, config, batchOptions)](#new_nativekafkaclient_new)
    * [.setProduceHandler(handler)](#nativekafkaclient+setproducehandler)
    * [.getProduceHandler()](#nativekafkaclient+getproducehandler) ⇒ `null` \| `EventEmitter`
    * [.overwriteTopics(topics)](#nativekafkaclient+overwritetopics)
    * [.start(readyCallback, kafkaErrorCallback, withProducer, withBackPressure)](#nativekafkaclient+start)
    * [.setupProducer(produceTopic, partitions, readyCallback, kafkaErrorCallback, outputKafkaConfig)](#Nativekafkaclient+setupproducer)
    * [.send(topicName, message, partition, key, partitionKey, opaqueKey)](#nativekafkaclient+send) ⇒ `Promise.&lt;void&gt;`
    * [.buffer(topic, identifier, payload, _, partition, version, partitionKey)](#nativekafkaclient+buffer) ⇒ `Promise.&lt;void&gt;`
    * [.bufferFormat(topic, identifier, payload, version, _, partitionKey, partition)](#nativekafkaclient+bufferformat) ⇒ `Promise.&lt;void&gt;`

### new NativeKafkaClient(topic, config, batchOptions)
NativeKafkaClient (EventEmitter)
that wraps an internal instance of a
Sinek native kafka- Consumer and/or Producer


| Param | Description |
| --- | --- |
| topic |  |
| config |  |
| batchOptions | optional |

### nativeKafkaClient.setProduceHandler(handler)
sets a handler for produce messages
(emits whenever kafka messages are produced/delivered)

**Kind**: instance method of [`NativeKafkaClient`](#nativekafkaclient)  

| Param | Type |
| --- | --- |
| handler | `EventEmitter` | 

### nativeKafkaClient.getProduceHandler() ⇒ `null` \| `EventEmitter`
returns the produce handler instance if present

**Kind**: instance method of [`NativeKafkaClient`](#nativekafkaclient)  

### nativeKafkaClient.overwriteTopics(topics)
overwrites the topic

**Kind**: instance method of [`NativeKafkaClient`](#nativekafkaclient)  

| Param | Type |
| --- | --- |
| topics | `Array.&lt;string&gt;` |

### nativeKafkaClient.start(readyCallback, kafkaErrorCallback, withProducer, withBackPressure)
starts a new kafka consumer
will await a kafka-producer-ready-event if started withProducer=true

**Kind**: instance method of [`NativeKafkaClient`](#nativekafkaclient)  

| Param | Default |
| --- | --- |
| readyCallback |  | 
| kafkaErrorCallback |  | 
| withProducer | `false` | 
| withBackPressure | `false` | 

### nativeKafkaClient.setupProducer(produceTopic, partitions, readyCallback, kafkaErrorCallback, outputKafkaConfig)
starts a new kafka-producer
will fire kafka-producer-ready-event
requires a topic's partition count during initialisation

**Kind**: instance method of [`NativeKafkaClient`](#nativekafkaclient)  

| Param | Default |
| --- | --- |
| produceTopic |  | 
| partitions | `1` | 
| readyCallback |  | 
| kafkaErrorCallback |  | 
| outputKafkaConfig |  | 

### nativeKafkaClient.send(topicName, message, partition, key, partitionKey, opaqueKey) ⇒ `Promise.&lt;void&gt;`
simply produces a message or multiple on a topic
if producerPartitionCount is > 1 it will randomize
the target partition for the message/s

**Kind**: instance method of [`NativeKafkaClient`](#nativekafkaclient)  

| Param | Default | Description |
| --- | --- | --- |
| topicName |  |  |
| message |  |  |
| partition |  | optional |
| key |  | optional |
| partitionKey |  | optional |
| opaqueKey |  | optional |

### nativeKafkaClient.buffer(topic, identifier, payload, _, partition, version, partitionKey) ⇒ `Promise.&lt;void&gt;`
buffers a keyed message to be send
a keyed message needs an identifier, if none is provided
an uuid.v4() will be generated

**Kind**: instance method of [`NativeKafkaClient`](#nativekafkaclient)  

| Param | Default | Description |
| --- | --- | --- |
| topic |  |  |
| identifier |  |  |
| payload |  |  |
| _ |  | optional |
| partition |  | optional |
| version |  | optional |
| partitionKey |  | optional |

### nativeKafkaClient.bufferFormat(topic, identifier, payload, version, _, partitionKey, partition) ⇒ `Promise.&lt;void&gt;`
buffers a keyed message in (a base json format) to be send
a keyed message needs an identifier, if none is provided
an uuid.4() will be generated

**Kind**: instance method of [`NativeKafkaClient`](#nativekafkaclient)  

| Param | Default | Description |
| --- | --- | --- |
| topic |  |  |
| identifier |  |  |
| payload |  |  |
| version | `1` | optional |
| _ |  | optional |
| partitionKey |  | optional |
| partition |  | optional |

## KStream
change-log representation of a stream

**Kind**: global class  

* [KStream](#kstream)
    * [new KStream(topicName, storage, kafka, isClone)](#new-kstreamtopicname-storage-kafka-isclone)
    * [.start(kafkaReadyCallback, kafkaErrorCallback, withBackPressure, outputKafkaConfig)](#kstreamstartkafkareadycallback-kafkaerrorcallback-withbackpressure-outputkafkaconfig)
    * [.innerJoin(stream, key, windowed, combine)](#kstream+innerjoin) ⇒ [`KStream`](#kstreaminnerjoinstream-key-windowed-combine-⇒-kstream)
    * [.outerJoin(stream)](#kstreamouterjoinstream)
    * [.leftJoin(stream)](#kstreamleftjoinstream)
    * [.merge(stream)](#kstreammergestream-⇒-kstream) ⇒ [`KStream`](#kstream)
    * [.fromMost()](#kstreamfrommost-⇒-kstream) ⇒ [`KStream`](#kstream)
    * [.clone(cloneEvents, cloneDeep)](#kstreamclonecloneevents-clonedeep-⇒-kstream) ⇒ [`KStream`](#kstream)
    * [.branch(preds)](#kstreambranchpreds-⇒-arrayltkstreamgt) ⇒ [`Array.&lt;KStream&gt;`](#kstream)
    * [.window(from, to, etl, encapsulated, collect)](#kstreamwindowfrom-to-etl-encapsulated-collect-⇒-object) ⇒ `Object`
    * [.close()](#kstreamclose-⇒-promiseltbooleangt) ⇒ `Promise.&lt;boolean&gt;`

### new KStream(topicName, storage, kafka, isClone)
creates a changelog representation of a stream
join operations of kstream instances are synchronous
and return new instances immediately


| Param | Type | Default |
| --- | --- | --- |
| topicName | `string` |  | 
| storage | `KStorage` |  | 
| kafka | `KafkaClient` |  | 
| isClone | `boolean` | `false` | 

### kStream.start(kafkaReadyCallback, kafkaErrorCallback, withBackPressure, outputKafkaConfig)
start kafka consumption
prepare production of messages if necessary
when called with zero or just a single callback argument
this function will return a promise and use the callback for errors

**Kind**: instance method of [`KStream`](#kstream)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| kafkaReadyCallback | `function` \| `Object` |  | can also be an object (config) |
| kafkaErrorCallback | `function` |  |  |
| withBackPressure | `boolean` | `false` |  |
| outputKafkaConfig | `Object` |  |  |

### kStream.innerJoin(stream, key, windowed, combine) ⇒ [`KStream`](#kstream)
Emits an output when both input sources have records with the same key.
s1$:{object} + s2$:{object} -> j$:{left: s1$object, right: s2$object}

**Kind**: instance method of [`KStream`](#kstream)  

| Param | Type | Default |
| --- | --- | --- |
| stream | [`StreamDSL`](#streamdsl) |  | 
| key | `string` | `&quot;key&quot;` | 
| windowed | `boolean` | `false` | 
| combine | `function` |  | 

### kStream.outerJoin(stream)
Emits an output for each record in either input source.
If only one source contains a key, the other is null

**Kind**: instance method of [`KStream`](#kstream)  

| Param | Type |
| --- | --- |
| stream | [`StreamDSL`](#streamdsl) | 

### kStream.leftJoin(stream)
Emits an output for each record in the left or primary input source.
If the other source does not have a value for a given key, it is set to null

**Kind**: instance method of [`KStream`](#kstream)  

| Param | Type |
| --- | --- |
| stream | [`StreamDSL`](#streamdsl) |

### kStream.merge(stream) ⇒ [`KStream`](#kstream)
Emits an output for each record in any of the streams.
Acts as simple merge of both streams.
can be used with KStream or KTable instances
returns a NEW KStream instance

**Kind**: instance method of [`KStream`](#kstream)  

| Param | Type |
| --- | --- |
| stream | [`StreamDSL`](#streamdsl) | 

### kStream.fromMost() ⇒ [`KStream`](#kstream)
creates a new KStream instance from a given most.js
stream; the consume topic will be empty and therefore
no consumer will be build

**Kind**: instance method of [`KStream`](#kstream)  

| Param | Type | Description |
| --- | --- | --- |
| most.js | `Object` | stream |

### kStream.clone(cloneEvents, cloneDeep) ⇒ [`KStream`](#kstream)
as only joins and window operations return new stream instances
you might need a clone sometimes, which can be accomplished
using this function

**Kind**: instance method of [`KStream`](#kstream)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cloneEvents | `boolean` | `false` | if events in the stream should be cloned |
| cloneDeep | `boolean` | `false` | if events in the stream should be cloned deeply |

### kStream.branch(preds) ⇒ [`Array.&lt;KStream&gt;`](#kstream)
Splits a stream into multiple branches based on cloning
and filtering it depending on the passed predicates.
[ (message) => message.key.startsWith("A"),
  (message) => message.key.startsWith("B"),
  (message) => true ]
---
[ streamA, streamB, streamTrue ]

**Kind**: instance method of [`KStream`](#kstream)  

| Param | Type |
| --- | --- |
| preds | `Array.&lt;function()&gt;` | 

### kStream.window(from, to, etl, encapsulated, collect) ⇒ `Object`
builds a window'ed stream across all events of the current kstream
when the first event with an exceeding "to" is received (or the abort()
callback is called) the window closes and emits its "collected" values to the
returned kstream
from and to must be unix epoch timestamps in milliseconds (Date.now())
etl can be a function that should return the timestamp (event time) of
from within the message e.g. m -> m.payload.createdAt
if etl is not given, a timestamp of receiving will be used (processing time)
for each event
encapsulated refers to the result messages (defaults to true, they will be
encapsulated in an object: {time, value}

**Kind**: instance method of [`KStream`](#kstream)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| from | `number` |  |  |
| to | `number` |  |  |
| etl | `function` |  |  |
| encapsulated | `boolean` | `true` | if event should stay encapsulated {time, value} |
| collect | `boolean` | `true` | if events should be collected first before publishing to result stream |

### kStream.close() ⇒ `Promise.&lt;boolean&gt;`
closes the internal stream
and all kafka open connections
as well as KStorage connections

**Kind**: instance method of [`KStream`](#kstream)

## KTable
table representation of a stream

**Kind**: global class  

* [KTable](#ktable)
    * [new KTable(topicName, keyMapETL, storage, kafka, isClone)](#new_ktable_new)
    * [.start(kafkaReadyCallback, kafkaErrorCallback, withBackPressure, outputKafkaConfig)](#ktable+start)
    * [.innerJoin(stream, key)](#ktable+innerjoinstream-key)
    * [.outerJoin(stream)](#ktable+outerjoinstream)
    * [.leftJoin(stream)](#ktableleftjoinstream)
    * [.writeToTableStream(message)](#ktable+writetotablestream)
    * [.consumeUntilMs(ms, finishedCallback)](#ktable+consumeuntilms) ⇒ [`KTable`](#ktable)
    * [.consumeUntilCount(count, finishedCallback)](#ktable+consumeuntilcount) ⇒ [`KTable`](#ktable)
    * [.consumeUntilLatestOffset(finishedCallback)](#ktable+consumeuntillatestoffset)
    * [.getTable()](#ktable+gettable) ⇒ `Promise.&lt;object&gt;`
    * [.replay()](#ktable+replay)
    * [.merge(stream)](#ktable+merge) ⇒ [`Promise.&lt;KTable&gt;`](#ktable)
    * [.clone()](#ktable+clone) ⇒ [`Promise.&lt;KTable&gt;`](#ktable)
    * [.close()](#ktable+close) ⇒ `Promise.&lt;boolean&gt;`

### new KTable(topicName, keyMapETL, storage, kafka, isClone)
creates a table representation of a stream
join operations of ktable instances are asynchronous
and return promises
keyMapETL = v -> {key, value} (sync)


| Param | Type | Default |
| --- | --- | --- |
| topicName | `string` |  | 
| keyMapETL | `function` |  | 
| storage | `KStorage` |  | 
| kafka | `KafkaClient` |  | 
| isClone | `boolean` | `false` | 

### kTable.start(kafkaReadyCallback, kafkaErrorCallback, withBackPressure, outputKafkaConfig)
start kafka consumption
prepare production of messages if necessary
when called with zero or just a single callback argument
this function will return a promise and use the callback for errors

**Kind**: instance method of [`KTable`](#ktable)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| kafkaReadyCallback | `function` \| `Object` |  | can also be an object (config) |
| kafkaErrorCallback | `function` |  |  |
| withBackPressure | `boolean` | `false` |  |
| outputKafkaConfig | `Object` |  |  |

### kTable.innerJoin(stream, key)
Emits an output when both input sources have records with the same key.

**Kind**: instance method of [`KTable`](#ktable)  

| Param | Type | Default |
| --- | --- | --- |
| stream | [`StreamDSL`](#streamdsl) |  | 
| key | `string` | `&quot;key&quot;` |

### kTable.outerJoin(stream)
Emits an output for each record in either input source.
If only one source contains a key, the other is null

**Kind**: instance method of [`KTable`](#ktable)  

| Param | Type |
| --- | --- |
| stream | [`StreamDSL`](#streamdsl) |

### kTable.leftJoin(stream)
Emits an output for each record in the left or primary input source.
If the other source does not have a value for a given key, it is set to null

**Kind**: instance method of [`KTable`](#ktable)  

| Param | Type |
| --- | --- |
| stream | [`StreamDSL`](#streamdsl) |

### kTable.writeToTableStream(message)
write message to the internal stream

**Kind**: instance method of [`KTable`](#ktable)  

| Param | Type |
| --- | --- |
| message | `any` | 

### kTable.consumeUntilMs(ms, finishedCallback) ⇒ [`KTable`](#ktable)
consume messages until ms passed

**Kind**: instance method of [`KTable`](#ktable)  

| Param | Type | Default |
| --- | --- | --- |
| ms | `number` | `1000` | 
| finishedCallback | `function` |  |

### kTable.consumeUntilCount(count, finishedCallback) ⇒ [`KTable`](#ktable)
consume messages until a certain count is reached

**Kind**: instance method of [`KTable`](#ktable)  

| Param | Type | Default |
| --- | --- | --- |
| count | `number` | `1000` | 
| finishedCallback | `function` |  |

### kTable.consumeUntilLatestOffset(finishedCallback)
consume messages until latest offset of topic

**Kind**: instance method of [`KTable`](#ktable)  

| Param | Type | Default |
| --- | --- | --- |
| finishedCallback | `function` |  | 

### kTable.getTable() ⇒ `Promise.&lt;object&gt;`
returns the state of the internal KStorage

**Kind**: instance method of [`KTable`](#ktable)

### kTable.replay()
rewrites content of internal KStorage
to the stream, every observer will receive
the content as KV {key, value} object

**Kind**: instance method of [`KTable`](#ktable)

### kTable.merge(stream) ⇒ [`Promise.&lt;KTable&gt;`](#ktable)
Emits an output for each record in any of the streams.
Acts as simple merge of both streams.
can be used with KStream or KTable instances
returns a Promise with a NEW KTable instance

**Kind**: instance method of [`KTable`](#ktable)  

| Param | Type |
| --- | --- |
| stream | [`StreamDSL`](#streamdsl) |

### kTable.clone() ⇒ [`Promise.&lt;KTable&gt;`](#ktable)
as only joins and window operations return new stream instances
you might need a clone sometimes, which can be accomplished
using this function

**Kind**: instance method of [`KTable`](#ktable)

### kTable.close() ⇒ `Promise.&lt;boolean&gt;`
closes the internal stream
and all kafka open connections
as well as KStorage connections

**Kind**: instance method of [`KTable`](#ktable)

## StreamDSL
Stream base class

**Kind**: global class  

- [Summary](#summary)
- [KeyCount](#keycount)
- [LastState](#laststate)
- [Max](#max)
- [Min](#min)
- [Sum](#sum)
- [Window](#window)
- [JSKafkaClient](#jskafkaclient)
  - [new JSKafkaClient(topic, config)](#new-jskafkaclienttopic-config)
  - [jsKafkaClient.setProduceHandler(handler)](#jskafkaclientsetproducehandlerhandler)
  - [jsKafkaClient.getProduceHandler() ⇒ `null` | `EventEmitter`](#jskafkaclientgetproducehandler--null--eventemitter)
  - [jsKafkaClient.overwriteTopics(topics)](#jskafkaclientoverwritetopicstopics)
  - [jsKafkaClient.start(readyCallback, kafkaErrorCallback, withProducer, withBackPressure)](#jskafkaclientstartreadycallback-kafkaerrorcallback-withproducer-withbackpressure)
  - [jsKafkaClient.setupProducer(produceTopic, partitions, readyCallback, kafkaErrorCallback, outputKafkaConfig)](#jskafkaclientsetupproducerproducetopic-partitions-readycallback-kafkaerrorcallback-outputkafkaconfig)
  - [jsKafkaClient.send(topic, message) ⇒ `*`](#jskafkaclientsendtopic-message--)
  - [jsKafkaClient.buffer(topic, identifier, payload, compressionType) ⇒ `*`](#jskafkaclientbuffertopic-identifier-payload-compressiontype--)
  - [jsKafkaClient.bufferFormat(topic, identifier, payload, version, compressionType) ⇒ `*`](#jskafkaclientbufferformattopic-identifier-payload-version-compressiontype--)
- [NativeKafkaClient](#nativekafkaclient)
  - [new NativeKafkaClient(topic, config, batchOptions)](#new-nativekafkaclienttopic-config-batchoptions)
  - [nativeKafkaClient.setProduceHandler(handler)](#nativekafkaclientsetproducehandlerhandler)
  - [nativeKafkaClient.getProduceHandler() ⇒ `null` \| `EventEmitter`](#nativekafkaclientgetproducehandler--null--eventemitter)
  - [nativeKafkaClient.overwriteTopics(topics)](#nativekafkaclientoverwritetopicstopics)
  - [nativeKafkaClient.start(readyCallback, kafkaErrorCallback, withProducer, withBackPressure)](#nativekafkaclientstartreadycallback-kafkaerrorcallback-withproducer-withbackpressure)
  - [nativeKafkaClient.setupProducer(produceTopic, partitions, readyCallback, kafkaErrorCallback, outputKafkaConfig)](#nativekafkaclientsetupproducerproducetopic-partitions-readycallback-kafkaerrorcallback-outputkafkaconfig)
  - [nativeKafkaClient.send(topicName, message, partition, key, partitionKey, opaqueKey) ⇒ `Promise.&lt;void&gt;`](#nativekafkaclientsendtopicname-message-partition-key-partitionkey-opaquekey--promiseltvoidgt)
  - [nativeKafkaClient.buffer(topic, identifier, payload, _, partition, version, partitionKey) ⇒ `Promise.&lt;void&gt;`](#nativekafkaclientbuffertopic-identifier-payload-_-partition-version-partitionkey--promiseltvoidgt)
  - [nativeKafkaClient.bufferFormat(topic, identifier, payload, version, _, partitionKey, partition) ⇒ `Promise.&lt;void&gt;`](#nativekafkaclientbufferformattopic-identifier-payload-version-_-partitionkey-partition--promiseltvoidgt)
- [KStream](#kstream)
  - [new KStream(topicName, storage, kafka, isClone)](#new-kstreamtopicname-storage-kafka-isclone)
  - [kStream.start(kafkaReadyCallback, kafkaErrorCallback, withBackPressure, outputKafkaConfig)](#kstreamstartkafkareadycallback-kafkaerrorcallback-withbackpressure-outputkafkaconfig)
  - [kStream.innerJoin(stream, key, windowed, combine) ⇒ `KStream`](#kstreaminnerjoinstream-key-windowed-combine--kstream)
  - [kStream.outerJoin(stream)](#kstreamouterjoinstream)
  - [kStream.leftJoin(stream)](#kstreamleftjoinstream)
  - [kStream.merge(stream) ⇒ `KStream`](#kstreammergestream--kstream)
  - [kStream.fromMost() ⇒ `KStream`](#kstreamfrommost--kstream)
  - [kStream.clone(cloneEvents, cloneDeep) ⇒ `KStream`](#kstreamclonecloneevents-clonedeep--kstream)
  - [kStream.branch(preds) ⇒ `Array.&lt;KStream&gt;`](#kstreambranchpreds--arrayltkstreamgt)
- [(message) => true ]](#message--true-)
  - [kStream.window(from, to, etl, encapsulated, collect) ⇒ `Object`](#kstreamwindowfrom-to-etl-encapsulated-collect--object)
  - [kStream.close() ⇒ `Promise.&lt;boolean&gt;`](#kstreamclose--promiseltbooleangt)
- [KTable](#ktable)
  - [new KTable(topicName, keyMapETL, storage, kafka, isClone)](#new-ktabletopicname-keymapetl-storage-kafka-isclone)
  - [kTable.start(kafkaReadyCallback, kafkaErrorCallback, withBackPressure, outputKafkaConfig)](#ktablestartkafkareadycallback-kafkaerrorcallback-withbackpressure-outputkafkaconfig)
  - [kTable.innerJoin(stream, key)](#ktableinnerjoinstream-key)
  - [kTable.outerJoin(stream)](#ktableouterjoinstream)
  - [kTable.leftJoin(stream)](#ktableleftjoinstream)
  - [kTable.writeToTableStream(message)](#ktablewritetotablestreammessage)
  - [kTable.consumeUntilMs(ms, finishedCallback) ⇒ `KTable`](#ktableconsumeuntilmsms-finishedcallback--ktable)
  - [kTable.consumeUntilCount(count, finishedCallback) ⇒ `KTable`](#ktableconsumeuntilcountcount-finishedcallback--ktable)
  - [kTable.consumeUntilLatestOffset(finishedCallback)](#ktableconsumeuntillatestoffsetfinishedcallback)
  - [kTable.getTable() ⇒ `Promise.&lt;object&gt;`](#ktablegettable--promiseltobjectgt)
  - [kTable.replay()](#ktablereplay)
  - [kTable.merge(stream) ⇒ `Promise.&lt;KTable&gt;`](#ktablemergestream--promiseltktablegt)
  - [kTable.clone() ⇒ `Promise.&lt;KTable&gt;`](#ktableclone--promiseltktablegt)
  - [kTable.close() ⇒ `Promise.&lt;boolean&gt;`](#ktableclose--promiseltbooleangt)
- [StreamDSL](#streamdsl)
  - [new StreamDSL(topicName, storage, kafka, isClone)](#new-streamdsltopicname-storage-kafka-isclone)
  - [streamDSL.start()](#streamdslstart)
  - [streamDSL.getStats() ⇒ `object`](#streamdslgetstats--object)
  - [streamDSL.getStorage() ⇒ `KStorage`](#streamdslgetstorage--kstorage)
  - [streamDSL.writeToStream(message)](#streamdslwritetostreammessage)
  - [streamDSL.getMost() ⇒ `Object`](#streamdslgetmost--object)
  - [streamDSL.getNewMostFrom(array) ⇒ `Stream.&lt;any&gt;`](#streamdslgetnewmostfromarray--streamltanygt)
  - [streamDSL.replaceInternalObservable(newStream$)](#streamdslreplaceinternalobservablenewstream)
  - [streamDSL.setProduceHandler(handler)](#streamdslsetproducehandlerhandler)
  - [streamDSL.createAndSetProduceHandler() ⇒ `module:events.internal`](#streamdslcreateandsetproducehandler--moduleeventsinternal)
  - [streamDSL.setKafkaStreamsReference(reference)](#streamdslsetkafkastreamsreferencereference)
  - [streamDSL.from(topicName) ⇒ `StreamDSL`](#streamdslfromtopicname--streamdsl)
  - [streamDSL.awaitPromises(etl) ⇒ `StreamDSL`](#streamdslawaitpromisesetl--streamdsl)
  - [streamDSL.map(etl) ⇒ `StreamDSL`](#streamdslmapetl--streamdsl)
  - [streamDSL.asyncMap(etl) ⇒ `StreamDSL`](#streamdslasyncmapetl--streamdsl)
  - [streamDSL.concatMap(etl) ⇒ `StreamDSL`](#streamdslconcatmapetl--streamdsl)
  - [streamDSL.forEach(eff) ⇒ `\*`](#streamdslforeacheff--)
  - [streamDSL.chainForEach(eff, callback) ⇒ `StreamDSL`](#streamdslchainforeacheff-callback--streamdsl)
  - [streamDSL.tap(eff)](#streamdsltapeff)
  - [streamDSL.filter(pred) ⇒ `StreamDSL`](#streamdslfilterpred--streamdsl)
  - [streamDSL.skipRepeats() ⇒ `StreamDSL`](#streamdslskiprepeats--streamdsl)
  - [streamDSL.skipRepeatsWith(equals) ⇒ `StreamDSL`](#streamdslskiprepeatswithequals--streamdsl)
  - [streamDSL.skip(count) ⇒ `StreamDSL`](#streamdslskipcount--streamdsl)
  - [streamDSL.take(count) ⇒ `StreamDSL`](#streamdsltakecount--streamdsl)
  - [streamDSL.mapStringToArray(delimiter) ⇒ `StreamDSL`](#streamdslmapstringtoarraydelimiter--streamdsl)
  - [streamDSL.mapArrayToKV(keyIndex, valueIndex) ⇒ `StreamDSL`](#streamdslmaparraytokvkeyindex-valueindex--streamdsl)
  - [streamDSL.mapStringToKV(delimiter, keyIndex, valueIndex) ⇒ `StreamDSL`](#streamdslmapstringtokvdelimiter-keyindex-valueindex--streamdsl)
  - [streamDSL.mapJSONParse() ⇒ `StreamDSL`](#streamdslmapjsonparse--streamdsl)
  - [streamDSL.mapStringify() ⇒ `StreamDSL`](#streamdslmapstringify--streamdsl)
  - [streamDSL.mapBufferKeyToString() ⇒ `StreamDSL`](#streamdslmapbufferkeytostring--streamdsl)
  - [streamDSL.mapBufferValueToString() ⇒ `StreamDSL`](#streamdslmapbuffervaluetostring--streamdsl)
  - [streamDSL.mapStringValueToJSONObject() ⇒ `StreamDSL`](#streamdslmapstringvaluetojsonobject--streamdsl)
  - [streamDSL.mapJSONConvenience() ⇒ `StreamDSL`](#streamdslmapjsonconvenience--streamdsl)
  - [streamDSL.wrapAsKafkaValue(topic) ⇒ `StreamDSL`](#streamdslwrapaskafkavaluetopic--streamdsl)
  - [streamDSL.mapWrapKafkaValue() ⇒ `StreamDSL`](#streamdslmapwrapkafkavalue--streamdsl)
  - [streamDSL.atThroughput(count, callback) ⇒ `StreamDSL`](#streamdslatthroughputcount-callback--streamdsl)
  - [streamDSL.mapToFormat(type, getId) ⇒ `StreamDSL`](#streamdslmaptoformattype-getid--streamdsl)
  - [streamDSL.mapFromFormat() ⇒ `StreamDSL`](#streamdslmapfromformat--streamdsl)
  - [streamDSL.timestamp(etl) ⇒ `StreamDSL`](#streamdsltimestampetl--streamdsl)
  - [streamDSL.constant(substitute) ⇒ `StreamDSL`](#streamdslconstantsubstitute--streamdsl)
  - [streamDSL.scan(eff, initial) ⇒ `StreamDSL`](#streamdslscaneff-initial--streamdsl)
  - [streamDSL.slice(start, end) ⇒ `StreamDSL`](#streamdslslicestart-end--streamdsl)
  - [streamDSL.takeWhile(pred) ⇒ `StreamDSL`](#streamdsltakewhilepred--streamdsl)
  - [streamDSL.skipWhile(pred) ⇒ `StreamDSL`](#streamdslskipwhilepred--streamdsl)
  - [streamDSL.until(signal$) ⇒ `StreamDSL`](#streamdsluntilsignal--streamdsl)
  - [streamDSL.since(signal$) ⇒ `StreamDSL`](#streamdslsincesignal--streamdsl)
  - [streamDSL.continueWith(f)](#streamdslcontinuewithf)
  - [streamDSL.reduce(eff, initial) ⇒ `\*`](#streamdslreduceeff-initial--)
  - [streamDSL.chainReduce(eff, initial, callback) ⇒ `StreamDSL`](#streamdslchainreduceeff-initial-callback--streamdsl)
  - [streamDSL.drain() ⇒ `\*`](#streamdsldrain--)
  - [streamDSL.throttle(throttlePeriod) ⇒ `StreamDSL`](#streamdslthrottlethrottleperiod--streamdsl)
  - [streamDSL.delay(delayTime) ⇒ `StreamDSL`](#streamdsldelaydelaytime--streamdsl)
  - [streamDSL.debounce(debounceTime) ⇒ `StreamDSL`](#streamdsldebouncedebouncetime--streamdsl)
  - [streamDSL.countByKey(key, countFieldName) ⇒ `StreamDSL`](#streamdslcountbykeykey-countfieldname--streamdsl)
  - [streamDSL.sumByKey(key, fieldName, sumField) ⇒ `StreamDSL`](#streamdslsumbykeykey-fieldname-sumfield--streamdsl)
  - [streamDSL.min(fieldName, minField) ⇒ `StreamDSL`](#streamdslminfieldname-minfield--streamdsl)
  - [streamDSL.max(fieldName, maxField) ⇒ `StreamDSL`](#streamdslmaxfieldname-maxfield--streamdsl)
  - [streamDSL.\_merge(otherStream$)](#streamdsl_mergeotherstream)
  - [streamDSL.\_zip(otherStream$, combine)](#streamdsl_zipotherstream-combine)
  - [streamDSL.to(topic, outputPartitionsCount, produceType, version, compressionType, producerErrorCallback, outputKafkaConfig) ⇒ `Promise.&lt;boolean&gt;`](#streamdsltotopic-outputpartitionscount-producetype-version-compressiontype-producererrorcallback-outputkafkaconfig--promiseltbooleangt)

### new StreamDSL(topicName, storage, kafka, isClone)
Stream base class that wraps around a private most.js stream$
and interacts with storages/actions and a kafka-client instance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| topicName | `string` \| `Array.&lt;string&gt;` |  | can also be topics |
| storage | `KStorage` |  |  |
| kafka | `KafkaClient` |  |  |
| isClone | `boolean` | `false` |  |

### streamDSL.start()
dummy, should be overwritten

**Kind**: instance method of [`StreamDSL`](#streamdsl)

### streamDSL.getStats() ⇒ `object`
returns a stats object with information
about the internal kafka clients

**Kind**: instance method of [`StreamDSL`](#streamdsl)

### streamDSL.getStorage() ⇒ `KStorage`
returns the internal KStorage instance

**Kind**: instance method of [`StreamDSL`](#streamdsl)

### streamDSL.writeToStream(message)
can be used to manually write message/events
to the internal stream$

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param | Type |
| --- | --- |
| message | `Object` \| `Array.&lt;Object&gt;` | 

### streamDSL.getMost() ⇒ `Object`
returns the internal most.js stream

**Kind**: instance method of [`StreamDSL`](#streamdsl)  
**Returns**: `Object` - most.js stream

### streamDSL.getNewMostFrom(array) ⇒ `Stream.&lt;any&gt;`
returns a new most stream from the
given array

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| array | 

### streamDSL.replaceInternalObservable(newStream$)
used to clone or during merges
resets the internal event emitter to the new stream
and replaces the internal stream with the merged new stream

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| newStream$ | 

### streamDSL.setProduceHandler(handler)
sets a handler for produce messages
(emits whenever kafka messages are produced/delivered)
events: produced, delivered

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param | Type |
| --- | --- |
| handler | `module:events.internal` | 

### streamDSL.createAndSetProduceHandler() ⇒ `module:events.internal`
creates (and returns) and sets a produce handler
for this stream instance

**Kind**: instance method of [`StreamDSL`](#streamdsl)

### streamDSL.setKafkaStreamsReference(reference)
overwrites the internal kafkaStreams reference

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| reference | 

### streamDSL.from(topicName) ⇒ [`StreamDSL`](#streamdsl)
add more topic/s to the consumer

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param | Type |
| --- | --- |
| topicName | `string` \| `Array.&lt;string&gt;` |

### streamDSL.awaitPromises(etl) ⇒ [`StreamDSL`](#streamdsl)
given a stream of promises, returns stream containing the fulfillment values
etl = Promise -> v

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| etl | 

### streamDSL.map(etl) ⇒ [`StreamDSL`](#streamdsl)
simple synchronous map function
etl = v -> v2

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| etl | 

### streamDSL.asyncMap(etl) ⇒ [`StreamDSL`](#streamdsl)
map that expects etl to return a Promise
can be used to apply async maps to stream
etl = v -> Promise

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| etl | 

### streamDSL.concatMap(etl) ⇒ [`StreamDSL`](#streamdsl)
transform each etl in stream into a stream,
and then concatenate it onto the end of the resulting stream.
etl = v -> stream(v2)

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| etl | 

### streamDSL.forEach(eff) ⇒ `\*`
(do not use for side effects,
except for a closing operation at the end of the stream)
may not be used to chain
eff = v -> void

**Kind**: instance method of [`StreamDSL`](#streamdsl)  
**Returns**: `\*` - Promise  

| Param |
| --- |
| eff | 

### streamDSL.chainForEach(eff, callback) ⇒ [`StreamDSL`](#streamdsl)
runs forEach on a multicast stream
you probably would not want to use this in production

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param | Default |
| --- | --- |
| eff |  | 
| callback |  |

### streamDSL.tap(eff)
(alternative to forEach if in the middle of a
stream operation chain)
use this for side-effects
errors in eff will break stream

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| eff | 

### streamDSL.filter(pred) ⇒ [`StreamDSL`](#streamdsl)
stream contains only events for which predicate
returns true
pred = v -> boolean

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| pred | 

### streamDSL.skipRepeats() ⇒ [`StreamDSL`](#streamdsl)
will remove duplicate messages
be aware that this might take a lot of memory

**Kind**: instance method of [`StreamDSL`](#streamdsl)

### streamDSL.skipRepeatsWith(equals) ⇒ [`StreamDSL`](#streamdsl)
skips repeats per your definition
equals = (a,b) -> boolean

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| equals | 

### streamDSL.skip(count) ⇒ [`StreamDSL`](#streamdsl)
skips the amount of messages

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| count | 

### streamDSL.take(count) ⇒ [`StreamDSL`](#streamdsl)
takes the first messages until count
and omits the rest

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| count | 

### streamDSL.mapStringToArray(delimiter) ⇒ [`StreamDSL`](#streamdsl)
easy string to array mapping
you can pass your delimiter
default is space
"bla blup" => ["bla", "blup"]

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param | Default |
| --- | --- |
| delimiter | ` ` |

### streamDSL.mapArrayToKV(keyIndex, valueIndex) ⇒ [`StreamDSL`](#streamdsl)
easy array to key-value object mapping
you can pass your own indices
default is 0,1
["bla", "blup"] => { key: "bla", value: "blup" }

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param | Default |
| --- | --- |
| keyIndex | `0` | 
| valueIndex | `1` |

### streamDSL.mapStringToKV(delimiter, keyIndex, valueIndex) ⇒ [`StreamDSL`](#streamdsl)
easy string to key-value object mapping
you can pass your own delimiter and indices
default is " " and 0,1
"bla blup" => { key: "bla", value: "blup" }

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param | Default |
| --- | --- |
| delimiter | ` ` | 
| keyIndex | `0` | 
| valueIndex | `1` |

### streamDSL.mapJSONParse() ⇒ [`StreamDSL`](#streamdsl)
maps every stream event through JSON.parse
if its type is an object
(if parsing fails, the error object will be returned)

**Kind**: instance method of [`StreamDSL`](#streamdsl)

### streamDSL.mapStringify() ⇒ [`StreamDSL`](#streamdsl)
maps every stream event through JSON.stringify
if its type is object

**Kind**: instance method of [`StreamDSL`](#streamdsl)

### streamDSL.mapBufferKeyToString() ⇒ [`StreamDSL`](#streamdsl)
maps an object type event with a Buffer key field
to an object event with a string key field

**Kind**: instance method of [`StreamDSL`](#streamdsl)

### streamDSL.mapBufferValueToString() ⇒ [`StreamDSL`](#streamdsl)
maps an object type event with a Buffer value field
to an object event with a string value field

**Kind**: instance method of [`StreamDSL`](#streamdsl)

### streamDSL.mapStringValueToJSONObject() ⇒ [`StreamDSL`](#streamdsl)
maps an object type event with a string value field
to an object event with (parsed) object value field

**Kind**: instance method of [`StreamDSL`](#streamdsl)

### streamDSL.mapJSONConvenience() ⇒ [`StreamDSL`](#streamdsl)
takes a buffer kafka message
and turns it into a json representation
buffer key -> string
buffer value -> string -> object

**Kind**: instance method of [`StreamDSL`](#streamdsl)

### streamDSL.wrapAsKafkaValue(topic) ⇒ [`StreamDSL`](#streamdsl)
wraps an event value inside a kafka message object
the event value will be used as value of the kafka message

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param | Description |
| --- | --- |
| topic | optional |

### streamDSL.mapWrapKafkaValue() ⇒ [`StreamDSL`](#streamdsl)
maps every stream event's kafka message
right to its payload value

**Kind**: instance method of [`StreamDSL`](#streamdsl)

### streamDSL.atThroughput(count, callback) ⇒ [`StreamDSL`](#streamdsl)
taps to the stream
counts messages and returns
callback once (when message count is reached)
with the current message at count

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param | Type | Default |
| --- | --- | --- |
| count | `number` | `1` | 
| callback | `function` |  |

### streamDSL.mapToFormat(type, getId) ⇒ [`StreamDSL`](#streamdsl)
* default kafka format stringify
{} -> {payload, time, type, id}
getId can be a function to read the id from the message
e.g. getId = message -> message.id

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param | Default |
| --- | --- |
| type | `unknown-publish` | 
| getId |  |

### streamDSL.mapFromFormat() ⇒ [`StreamDSL`](#streamdsl)
default kafka format parser
{value: "{ payload: {} }" -> {}

**Kind**: instance method of [`StreamDSL`](#streamdsl)

### streamDSL.timestamp(etl) ⇒ [`StreamDSL`](#streamdsl)
maps elements into {time, value} objects

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| etl |

### streamDSL.constant(substitute) ⇒ [`StreamDSL`](#streamdsl)
replace every element with the substitute value

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| substitute |

### streamDSL.scan(eff, initial) ⇒ [`StreamDSL`](#streamdsl)
mapping to incrementally accumulated results,
starting with the provided initial value.

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| eff | 
| initial |

### streamDSL.slice(start, end) ⇒ [`StreamDSL`](#streamdsl)
slicing events from start ot end of index

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| start | 
| end |

### streamDSL.takeWhile(pred) ⇒ [`StreamDSL`](#streamdsl)
contain events until predicate
returns false
m -> !!m

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| pred |

### streamDSL.skipWhile(pred) ⇒ [`StreamDSL`](#streamdsl)
contain events after predicate
returns false

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| pred | 

### streamDSL.until(signal$) ⇒ [`StreamDSL`](#streamdsl)
contain events until signal$ emits first event
signal$ must be a most stream instance

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| signal$ |

### streamDSL.since(signal$) ⇒ [`StreamDSL`](#streamdsl)
contain all events after signal$ emits first event
signal$ must be a most stream instance

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| signal$ |

### streamDSL.continueWith(f)
Replace the end signal with a new stream returned by f.
Note that f must return a (most.js) stream.

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param | Description |
| --- | --- |
| f | function (must return a most stream) |

### streamDSL.reduce(eff, initial) ⇒ `\*`
reduce a stream to a single result
will return a promise

**Kind**: instance method of [`StreamDSL`](#streamdsl)  
**Returns**: `\*` - Promise  

| Param |
| --- |
| eff | 
| initial |

### streamDSL.chainReduce(eff, initial, callback) ⇒ [`StreamDSL`](#streamdsl)
runs reduce on a multicast stream
you probably would not want to use this in production

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| eff | 
| initial | 
| callback |

### streamDSL.drain() ⇒ `\*`
drains the stream, equally to forEach
without iterator, returns a promise

**Kind**: instance method of [`StreamDSL`](#streamdsl)  
**Returns**: `\*` - Promise

### streamDSL.throttle(throttlePeriod) ⇒ [`StreamDSL`](#streamdsl)
limits rate events at most one per throttlePeriod
throttlePeriod = index count omit

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| throttlePeriod |

### streamDSL.delay(delayTime) ⇒ [`StreamDSL`](#streamdsl)
delays every event in stream by given time

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| delayTime |

### streamDSL.debounce(debounceTime) ⇒ [`StreamDSL`](#streamdsl)
wait for a burst of events and emit
only the last event

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| debounceTime |

### streamDSL.countByKey(key, countFieldName) ⇒ [`StreamDSL`](#streamdsl)
maps into counts per key
requires events to have a present key/value field

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param | Default |
| --- | --- |
| key | `key` | 
| countFieldName | `count` |

### streamDSL.sumByKey(key, fieldName, sumField) ⇒ [`StreamDSL`](#streamdsl)
maps into sums per key
requires events to have a present key/value field

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param | Default |
| --- | --- |
| key | `key` | 
| fieldName | `value` | 
| sumField | `false` |

### streamDSL.min(fieldName, minField) ⇒ [`StreamDSL`](#streamdsl)
collects the smallest value
of the given field, will not alter
the events in the stream
use .getStorage().getMin() to get the
latest value which is stored

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param | Default |
| --- | --- |
| fieldName | `value` | 
| minField | `min` |

### streamDSL.max(fieldName, maxField) ⇒ [`StreamDSL`](#streamdsl)
collects the greatest value
of the given field, will not alter
the events in the stream
use .getStorage().getMax() to get the
latest value which is stored

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param | Default |
| --- | --- |
| fieldName | `value` | 
| maxField | `max` |

### streamDSL.\_merge(otherStream$)
merge this stream with another, resulting a
stream with all elements from both streams

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| otherStream$ |

### streamDSL.\_zip(otherStream$, combine)
merge this stream with another stream
by combining (zipping) every event from each stream
to a single new event on the new stream
combine = (e1, e2) -> e1 + e2

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param |
| --- |
| otherStream$ | 
| combine |

### streamDSL.to(topic, outputPartitionsCount, produceType, version, compressionType, producerErrorCallback, outputKafkaConfig) ⇒ `Promise.&lt;boolean&gt;`
define an output topic
when passed to KafkaStreams this will trigger
the stream$ result to be produced to the given topic name
if the instance is a clone, this function call will have to setup a kafka producer
returns a promise

**Kind**: instance method of [`StreamDSL`](#streamdsl)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| topic | `string` \| `Object` |  | optional (can also be an object, containing the same parameters as fields) |
| outputPartitionsCount | `number` | `1` | optional |
| produceType | `string` | `&quot;send&quot;` | optional |
| version | `number` | `1` | optional |
| compressionType | `number` | `0` | optional |
| producerErrorCallback | `function` |  | optional |
| outputKafkaConfig | `Object` |  | optional |

