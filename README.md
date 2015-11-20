cassango
========

A single nosql store to fill all common needs to build applications that scale to enterprise grade, but with the simplicity of entry level services.


# Goals

Goals of this project include:

* Scale throughput linearly (1)
* Scale storage linearly
* Average response times less than 10ms (2)
* Perform in a predictable manner (3)
* Simple enough for a hobbyist to setup and maintain
* Perform even after index sizes exceed memory capacity (4)


1. With greater than or equal to 99.5% efficiency
2. Leveraging commodity SSD grade hardware under 50% load for basic operations
3. Simple operations perform quickly, complex operations can take any amount of time
4. Though may result in YELLOW status for performance noting possible degradation of service



# Resources

* [Features](./FEATURES.md)
* [Consistency Spec](./CONSISTENCY_SPEC.md)
* [API Spec](./API_SPEC.md)
* [Storage Spec](./STORAGE_SPEC.md)
* [Replication Spec](./REPLICATION_SPEC.md)
* [Search Spec](./SEARCH_SPEC.md)
* [FAQ](./FAQ.md)

