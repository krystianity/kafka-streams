import { EventEmitter } from "events";
import { KafkaFactory } from "./KafkaFactory";
import { KStream, KTable } from "./dsl";
import { KStorage } from "./KStorage";
import { KafkaClient, KafkaClientStats } from "./client";
import { KafkaStreamsConfig } from "../interfaces";


/**
 * Stream object factory
 * inhabits EventEmitter(events)
 */
export class KafkaStreams extends EventEmitter {
  public config: KafkaStreamsConfig;
  public factory: KafkaFactory;
  public storageClass: typeof KStorage;
  public storageOptions: any;
  public kafkaClients: KafkaClient[] = [];
  public storages: KStorage[] = [];

  /**
   * Can be used as factory to get
   * pre-build KStream and KTable instances
   * injected with a KafkaClient instance
   * and with a KStorage instance
   * @param {object} config - KafkaStreamsConfig @todo - update this from sinek.
   * @param {KStorage} storageClass
   * @param {object} storageOptions
   * @param {boolean} disableStorageTest
   */
  constructor(config: any, storageClass: new () => KStorage = null, storageOptions = {}, disableStorageTest = false) {
    super();

    this.config = config;

    if (!this.config || typeof this.config !== "object") {
      throw new Error("Config must be a valid object.");
    }

    this.factory = new KafkaFactory(this.config, this.config.batchOptions);
    this.storageClass = storageClass || KStorage;
    this.storageOptions = storageOptions;

    if (!disableStorageTest) {
      KafkaStreams.checkStorageClass(this.storageClass);
    }
  }

  static checkStorageClass(storageClass: typeof KStorage): void | Error {

    let test = null;
    try {
      test = new storageClass();
    } catch (_) {
      throw new Error("storageClass should be a constructor.");
    }

    if (!(test instanceof KStorage)) {
      throw new Error("storageClass should be a constructor that extends KStorage.");
    }
  }

  getKafkaClient(topic: string): KafkaClient {
    const client = this.factory.getKafkaClient(topic);
    this.kafkaClients.push(client);
    return client;
  }

  getStorage(): KStorage {
    const storage = new this.storageClass(this.storageOptions);
    this.storages.push(storage);
    return storage;
  }

  /**
   * get a new KStream instance
   * representing the topic as change-log
   * @param topic
   * @param storage
   * @returns {KStream}
   */
  getKStream(topic?: string, storage: KStorage | null = null): KStream {

    const kstream = new KStream(topic,
      storage || this.getStorage(),
      this.getKafkaClient(topic));

    kstream.setKafkaStreamsReference(this);
    return kstream;
  }

  /**
   * get a new KStream instance
   * based on most.js
   * @param stream$
   * @param storage
   * @returns {KStream}
   */
  fromMost(stream$, storage = null) {
    const kstream = this.getKStream(null, storage);
    kstream.replaceInternalObservable(stream$);
    return kstream;
  }

  /**
   * get a new KTable instance
   * representing the topic as table like stream
   * @param topic
   * @param keyMapETL
   * @param storage
   * @returns {KTable}
   */
  getKTable(topic, keyMapETL, storage = null) {

    const ktable = new KTable(topic,
      keyMapETL,
      storage || this.getStorage(),
      this.getKafkaClient(topic));

    ktable.setKafkaStreamsReference(this);
    return ktable;
  }

  /**
   * returns array of statistics object
   * for each active kafka client in any
   * stream that has been created by this factory
   * stats will give good insights into consumer
   * and producer behaviour
   * warning: depending on the amount of streams you have created
   * this could result in a large object
   * @returns {Array}
   */
  getStats(): KafkaClientStats[] {
    return this.kafkaClients.map(kafkaClient => kafkaClient.getStats());
  }

  /**
   * close any kafkaClient instance
   * and any storage instance
   * that has every been created by this factory
   * @returns {Promise}
   */
  closeAll(): Promise<boolean> {
    return Promise.all(this.kafkaClients.map(client => {
      return new Promise(resolve => {
        client.close();
        setTimeout(resolve, 750, true); //give client time for disconnect events
      });
    })).then(() => {
      this.kafkaClients = [];
      return Promise.all(this.storages.map(storage => storage.close())).then(() => {
        this.storages = [];
        super.emit("closed");
        return true;
      });
    });
  }
}
