cassango
========

A single nosql store to fill all common needs to build applications that scale to enterprise grade, but with the simplicity of entry level services.


# Goals

Goals of this project include:

* Serverless First Architecture (1)
* Immutable database (2)
* High availability
* Scale throughput linearly (3)
* Scale storage linearly
* Average response times less than 10ms (4)
* Perform in a predictable manner (5)
* Simple enough for a hobbyist to setup and maintain
* Perform even after index sizes exceed memory capacity (6)


1. Designed from the ground up for client-to-database patterns
2. Differential history supports moving forward and backward in time
3. With greater than or equal to 99.5% efficiency
4. Leveraging commodity SSD grade hardware under 50% load for basic operations
5. Simple operations perform quickly, complex operations can take any amount of time
6. Though may result in YELLOW status for performance noting possible degradation of service



# Resources

* [Features](./FEATURES.md)
* [Consistency Spec](./CONSISTENCY_SPEC.md)
* [API Spec](./API_SPEC.md)
* [Storage Spec](./STORAGE_SPEC.md)
* [Replication Spec](./REPLICATION_SPEC.md)
* [Search Spec](./SEARCH_SPEC.md)
* [FAQ](./FAQ.md)

