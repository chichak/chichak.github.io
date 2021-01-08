<div class="content-body tutorial-content" data-growable-markdown="">
  
  <h3 id="introduction">Introduction</h3>

<p><strong>Big data</strong> is a blanket term for the non-traditional strategies and technologies needed to gather, organize, process, and gather insights from large datasets.  While the problem of working with data that exceeds the computing power or storage of a single computer is not new, the pervasiveness, scale, and value of this type of computing has greatly expanded in recent years.</p>

<p>In this article, we will talk about big data on a fundamental level and define common concepts you might come across while researching the subject.  We will also take a high-level look at some of the processes and technologies currently being used in this space.</p>

<a name="what-is-big-data" data-unique="what-is-big-data"></a><a name="what-is-big-data" data-unique="what-is-big-data"></a><h2 id="what-is-big-data">What Is Big Data?</h2>

<p>An exact definition of “big data” is difficult to nail down because projects, vendors, practitioners, and business professionals use it quite differently.  With that in mind, generally speaking, <strong>big data</strong> is:</p>

<ul>
<li>large datasets</li>
<li>the category of computing strategies and technologies that are used to handle large datasets</li>
</ul>

<p>In this context, “large dataset” means a dataset too large to reasonably process or store with traditional tooling or on a single computer.  This means that the common scale of big datasets is constantly shifting and may vary significantly from organization to organization.</p>

<a name="why-are-big-data-systems-different" data-unique="why-are-big-data-systems-different"></a><a name="why-are-big-data-systems-different" data-unique="why-are-big-data-systems-different"></a><h2 id="why-are-big-data-systems-different">Why Are Big Data Systems Different?</h2>

<p>The basic requirements for working with big data are the same as the requirements for working with datasets of any size.  However, the massive scale, the speed of ingesting and processing, and the characteristics of the data that must be dealt with at each stage of the process present significant new challenges when designing solutions.  The goal of most big data systems is to surface insights and connections from large volumes of heterogeneous data that would not be possible using conventional methods.</p>

<p>In 2001, Gartner’s Doug Laney first presented what became known as the “three Vs of big data” to describe some of the characteristics that make big data different from other data processing:</p>

<h3 id="volume">Volume</h3>

<p>The sheer scale of the information processed helps define big data systems.  These datasets can be orders of magnitude larger than traditional datasets, which demands more thought at each stage of the processing and storage life cycle.</p>

<p>Often, because the work requirements exceed the capabilities of a single computer, this becomes a challenge of pooling, allocating, and coordinating resources from groups of computers.  Cluster management and algorithms capable of breaking tasks into smaller pieces become increasingly important.</p>

<h3 id="velocity">Velocity</h3>

<p>Another way in which big data differs significantly from other data systems is the speed that information moves through the system.  Data is frequently flowing into the system from multiple sources and is often expected to be processed in real time to gain insights and update the current understanding of the system.</p>

<p>This focus on near instant feedback has driven many big data practitioners away from a batch-oriented approach and closer to a real-time streaming system.  Data is constantly being added, massaged, processed, and analyzed in order to keep up with the influx of new information and to surface valuable information early when it is most relevant.  These ideas require robust systems with highly available components to guard against failures along the data pipeline.</p>

<h3 id="variety">Variety</h3>

<p>Big data problems are often unique because of the wide range of both the sources being processed and their relative quality.</p>

<p>Data can be ingested from internal systems like application and server logs, from social media feeds and other external APIs, from physical device sensors, and from other providers.  Big data seeks to handle potentially useful data regardless of where it’s coming from by consolidating all information into a single system.</p>

<p>The formats and types of media can vary significantly as well.  Rich media like images, video files, and audio recordings are ingested alongside text files, structured logs, etc.  While more traditional data processing systems might expect data to enter the pipeline already labeled, formatted, and organized, big data systems usually accept and store data closer to its raw state.  Ideally, any transformations or changes to the raw data will happen in memory at the time of processing.</p>

<h3 id="other-characteristics">Other Characteristics</h3>

<p>Various individuals and organizations have suggested expanding the original three Vs, though these proposals have tended to describe challenges rather than qualities of big data.  Some common additions are:</p>

<ul>
<li><strong>Veracity</strong>: The variety of sources and the complexity of the processing can lead to challenges in evaluating the quality of the data (and consequently, the quality of the resulting analysis)</li>
<li><strong>Variability</strong>: Variation in the data leads to wide variation in quality.  Additional resources may be needed to identify, process, or filter low quality data to make it more useful.</li>
<li><strong>Value</strong>: The ultimate challenge of big data is delivering value.  Sometimes, the systems and processes in place are complex enough that using the data and extracting actual value can become difficult.</li>
</ul>

