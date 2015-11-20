# FAQ

* How is `db` specified?
  * It’s bound to the subdomain of the request, ex: db1.mycassango.net
* How do nodes communicate?
  * The same way clients do, via the identical REST interface. They can however take advantage of more advanced features.
* What’s the difference between a coordinator request and direct request?
  * Any request that requires one or more actions outside of the local node is considered a coordinator request.
* How is traffic prioritized?
  * Still TBD, but essentially document and blob data can be treated uniquely to optimize the importance of meta versus streaming.
* What if it takes longer to process a single document than is permitted by the Commandments?
  * Streaming should be leveraged whenever possible, as well as offloading heavy tasks to alternate threads or processes as needed.
* What if a LIST or SEARCH command returns both meta (JSON) and blob (binary) data?
  * Everything is returned as a JSON response in either case, with binary data serialized accordingly.
* Can I store HTTP headers and index & search on them?
  * Yes. HTTP headers are treated as extensions of the document, and are created equal in terms of indexing and search ability.
* Can I create an index of a field that does not exist?
  * Yes.
* Can I create compound indexes?
  * Yes, eventually. May be a single column for now.
* Can I consume an index at time of creation?
  * Not until the index is live can you begin executing against it. Replication takes time.
* How do you handle limits/paging across keys in a SEARCH?
  * Cross-key searches suck. While limit is adhered to, paging is not, as order is not predictable since query will be completed at time of limit. Order is still applied to final result.
* Unique key support?
  * Not at this time, collisions detection would likely be expensive.
* How is an index distributed?
  * An index is created equal to that of the table itself, where-in the key determines the partition. An index automatically leverages LAZY (eventually consistent) copy, but for large objects (> 256KB) will leverage REFERENCE (effectively an INNER JOIN) which is a bit slower as there is a good chance it will need to retrieve from alternate node.
* Are indexes restricted in size?
  * Not yet, but will eventually be restricted by file count and total size.
* Support for composite keys/indexes?
  * Perhaps in the future, but this is a nice to have.
* How does a broadcasting node prevent re-broadcasting of changes?
  * Reserved restricted property “_broadcast:false” is used to prevent changes from being broadcasted to other nodes.
  * Eventually restricted properties will be limited to NODES only.
* What happens if not all indexes can fit into memory?
  * Indexes will leverage LRU (least recently used) eviction policy. More frequently used indexes are likely to remain in memory. It’s also possible for memory usage to impact partition ranges, to help optimize storage, io, and memory usage of systems for overall optimal performance.
* How to handle consistency between nodes?
  * Until an intelligent (read: performant) system can be devised, periodic trickle comparisons will be performed across all nodes to keep everyone in sync.
* What happens when a node becomes out of sync due to failure or downtime?
  * Any node outage (intended or not) will result in a repair upon coming online.
  * Partition range of a node begins at 0-0, and will expand over time as it synchronizes various partition ranges.
  * Existing data on disk is not deleted upon coming online, as it is used during synchronization (via ETag) to avoid unnecessary transfer of data. 
  * The longer a node is online, the larger the partition range becomes, until comparable to other nodes.
* Can a node consist of more than one partition range?
  * Yes, there is no hard limit. It’s up to the current intelligence of the nodes to determine how best to divvy up partitions. Ideally there should only be 1-3 ranges.
* How much control over consistency?
  * Simple, you can specify LOW (one read), MAJORITY (quorum), or HIGH (all replicas, but fallback to quorum on failure)
* Minimum nodes?
  * Three. If hardware is an issue, all nodes can run on one server until scale is needed, but this is a bad practice from availability standpoint.

