# Consistency

While consistency is eventual and tunable, the default behavior is also automatic and favors Optimistic Consistency. 


## Eventual Consistency

By design to support distributed clusters we rely on data being eventually consistent. For most data access scenarios, this is more than sufficient.
In cases where a high consistency is necessary, Important or Critical Consistency can be used to meet needs.



## Consistency Policy

A consistency policy combines not only the consistency levels, but also the escalation patterns leveraged under failure scenarios. For instance, `Fast` may leverage consistency `LOCAL_ONE`, and on failure retry as `ONE` (multi-dc). A given policy may include multiple levels of escalations, each with potentially unique delays (i.e. fixed, versus linear, versus exponential backoff).


## Tunable Consistency

While the default behavior is Optimistic Consistency, this behavior can also be overridden using one of the below options:

* Fast - Success on confirmation of 1 node. In this mode local nodes will be hit first,
  and distributed nodes will only be hit on retry.
* Optimistic - An attempt to confirm 2 or more local nodes. In this mode local nodes will be hit first,
  and distributed nodes will only be hit if zero local nodes could be confirmed. Unlike Important Consistency,
  Optimistic Consistency will favor local nodes and thus perform much better across distributed clusters and
  node downtime. If 2 or more nodes cannot be confirmed, successful will still be returned, but with warning.
* Important - An attempt to confirm 2 or more nodes. In this mode local nodes will be hit first,
  and distributed nodes will only be hit on retry. If 2 or more nodes cannot be confirmed,
  successful will still be returned, but with warning.
* Critical - An attempt to confirm 3 or more nodes. In this mode local nodes will be hit first,
  and distributed nodes will only be hit on retry. Under no circumstance will success be returned
  if fewer than 3 nodes can be confirmed.