<a name="what-does-a-big-data-life-cycle-look-like" data-unique="what-does-a-big-data-life-cycle-look-like"></a><a name="what-does-a-big-data-life-cycle-look-like" data-unique="what-does-a-big-data-life-cycle-look-like"></a><h2 id="what-does-a-big-data-life-cycle-look-like">What Does a Big Data Life Cycle Look Like?</h2>

<p>So how is data actually processed when dealing with a big data system?  While approaches to implementation differ, there are some commonalities in the strategies and software that we can talk about generally.  While the steps presented below might not be true in all cases, they are widely used.</p>

<p>The general categories of activities involved with big data processing are:</p>

<ul>
<li>Ingesting data into the system</li>
<li>Persisting the data in storage</li>
<li>Computing and Analyzing data</li>
<li>Visualizing the results</li>
</ul>

<p>Before we look at these four workflow categories in detail, we will take a moment to talk about <strong>clustered computing</strong>, an important strategy employed by most big data solutions.  Setting up a computing cluster is often the foundation for technology used in each of the life cycle stages.</p>

<h3 id="clustered-computing">Clustered Computing</h3>

<p>Because of the qualities of big data, individual computers are often inadequate for handling the data at most stages.  To better address the high storage and computational needs of big data, computer clusters are a better fit.</p>

<p>Big data clustering software combines the resources of many smaller machines, seeking to provide a number of benefits:</p>

<ul>
<li><strong>Resource Pooling</strong>: Combining the available storage space to hold data is a clear benefit, but CPU and memory pooling is also extremely important.  Processing large datasets requires large amounts of all three of these resources.</li>
<li><strong>High Availability</strong>: Clusters can provide varying levels of fault tolerance and availability guarantees to prevent hardware or software failures from affecting access to data and processing.  This becomes increasingly important as we continue to emphasize the importance of real-time analytics.</li>
<li><strong>Easy Scalability</strong>: Clusters make it easy to scale horizontally by adding additional machines to the group.  This means the system can react to changes in resource requirements without expanding the physical resources on a machine.</li>
</ul>

<p>Using clusters requires a solution for managing cluster membership, coordinating resource sharing, and scheduling actual work on individual nodes.  Cluster membership and resource allocation can be handled by software like <strong>Hadoop’s YARN</strong> (which stands for Yet Another Resource Negotiator) or <strong>Apache Mesos</strong>.</p>

<p>The assembled computing cluster often acts as a foundation which other software interfaces with to process the data.  The machines involved in the computing cluster are also typically involved with the management of a distributed storage system, which we will talk about when we discuss data persistence.</p>

<h3 id="ingesting-data-into-the-system">Ingesting Data into the System</h3>

<p>Data ingestion is the process of taking raw data and adding it to the system.  The complexity of this operation depends heavily on the format and quality of the data sources and how far the data is from the desired state prior to processing.</p>

<p>One way that data can be added to a big data system are dedicated ingestion tools.  Technologies like <strong>Apache Sqoop</strong> can take existing data from relational databases and add it to a big data system.  Similarly, <strong>Apache Flume</strong> and <strong>Apache Chukwa</strong> are projects designed to aggregate and import application and server logs.  Queuing systems like <strong>Apache Kafka</strong> can also be used as an interface between various data generators and a big data system.  Ingestion frameworks like <strong>Gobblin</strong> can help to aggregate and normalize the output of these tools at the end of the ingestion pipeline.</p>

<p>During the ingestion process, some level of analysis, sorting, and labelling usually takes place.  This process is sometimes called ETL, which stands for extract, transform, and load.  While this term conventionally refers to legacy data warehousing processes, some of the same concepts apply to data entering the big data system.  Typical operations might include modifying the incoming data to format it, categorizing and labelling data, filtering out unneeded or bad data, or potentially validating that it adheres to certain requirements.</p>

<p>With those capabilities in mind, ideally, the captured data should be kept as raw as possible for greater flexibility further on down the pipeline.</p>

<h3 id="persisting-the-data-in-storage">Persisting the Data in Storage</h3>

<p>The ingestion processes typically hand the data off to the components that manage storage, so that it can be reliably persisted to disk.  While this seems like it would be a simple operation, the volume of incoming data, the requirements for availability, and the distributed computing layer make more complex storage systems necessary.</p>

