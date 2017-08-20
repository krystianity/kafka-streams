"use strict";

const assert = require("assert");
const uuid = require("uuid");
const v8 = require("v8");
const async = require("async");
const debug = require("debug")("kafka-streams:int:streams");

const {KafkaStreams, KafkaClient} = require("./../../index.js");
const config = require("./../test-config.js");

describe("Streams Integration", function() {

    function getMemory(){
        let space = null;
        v8.getHeapSpaceStatistics().forEach(_space => {
            if(_space.space_name === "old_space"){
                space = _space;
            }
        });
        return space.space_used_size;
    }

    const startMemory = getMemory();

    const isTravis = !!process.env.KST_TOPIC || false;
    const roundId = process.env.KST_TOPIC || uuid.v4();
    const inputTopic = "ks-input-" + roundId;
    const secondTopic = "ks-second-" + roundId;
    const thirdTopic = "ks-third-" + roundId;
    const fourthTopic = "ks-fourth-" + roundId;
    const outputTopic = "ks-output-" + roundId;
    const trafficTopic = "ks-traffic-" + roundId;

    const millionMessageCount = isTravis ? 5e4 : 1e5;

    const kafkaStreams = new KafkaStreams(config);

    let subMemory = null;
    let millionMin = 1e4;
    let millionMax = 1;

    after(function(done){
        kafkaStreams.closeAll();
        debug(`topic roundId: ks-*-${roundId}.`);
        setTimeout(done, 500);
    });

    it("should be able to produce messages to topic", function (done) {

        const stream = kafkaStreams.getKStream(null);
        stream.to(inputTopic);

        stream.start(() => {

            debug("create stream one ready.");

            stream.writeToStream("hi 1");
            stream.writeToStream("hey 1");
            stream.writeToStream("hi 2");
            stream.writeToStream("hiu 1");
            stream.writeToStream("huu 1");
            stream.writeToStream("hoo 1");
            stream.writeToStream("hi 3");
            stream.writeToStream("hou 1");

            setTimeout(done, 10);
        }, null);
    });

    it("should be able to produce to three topics using a merged stream", function (done) {

        const stream = kafkaStreams.getKStream(null);
        const stream2 = stream.merge(kafkaStreams.getKStream(null));
        const stream3 = stream.merge(kafkaStreams.getKStream(null));

        Promise.all([
            stream.to(secondTopic),
            stream2.to(thirdTopic),
            stream3.to(fourthTopic),
            stream.start() //this one still needs a sync producer
        ]).then(_ => {
            debug("create stream (1-3) two ready.");

            stream.writeToStream("one 1");
            stream.writeToStream("two 1");
            stream.writeToStream("three 1");
            stream.writeToStream("two 2");
            stream.writeToStream("three 2");
            stream.writeToStream("two 3");

            setTimeout(done, 10);
        });
    });

    it("should give kafka a few seconds", function(done){
        setTimeout(done, 1000);
    });

    it("should be able to count keys on third topic", function(done){

        const stream = kafkaStreams.getKStream(thirdTopic);

        let count = 0;
        stream
            .mapWrapKafkaPayload()
            .mapStringToKV()
            .countByKey()
            .forEach(_ => {
                count++;
                if(count === 6){
                    const data = stream.storage.state;
                    debug(data);

                    assert.equal(data.one, 1);
                    assert.equal(data.two, 3);
                    assert.equal(data.three, 2);

                    done();
                }
            });

        stream.start();
    });

    it("should be able to count keys on fourth topic joining a local stream", function(done){

        const stream = kafkaStreams.getKStream(null);
        const stream2 = kafkaStreams.getKStream(fourthTopic);

        stream
            .mapWrapKafkaPayload()
            .mapStringToKV()
            .filter(kv => kv.key === "one");

        stream2
            .mapWrapKafkaPayload()
            .mapStringToKV()
            .filter(kv => kv.key === "two" || kv.key === "one");

        const stream3 = stream.merge(stream2);
        stream3.countByKey();
        stream3.mapStringify();

        let count = 0;
        stream3.forEach(element => {
            debug(element);
            count++;
            if(count === 7){
                const data = stream3.storage.state;
                debug(data);

                assert.equal(data.one, 4);
                assert.equal(data.two, 3);
                assert.equal(data.three, undefined);
                assert.equal(data.four, undefined);

                done();
            }
        });

        Promise.all([
            stream.start(),
            stream2.start()
        ]).then(_ => {
            debug("streams up");
            stream.writeToStream("one message1");
            stream.writeToStream("one message2");
            stream.writeToStream("one message3");
            stream.writeToStream("four message1");
        })
    });

    it("should be able to consume and join two kafka topics as streams", function(done){

        const firstStream = kafkaStreams.getKStream(inputTopic);
        const secondStream = kafkaStreams.getKStream(secondTopic);

        let messageCount = 0;
        function final(){
            messageCount++;

            if(messageCount > 9){
                throw new Error("more than 9");
            }

            if(messageCount === 9){
                const data = secondStream.storage.state;
                debug(data);

                assert.equal(data.hi, undefined);
                assert.equal(data.two, 4);

                done();
            }
        }

        firstStream
            .mapWrapKafkaPayload()
            .mapStringToKV()
            .filter(kv => kv.key === "hi");

        secondStream
            .mapWrapKafkaPayload()
            .mapStringToKV()
            .filter(kv => kv.key == "two")
            .countByKey()
            .chainForEach(m => {
              debug(m);
            });

        const mergedStream = firstStream.merge(secondStream);

        mergedStream
            .mapStringify()
            .tap(v => {
                debug("cs: " + v);
                final();
            });

        Promise.all([
            firstStream.start(),
            secondStream.start(),
            mergedStream.to(outputTopic, 1)
        ]).then(_ => { //merged has to await a producer being setup

            debug("merge-stream up");

            firstStream.writeToStream("hi 4");
            firstStream.writeToStream("hi 5");
            secondStream.writeToStream("two 4");
            secondStream.writeToStream("four 1");
        });
    });

    it("should give kafka a few seconds again", function(done){
        setTimeout(done, 1000);
    });

    it("should be able to consume the freshly produced merge topic as table", function(done){

        const stream = kafkaStreams.getKTable(outputTopic, element => {
            return JSON.parse(element.value);
        });

        let messageCount = 0;
        function final(e){

            debug(e);
            messageCount++;

            if(messageCount > 9){
                throw new Error("more than 8");
            }

            if(messageCount === 9){

                stream.getTable().then(data => {
                    debug(data);

                    assert.equal(data.hi, "3");
                    assert.equal(data.two, "3");

                    done();
                });
            }
        }

        stream
            .consumeUntilCount(9)
            .tap(e => final(e))
            .forEach(e => {})
            .catch(e => debug(e));

        stream.start();
    });

    it("should be able to investigate stats for kafka clients", function(done){
       const stats = kafkaStreams.getStats();
        assert.equal(stats.length, 14);
        done();
    });

    it("should be able to reset the consumer config", function(done){
        kafkaStreams.config.groupId += "-1"; //makes topics re-readable
        setTimeout(done, 1);
    });

    it("should be able to build a window", function(done){
        this.timeout(5000);

        if(isTravis){
            return done(); //FIXME flaky on travis
        }

        const inputStream = kafkaStreams.getKStream(null);

        const from = Date.now() + 10;
        const to = Date.now() + 610;

        const {stream, window} = inputStream.window(from, to);

        let count = 0;
        setInterval(() => {
            count++;
            inputStream.writeToStream(`elmo1 ${count}.`);
        }, 100);

        stream
            .take(6) //end this stream, since dsl.replace..() will hold it open
            .forEach(debug)
            .then(_ => {
                assert.equal(window.container.length, 6);
                done();
            });
    });

    it("should be able to abort a running window", function(done){
        this.timeout(5000);

        const inputStream = kafkaStreams.getKStream(null);

        const from = Date.now() + 10;
        const to = Date.now() + 610;

        const {stream, abort, window} = inputStream.window(from, to);

        let count = 0;
        setInterval(() => {
            count++;
            inputStream.writeToStream(`elmo2 ${count}.`);
        }, 100);

        setTimeout(abort, 305);

        stream
            .take(3) //end this stream, since dsl.replace..() will hold it open
            .forEach(debug)
            .then(_ => {
                assert.equal(window.container.length, 3);
                done();
            });
    });

    it("should be able to consume a decent amount of memory", function(done){
        subMemory = getMemory();
        const consumed = subMemory - startMemory;
        debug("consumed additional memory: " + consumed + " bytes");
        assert(consumed < isTravis ? 20.e6 : 13.3e6, true);
        done();
    });

    it("should be able to produce a million messages to a topic", function(done){
        this.timeout(210000);

        const partitionCount = isTravis ? 3 : 1;
        const stream  = kafkaStreams.getKStream(null);
        stream
            .to(trafficTopic, partitionCount, stream.PRODUCE_TYPES.BUFFER_FORMAT);

        let count = 0;
        const intv = setInterval(_ => {
            debug("produce count: " + count);
            debug("total published: " + stream.getStats().producer.totalPublished);
        }, 2200);

        function getRandomInt(){
            const val = KafkaClient._getRandomIntInclusive(1e3, 1e8);

            if(millionMax < val){
                millionMax = val;
            }

            if(millionMin > val){
                millionMin = val;
            }

            return val;
        }

        function sendBatch(size, callback){
            const operations = Array(size).fill(undefined);
            async.eachLimit(operations, 1, (_, _callback) => {

                stream.writeToStream({
                    "message": "bla-bla-bla",
                    "stuff": getRandomInt()
                });

                process.nextTick(() => {
                    count++;
                    _callback();
                });
            }, callback);
        }

        stream.start().then(_ => {

            const batchSize = isTravis ? 10000 : 25000; // absolute max is 30 000 per second here
            const operationCount = millionMessageCount / batchSize;

            const operations = Array(operationCount).fill(undefined);
            async.eachLimit(operations, 1, (_, callback) => {
                sendBatch(batchSize, () => {
                    setTimeout(callback, 1000);
                });
            }, _ => {
                debug("produce count-final: " + count);
                clearInterval(intv);
                done();
            });
        });
    });

    it("should wait a few moments for messages to arrive", function(done){
        this.timeout(5000);
        setTimeout(done, isTravis ? 4900 : 500);
    });

    it("should be able to stream a million messages with attached operations", function(done){
        this.timeout(210000);

        const stream = kafkaStreams.getKStream(trafficTopic);

        let count = 0;
        const intv = setInterval(_ => {
            debug("consumed count: " + count);
        }, 2000);

        stream
            .map(m => m.value)
            .mapParse()
            .map(m => m.payload)
            .min("stuff")
            .max("stuff")
            .tap(_ => {
                count++;
            }).atThroughput(millionMessageCount, _ => {
                debug("consumed count: " + count);
                clearInterval(intv);

                Promise.all([stream.getStorage().getMin(), stream.getStorage().getMax()])
                    .then(([min, max]) => {
                        debug(min, max);

                        assert.equal(millionMin, min);
                        assert.equal(millionMax, max);

                        done();
                    });

            }).forEach(_ => {});

        stream.start();
    });

    it("should wait a few moments", function(done){
        this.timeout(5000);
        setTimeout(done, isTravis ? 4900 : 500);
    });

    it("should be able to consume a decent amount of memory after large consumption", function(done){
        const consumed = getMemory() - subMemory;
        debug("consumed additional memory: " + consumed + " bytes");
        assert(consumed < (isTravis ? 350e6 : 100e6), true);
        done();
    });
});
