# 08. Modern Workloads, Tiering, Fabrics & Security (Simplified)

> **Interactive Lesson & KV-Cache Lab:** [Open Subject 08 HTML](https://guymdls.github.io/learning-topics/storage-learning-topics/08-workloads-tiering-fabrics-and-security/)

## The 30-Second Mental Model
Real customers don't run plain 4KB random tests all day — they run **four real-world stacks**:
1. **AI & Memory Tiering:** Chatbots run out of GPU HBM fast (`Llama 70B @ 128K × 8 users = 320 GB KV cache!`), spilling across **HBM4 → DDR5 → CXL → SanDisk HBF → NVMe SSDs**.
2. **Databases & Cloud Fabrics:** **FDP** keeps RocksDB/MySQL from thrashing flash, while **NVMe/TCP** & **RoCEv2** share SSD pools over Ethernet.
3. **Gaming:** **Microsoft DirectStorage + GDeflate** streams compressed game worlds straight from client Gen5 SSDs (SN8100) to the GPU.
4. **Security:** **TCG Opal 2.30** encrypts data at rest, **OCP L.O.C.K. v1.1** hides keys from firmware in hardware, and **SPDM 1.4 + PQC** verify drive identity.

## Curated Sources & Reference Library

| Source / Resource | Format | Link / Identifier | How to Use It |
| :--- | :--- | :--- | :--- |
| **Modular KV-Cache Offloading Handbook & SanDisk HBF + Hot Chips 2026 Analysis** | Clear Architecture Reads | [Modular KV-Cache Guide](https://handbook.modular.com/inference-optimization/kv-cache-offloading/) · [SanDisk HBF Blog](https://www.sandisk.com/company/newsroom/blogs/2025/scaling-beyond-the-wall-inside-sandisks-high-bandwidth-flash-for-ai) · [Hot Chips 2026 HBF Caveats](https://www.tomshardware.com/pc-components/ssds/hot-chips-2026-high-bandwidth-flash-promises-massive-bandwidth-and-capacity-but-its-usability-is-extremely-limited-new-memory-format-strikes-a-balance-between-hbm-and-nand-flash) | Start here! Plain-English walkthrough of why LLMs run out of GPU HBM and where High Bandwidth Flash (HBF) shines vs struggles. |
| **MLPerf Storage v3.0, NVIDIA GDS & LMCache / Dynamo / Mooncake** | AI Benchmarks & Code | [mlcommons/storage](https://github.com/mlcommons/storage) · [NVIDIA GDS](https://docs.nvidia.com/gpudirect-storage/) · [LMCache](https://github.com/lmcache/lmcache) · [NVIDIA Dynamo KVBM](https://docs.nvidia.com/dynamo/knowledge-base/modular-components/backends/v-llm/kv-cache-offloading) | Run actual AI training, checkpointing, KV-cache, and Vector DB storage workloads. |
| **CXL 4.0, Linux CXL Tiering, CacheLib FDP & RocksDB UFROP** | Tiering & DB Guides | [Linux CXL Tiering](https://kernel-internals.org/mm/cxl-memory-tiering/) · [CacheLib FDP](https://cachelib.org/docs/Cache_Library_User_Guides/FDP_enabled_Cache/) · [KIOXIA UFROP](https://github.com/kioxia-jp/ufrop) · [databass.dev](https://www.databass.dev/) | Hands-on guides to CXL Type 3 NUMA demotion and FDP-accelerated databases. |
| **NVMe/TCP vs RoCEv2, DirectStorage SDK & TCG Opal / OCP L.O.C.K. / SPDM / FIPS** | Fabrics, Gaming & Security | [Lightbits NVMe/TCP -i](https://www.lightbitslabs.com/blog/scaling-4k-random-read-on-nvme-tcp-why-outstanding-i-o-and-i-matter-more-than-you-think-part-1/) · [DirectStorage GitHub](https://github.com/microsoft/DirectStorage) · [TCG Opal](https://www.trustedcomputinggroup.org/resources/documents/storage-work-group-storage-security-subsystem-class-opal) · [OCP L.O.C.K. v1.1](https://www.opencompute.org/documents/ocp-lock-specification-v1-1-final-pdf/) · [DMTF SPDM](https://www.dmtf.org/standards/spdm) · [NIST FIPS 140-3](https://csrc.nist.gov/pubs/fips/140-3/final) | Reference specs and benchmarks across networked fabrics, Windows gaming, and hardware security. |