<p>This usually means leveraging a distributed file system for raw data storage.  Solutions like <strong>Apache Hadoop’s HDFS</strong> filesystem allow large quantities of data to be written across multiple nodes in the cluster.  This ensures that the data can be accessed by compute resources, can be loaded into the cluster’s RAM for in-memory operations, and can gracefully handle component failures.  Other distributed filesystems can be used in place of HDFS including <strong>Ceph</strong> and <strong>GlusterFS</strong>.</p>

<p>Data can also be imported into other distributed systems for more structured access.  Distributed databases, especially NoSQL databases, are well-suited for this role because they are often designed with the same fault tolerant considerations and can handle heterogeneous data.  There are many different types of distributed databases to choose from depending on how you want to organize and present the data.  To learn more about some of the options and what purpose they best serve, read our <a href="https://www.digitalocean.com/community/tutorials/a-comparison-of-nosql-database-management-systems-and-models">NoSQL comparison guide</a>.</p>

<h3 id="computing-and-analyzing-data">Computing and Analyzing Data</h3>

<p>Once the data is available, the system can begin processing the data to surface actual information.  The computation layer is perhaps the most diverse part of the system as the requirements and best approach can vary significantly depending on what type of insights desired.  Data is often processed repeatedly, either iteratively by a single tool or by using a number of tools to surface different types of insights.</p>

<p><strong>Batch processing</strong> is one method of computing over a large dataset.  The process involves breaking work up into smaller pieces, scheduling each piece on an individual machine, reshuffling the data based on the intermediate results, and then calculating and assembling the final result. These steps are often referred to individually as splitting, mapping, shuffling, reducing, and assembling, or collectively as a distributed map reduce algorithm.  This is the strategy used by <strong>Apache Hadoop’s MapReduce</strong>.  Batch processing is most useful when dealing with very large datasets that require quite a bit of computation.</p>

<p>While batch processing is a good fit for certain types of data and computation, other workloads require more <strong>real-time processing</strong>.  Real-time processing demands that information be processed and made ready immediately and requires the system to react as new information becomes available.  One way of achieving this is <strong>stream processing</strong>, which operates on a continuous stream of data composed of individual items.  Another common characteristic of real-time processors is in-memory computing, which works with representations of the data in the cluster’s memory to avoid having to write back to disk.</p>

<p><strong>Apache Storm</strong>, <strong>Apache Flink</strong>, and <strong>Apache Spark</strong> provide different ways of achieving real-time or near real-time processing.  There are trade-offs with each of these technologies, which can affect which approach is best for any individual problem.  In general, real-time processing is best suited for analyzing smaller chunks of data that are changing or being added to the system rapidly.</p>

<p>The above examples represent computational frameworks.  However, there are many other ways of computing over or analyzing data within a big data system.  These tools frequently plug into the above frameworks and provide additional interfaces for interacting with the underlying layers.  For instance, <strong>Apache Hive</strong> provides a data warehouse interface for Hadoop, <strong>Apache Pig</strong> provides a high level querying interface, while SQL-like interactions with data can be achieved with projects like <strong>Apache Drill</strong>, <strong>Apache Impala</strong>, <strong>Apache Spark SQL</strong>, and <strong>Presto</strong>.  For machine learning, projects like <strong>Apache SystemML</strong>, <strong>Apache Mahout</strong>, and <strong>Apache Spark’s MLlib</strong> can be useful.  For straight analytics programming that has wide support in the big data ecosystem, both <strong>R</strong> and <strong>Python</strong> are popular choices.</p>

<h3 id="visualizing-the-results">Visualizing the Results</h3>

<p>Due to the type of information being processed in big data systems, recognizing trends or changes in data over time is often more important than the values themselves.  Visualizing data is one of the most useful ways to spot trends and make sense of a large number of data points.</p>

<p>Real-time processing is frequently used to visualize application and server metrics.  The data changes frequently and large deltas in the metrics typically indicate significant impacts on the health of the systems or organization. In these cases, projects like <strong>Prometheus</strong> can be useful for processing the data streams as a time-series database and visualizing that information.</p>

<p>One popular way of visualizing data is with the <strong>Elastic Stack</strong>, formerly known as the ELK stack.  Composed of Logstash for data collection, Elasticsearch for indexing data, and Kibana for visualization, the Elastic stack can be used with big data systems to visually interface with the results of calculations or raw metrics.  A similar stack can be achieved using <strong>Apache Solr</strong> for indexing and a Kibana fork called <strong>Banana</strong> for visualization.  The stack created by these is called <strong>Silk</strong>.</p>

<p>Another visualization technology typically used for interactive data science work is a data “notebook”.  These projects allow for interactive exploration and visualization of the data in a format conducive to sharing, presenting, or collaborating.  Popular examples of this type of visualization interface are <strong>Jupyter Notebook</strong> and <strong>Apache Zeppelin</strong>.</p>

