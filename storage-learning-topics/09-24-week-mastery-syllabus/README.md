# 09. 24-Week Study Roadmap (Simplified & Practical)

> **Interactive Progress Tracker:** [Open Syllabus HTML](https://guymdls.github.io/learning-topics/storage-learning-topics/09-24-week-mastery-syllabus/)

Paced comfortably at **8–10 hours/week** across 4 phases so you build real muscle memory without burnout.

## Phase 1 (Weeks 1–6): Hardware, Bus & OS Foundations
Goal: Trace a single 4KB read from your C/Python app all the way into a BiCS8/BiCS10 NAND cell and back.

- **Weeks 1–2: NVMe Packets & PCIe 6.0 Basics** — Read Subject 01 & 02 in Simple View + s10rage packet guide + Safeguard PCIe 6.0 visual post. | *Mini-Lab: Boot a local QEMU VM with virtual NVMe (ocp=on, fdp=on); run lspci -vv, nvme id-ctrl, and watch live commands.*
- **Weeks 3–4: 3D NAND Physics & SanDisk SSDs** — Watch Onur Mutlu's Flash/SSD lectures + read Subject 03 + KIOXIA BiCS8 & SanDisk UltraQLC briefs. | *Mini-Lab: Fill a test SSD (or emulator) from empty to 2× capacity with fio; plot the exact moment the SLC cache runs out and compute WAF.*
- **Weeks 5–6: CPU Caches, NUMA & Linux Storage Stack** — Read OSTEP Ch. 44–45 + Subject 04 + trace Linux nvme_queue_rq. | *Mini-Lab: Measure 4K random IOPS when pinned to the SSD's local NUMA CPU vs the remote CPU socket using numactl.*
- **Phase 1 Capstone: Automatic Server Health Checker** — Build a 1-command Python/bash pre-flight script that verifies BIOS C-states, iommu=pt, PCIe speed/width, and NUMA affinity before any test. | *Outcome: You never waste a day benchmarking a misconfigured server!*

## Phase 2 (Weeks 7–12): Writing Fast Tools & Honest Benchmarks
Goal: Make your host C++/Rust/Python tools fast enough for 6M+ IOPS Gen6 drives and statistically bulletproof.

- **Weeks 7–8: Lock-Free Rings & Cache Alignment** — Read Mara Bos Rust Atomics & Locks (Ch. 1–4) — applies to C++ too! | *Mini-Lab: Build a lock-free SPSC queue; trigger 64-byte false sharing on purpose, spot it in perf, and fix it with alignas(64).*
- **Weeks 9–10: io_uring_cmd, SPDK & Intel ISA-L CRCs** — Explore liburing / xNVMe + SPDK spdk_nvme_perf + Intel ISA-L SIMD CRC functions. | *Mini-Lab: Send raw NVMe reads over /dev/ng0n1 with io_uring_cmd + ISA-L CRC check; compare CPU usage against normal fio.*
- **Weeks 11–12: Flame Graphs, Steady-State Math & Otava CI** — Read Subject 05 + 'Everything You Know About Latency Is Wrong'. | *Mini-Lab: Capture a Flame Graph + bpftrace NVMe latency histogram; feed 30 test runs into Apache Otava to auto-detect a 3% slowdown.*
- **Phase 2 Capstone: Zero-Bottleneck Micro-Validator** — Ship an open-loop rate-paced NVMe validator with ISA-L CRC checks, automatic SNIA steady-state detection, and Otava CI output. | *Outcome: A portfolio-grade high-speed validation engine.*

## Phase 3 (Weeks 13–18): Breaking Drives, Logs, Power & Cooling
Goal: Master the exact OCP 2.6, power-loss, thermal, fuzzing, and security checks cloud customers demand.

- **Weeks 13–14: OCP C0h–C9h & SanDisk Log Decoders** — Inspect nvme-cli plugins/ocp/ocp-nvme.c & plugins/wdc/wdc-nvme.c. | *Mini-Lab: Write a Python libnvme script that checks Identify CNS 17h OCP UUID, parses C0h, verifies <5 ms DA1 telemetry lag, and decodes C9h.*
- **Weeks 15–16: Power Cuts (PLP), Error Injection & Cooling** — Read Subject 06 & 07 + OCP PCM-1/PCM-2 power thread. | *Mini-Lab: Script OCP C0h fault/reset loops checking <2s recovery & zero torn writes; sweep NVMe 2.3 Power Limit caps plotting IOPS/Watt.*
- **Weeks 17–18: Opal Security, Fuzzing & TLA+ Models** — Walk through learntla.com + sedutil Opal flows + SPDK nvme_fuzz. | *Mini-Lab: Run SPDK nvme_fuzz against QEMU NVMe, and write a 40-line PlusCal/TLA+ model proving queue safety across an async reset.*
- **Phase 3 Capstone: Automated OCP 2.6 Resiliency Suite** — Combine fault injection, DA1 latency check, and C0h/C1h log assertions into one automated pass/fail test module. | *Outcome: Hyperscale qualification automation ready for real silicon.*

## Phase 4 (Weeks 19–24): AI KV-Cache, CXL, Databases & Gaming
Goal: Validate drives under the exact AI, cloud database, fabric, and gaming workloads customers buy SanDisk SSDs for.

- **Weeks 19–20: AI Training & LLM KV-Cache Offloading** — Read Subject 08 Tab A + MLPerf Storage v3.0 (mlpstorage) & LMCache docs. | *Mini-Lab: Run mlpstorage training & KV-cache workloads on an NVMe SSD; measure WAF and p99 read latency while keeping simulated GPU >90% busy.*
- **Weeks 21–22: HBM4 vs HBF, CXL Tiering & CacheLib FDP** — Read SanDisk HBF blog + Hot Chips 2026 analysis + Linux CXL tiering guide. | *Mini-Lab: Test DRAM-to-NVMe spillover with CacheLib (FDP enabled) or NUMA/CXL emulation and measure latency smoothness.*
- **Weeks 23–24: RocksDB+FDP, NVMe/TCP & DirectStorage** — Read Subject 08 Tab B + UFROP + Lightbits NVMe/TCP guide. | *Mini-Lab: Compare RocksDB WAF with & without FDP; run loopback NVMe/TCP + kTLS sweeping -i queues; run DirectStorage GDeflate benchmark.*
- **Phase 4 Capstone: Real-World Customer Workload Pack** — Package AI KV-cache, FDP database, NVMe/TCP, and gaming profiles into repeatable steady-state scripts with WAF & Perf/W scorecards. | *Outcome: Full-stack SanDisk Validation & Performance mastery!*
