# 09. 24-Week (6-Month) Hands-On Mastery Syllabus

> **Interactive Tracker:** [Open Syllabus HTML](https://guymdls.github.io/learning-topics/storage-learning-topics/09-24-week-mastery-syllabus/) · [Local `index.html`](./index.html)

Calibrated for **8–10 hours/week** alongside daily SanDisk validation engineering work across four sequenced 6-week phases.

## Phase 1 (Weeks 1–6): Protocol, Bus, Flash & OS Foundations

Build an end-to-end mental model from a host syscall down to a BiCS8/BiCS10 NAND cell, anchored to your active specifications.

- **W1–W2: NVMe 2.3 & PCIe 5.0/6.0 Fundamentals**
  - *Study:* NVMe Base 2.3 queues, 64B SQE / 16B CQE, PRPs vs SGLs, NVM CS 1.2; MindShare PCI Express Technology (TLP/DLLP, ordering) + PCIe 6.0 PAM4/FLIT/FEC guides.
  - *Lab: Boot a QEMU NVMe VM with ocp=on and fdp=on; inspect lspci -vv, nvme show-regs, nvme id-ctrl, and raw SQE/CQE tracing via nvme trace events.*
- **W3–W4: 3D NAND Physics, FTL & SanDisk Media**
  - *Study:* Micheloni Inside Solid State Drives (3D NAND, FTL, LDPC); Onur Mutlu Fall 2025/2026 Flash/SSD lectures; SanDisk UltraQLC & BiCS8/9/10 architectures.
  - *Lab: Run a full fio write-fill on a lab SSD (or FEMU) from FOB into steady state; plot throughput collapse during SLC exhaustion & GC, and compute WAF from physical vs host writes.*
- **W5–W6: Computer Architecture & Linux Storage Stack**
  - *Study:* CS:APP3e (Ch. 6 & 9), Drepper memory paper (caches, NUMA, DMA), OSTEP Persistence, and Linux blk-mq / drivers/nvme/host/pci.c.
  - *Lab: Map PCIe SSDs to NUMA sockets on a dual-socket host, quantify cross-NUMA vs local-NUMA 4K random read penalties, and trace an I/O through blk-mq to nvme_queue_rq.*
- **Phase 1 Capstone: Host-to-NAND Diagnostic Playbook**
  - *Study:* Deliverable: Reproducible bash/Python script that automatically audits a lab server's BIOS C-states, iommu=pt, PCIe negotiated speed/width/MPS, NUMA-to-PCIe affinity, and NVMe queue/IRQ layout prior to any benchmark run.
  - *Verifies host innocence automatically before every qualification cycle.*

## Phase 2 (Weeks 7–12): High-Performance Tooling, Concurrency & Profiling

Upgrade systems programming and statistical methodology so validation tools saturate Gen5/Gen6 hardware with minimal CPU burn and zero measurement bias.

- **W7–W8: Systems Concurrency & Hardware-Aware C++/Rust**
  - *Study:* Mara Bos Rust Atomics and Locks (Ch. 1–4, 7–9), Fedor Pikus The Art of Writing Efficient Programs, and Paul McKenney's Perfbook (partitioning & parallel counting).
  - *Lab: Implement a lock-free SPSC I/O completion ring in C++/Rust; intentionally induce 64-byte false sharing, diagnose it with perf Data Address Profiling / PMU counters, and fix via cache-line alignment.*
- **W9–W10: Kernel Bypass (io_uring_cmd, SPDK, xNVMe) & SIMD Integrity**
  - *Study:* Axboe's io_uring.pdf, SPDK NVMe polling (spdk_nvme_qpair_process_completions), and Intel ISA-L CRC / T10-DIF routines.
  - *Lab: Write a multi-threaded raw NVMe benchmark + data-compare prototype via liburing (io_uring_cmd on /dev/ngXnY, fixed buffers + polling); compare IOPS/core vs fio & spdk_nvme_perf; accelerate with ISA-L.*
- **W11–W12: Profiling (perf/eBPF), SNIA PTS & CI Regression**
  - *Study:* Gregg Systems Performance (USE, TSA, Disks, Benchmarking), Bakhvalov TMAM, Coordinated Omission, and SNIA SSS PTS v2.0.2.
  - *Lab: Capture CPU & Off-CPU Flame Graphs at high IOPS; write a bpftrace live NVMe latency histogram; feed nightly synthetic metrics into Apache Otava to catch an injected 3% latency regression.*
- **Phase 2 Capstone: Zero-Bottleneck Micro-Validator Prototype**
  - *Study:* Deliverable: Open-loop rate-controlled micro-validator (free of Coordinated Omission) saturating Gen5/Gen6 via io_uring_cmd or SPDK, verifying ISA-L CRC at line rate, asserting SNIA PTS convergence, and publishing p50/p99/p99.99/max histograms to Otava CI.
  - *Core software asset directly reusable on daily SanDisk validation benches.*

## Phase 3 (Weeks 13–18): Enterprise Qualification, Telemetry, Power, Thermals & Security

Master the exact conformance, telemetry, resiliency, power/cooling, fuzzing, formal-methods, and security gates required by hyperscalers.

- **W13–W14: OCP 2.6 Telemetry, SMART & Vendor Log Decoding**
  - *Study:* OCP 2.6 logs (C0h, C1h, C2h, C4h, C6h, C9h, Latency Monitor), NVMe 07h/08h DA1–4, PEL 0Dh, and nvme-cli ocp/sndk/wdc plugins.
  - *Lab: Write a Python decoder over libnvme verifying OCP UUID (CNS 17h), parsing C0h (GUID + version 0005h/0006h), capturing 07h DA1 under load (<5 ms max I/O impact), and decoding binary logs via C9h.*
- **W15–W16: Fault Injection, PLP, Power Governance & Liquid Cooling**
  - *Study:* Quarch PPM/PAM fault profiles, HW vs FW PLP, OCP C0h Error Injection (21 modes) & CRASH-5/EREC-2, NVMe 2.3 PLC, OCP PCM-1/PCM-2, and DTC vs immersion cooling.
  - *Lab: Automate error-injection & controller-reset tests (OakGate/SANBlaze/Quarch or QEMU) checking <2s watchdog, panic counts, and zero torn writes; script a power-cap sweep plotting IOPS/W & throttling curves.*
- **W17–W18: Storage Security, Fuzzing & Formal Methods**
  - *Study:* TCG Core 2.01 / Opal 2.30, OCP S.A.F.E. / L.O.C.K. v1.1, DMTF SPDM 1.4, FIPS 140-3, AFL++/nvme_fuzz, and Learn TLA+.
  - *Lab: Run Opal 2.30 locking/unlocking/crypto-erase flows (sedutil/TCG tests), execute spdk/test/app/fuzz/nvme_fuzz against QEMU, and model NVMe queue invariants across an async controller reset in TLA+/PlusCal.*
- **Phase 3 Capstone: Automated OCP 2.6 Resiliency & Telemetry Audit Module**
  - *Study:* Deliverable: Triggers fault/reset injection, measures DA1 telemetry latency impact, validates C0h/C1h and Latency Monitor counters, and flags any spec violation or silent data corruption.
  - *End-to-end automated hyperscale qualification gate.*

## Phase 4 (Weeks 19–24): Frontier AI Workloads, Next-Gen Memory/Fabrics & Gaming

Elevate tooling from single-drive microbenchmarks to realistic customer deployments across AI clusters, tiered memory fabrics, cloud DBs, and gaming rigs.

- **W19–W20: AI Training, Checkpointing, GDS & KV-Cache Offloading**
  - *Study:* MLPerf Storage v3.0 (mlpstorage), NVIDIA GDS (cuFile/cuObject, gdsio), and LMCache / Mooncake / Dynamo KVBM offloading.
  - *Lab: Run mlpstorage training & KV-cache benchmarks against local NVMe (comparing Python odirect vs Rust/Tokio direct backends) and correlate WAF & p99 latency against simulated >90% GPU utilization.*
- **W21–W22: HBM4 vs. HBF, CXL 3.x/4.0, DRAM & Tiering**
  - *Study:* JEDEC HBM4 (JESD270-4A) & DDR5 (JESD79-5D), SanDisk HBF specs & Hot Chips 2026 boundaries, CXL 3.x/4.0, and Linux memory_tierN / DAMON.
  - *Lab: Model a two-tier memory/storage hierarchy (NUMA/CXL emulation or CacheLib with FDP on NVMe/QEMU) and measure throughput/TTFT degradation as working sets spill from DRAM to NVMe.*
- **W23–W24: Enterprise DBs (FDP), NVMe-oF, DirectStorage & Computational Storage**
  - *Study:* Database Internals, RocksDB + FDP (UFROP/TorFS), NVMe/TCP (-i, kTLS 1.3) vs RoCEv2, Microsoft DirectStorage, and NVMe CP / SNIA CS-APM.
  - *Lab: Benchmark RocksDB db_bench with and without FDP (WAF & p99.9); deploy loopback NVMe/TCP + kTLS 1.3 sweeping -i queues; run Microsoft GpuDecompressionBenchmark on a Windows rig.*
- **Phase 4 Capstone: Workload-Realistic Validation Profile Pack**
  - *Study:* Deliverable: Translates AI (KV-cache & checkpointing), LSM-database (FDP multi-stream), NVMe/TCP fabric, and DirectStorage gaming I/O distributions into repeatable steady-state validation scripts with automated WAF, QoS, and Perf/W scorecards.
  - *Mirrors revenue-driving customer deployments end-to-end.*

## Execution Rules of Thumb for Maximum Efficiency

1. **Read Specifications Backward from Failures:** Never read the 784-page NVMe Base 2.3 spec cover-to-cover. Learn the architectural overview once, then use specs as precision lookup tables whenever a compliance test fails, a firmware quirk surfaces, or you build a new log decoder.
2. **Always Prove the Host Is Innocent First:** Before opening a performance defect against SanDisk firmware, verify your harness against a baseline, inspect per-core CPU saturation (`perf`, `top`, `vmstat`, `iostat`), confirm `io_uring_cmd` or SPDK polling is active, check Linux PCIe AER counters for silent link error storms, and verify your generator is free of Coordinated Omission.
3. **Shift Left with QEMU, `libnvme`, and Mock Suites:** Developing parsers, state machines, and OCP log validators against QEMU NVMe and unit/mock harnesses (mirroring `nvme-cli`'s mock test infrastructure) lets you iterate far faster than waiting for scarce PCIe Gen6 or liquid-cooled hardware benches.
4. **Track Spec Deltas Quarterly:** Once you master your active baseline (NVMe 2.3, OCP 2.6, TCG Opal 2.30), spend 2–3 hours per quarter scanning release notes from `linux-nvme/nvme-cli`, `spdk/spdk`, OCP Storage, USENIX FAST, and FMS so upcoming transitions (NVMe 2.4, OCP 2.7, OCP L.O.C.K. v1.1, BiCS10, HBF) integrate smoothly.
