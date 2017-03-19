cassango
========

A single nosql store to fill all common needs to build applications that scale to enterprise grade, but with the simplicity of entry level services.


# Goals

Goals of this project include:

* High availability
* Immutable database (1)
* Scale throughput linearly (2)
* Scale storage linearly
* Serverless Architecture
* Average response times less than 10ms (3)
* Perform in a predictable manner (4)
* Simple enough for a hobbyist to setup and maintain
* Perform even after index sizes exceed memory capacity (5)


1. Differential history supports moving backward and forward in time
2. With greater than or equal to 99.5% efficiency
3. Leveraging commodity SSD grade hardware under 50% load for basic operations
4. Simple operations perform quickly, complex operations can take any amount of time
5. Though may result in YELLOW status for performance noting possible degradation of service



# Resources

* [Features](./FEATURES.md)
* [Consistency Spec](./CONSISTENCY_SPEC.md)
* [API Spec](./API_SPEC.md)
* [Storage Spec](./STORAGE_SPEC.md)
* [Replication Spec](./REPLICATION_SPEC.md)
* [Search Spec](./SEARCH_SPEC.md)
* [FAQ](./FAQ.md)