<a name="big-data-glossary" data-unique="big-data-glossary"></a><a name="big-data-glossary" data-unique="big-data-glossary"></a><h2 id="big-data-glossary">Big Data Glossary</h2>

<p>While we’ve attempted to define concepts as we’ve used them throughout the guide, sometimes it’s helpful to have specialized terminology available in a single place:</p>

<ul>
<li><strong>Big data</strong>: Big data is an umbrella term for datasets that cannot reasonably be handled by traditional computers or tools due to their volume, velocity, and variety.  This term is also typically applied to technologies and strategies to work with this type of data.</li>
<li><strong>Batch processing</strong>: Batch processing is a computing strategy that involves processing data in large sets.  This is typically ideal for non-time sensitive work that operates on very large sets of data.  The process is started and at a later time, the results are returned by the system.</li>
<li><strong>Cluster computing</strong>: Clustered computing is the practice of pooling the resources of multiple machines and managing their collective capabilities to complete tasks.  Computer clusters require a cluster management layer which handles communication between the individual nodes and coordinates work assignment.</li>
<li><strong>Data lake</strong>: Data lake is a term for a large repository of collected data in a relatively raw state.  This is frequently used to refer to the data collected in a big data system which might be unstructured and frequently changing.  This differs in spirit to data warehouses (defined below).</li>
<li><strong>Data mining</strong>: Data mining is a broad term for the practice of trying to find patterns in large sets of data.  It is the process of trying to refine a mass of data into a more understandable and cohesive set of information.</li>
<li><strong>Data warehouse</strong>: Data warehouses are large, ordered repositories of data that can be used for analysis and reporting.  In contrast to a <em>data lake</em>, a data warehouse is composed of data that has been cleaned, integrated with other sources, and is generally well-ordered.  Data warehouses are often spoken about in relation to big data, but typically are components of more conventional systems.</li>
<li><strong>ETL</strong>: ETL stands for extract, transform, and load.  It refers to the process of taking raw data and preparing it for the system’s use.  This is traditionally a process associated with data warehouses, but characteristics of this process are also found in the ingestion pipelines of big data systems.</li>
<li><strong>Hadoop</strong>: Hadoop is an Apache project that was the early open-source success in big data.  It consists of a distributed filesystem called HDFS, with a cluster management and resource scheduler on top called YARN (Yet Another Resource Negotiator).  Batch processing capabilities are provided by the MapReduce computation engine.  Other computational and analysis systems can be run alongside MapReduce in modern Hadoop deployments.</li>
<li><strong>In-memory computing</strong>: In-memory computing is a strategy that involves moving the working datasets entirely within a cluster’s collective memory.  Intermediate calculations are not written to disk and are instead held in memory.  This gives in-memory computing systems like Apache Spark a huge advantage in speed over I/O bound systems like Hadoop’s MapReduce.</li>
<li><strong>Machine learning</strong>: Machine learning is the study and practice of designing systems that can learn, adjust, and improve based on the data fed to them.  This typically involves implementation of predictive and statistical algorithms that can continually zero in on “correct” behavior and insights as more data flows through the system.</li>
<li><strong>Map reduce (big data algorithm)</strong>: Map reduce (the big data algorithm, not Hadoop’s MapReduce computation engine) is an algorithm for scheduling work on a computing cluster.  The process involves splitting the problem set up (mapping it to different nodes) and computing over them to produce intermediate results, shuffling the results to align like sets, and then reducing the results by outputting a single value for each set.</li>
<li><strong>NoSQL</strong>: NoSQL is a broad term referring to databases designed outside of the traditional relational model.  NoSQL databases have different trade-offs compared to relational databases, but are often well-suited for big data systems due to their flexibility and frequent distributed-first architecture.</li>
<li><strong>Stream processing</strong>: Stream processing is the practice of computing over individual data items as they move through a system.  This allows for real-time analysis of the data being fed to the system and is useful for time-sensitive operations using high velocity metrics.</li>
</ul>

<a name="conclusion" data-unique="conclusion"></a><a name="conclusion" data-unique="conclusion"></a><h2 id="conclusion">Conclusion</h2>

<p>Big data is a broad, rapidly evolving topic.  While it is not well-suited for all types of computing, many organizations are turning to big data for certain types of work loads and using it to supplement their existing analysis and business tools.  Big data systems are uniquely suited for surfacing difficult-to-detect patterns and providing insight into behaviors that are impossible to find through conventional means.  By correctly implement systems that deal with big data, organizations can gain incredible value from data that is already available.</p>

</div>
