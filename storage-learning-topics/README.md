# SanDisk Validation Tools & Performance Optimization Engineering Knowledge Hub

> **Interactive Hub (GitHub Pages):** https://guymdls.github.io/learning-topics/storage-learning-topics/

This directory organizes an end-to-end **Engineering Knowledge Package and 24-Week Mastery Syllabus** tailored for a **SanDisk Validation Tools and Performance Optimization Engineer**, alongside the [102-Concept Interactive NVMe Visual Tutor](./nvme_systems_tutor.html).

## Active Specification Baseline & Late-2026 Horizon

- **Active Team Baseline:** NVMe Base 2.3, NVM Command Set 1.2, PCIe Transport 1.3, TCG Storage Architecture Core 2.01, TCG Opal 2.30, and OCP Datacenter NVMe SSD 2.6.
- **Late-2026 Roadmap:** NVMe 2.4 (ratified August 2026), OCP 2.7, PCIe 6.0 enterprise SSDs (vendor-reported up to 28 GB/s and 5.5–6.8M IOPS), 332-layer BiCS10 NAND, and High Bandwidth Flash (HBF) for AI inference.
- **Dual Engineering Mandate:** Prove drive correctness and security under severe fault/power/workload stress while optimizing host validation software so it never bottlenecks Gen5/Gen6 SSDs.

## Five-Layer Vertical Stack + Two Orthogonal Control Planes

| Layer / Plane | Scope |
| :--- | :--- |
| **L5. Workloads & Benchmarks** | AI training / KV cache, DirectStorage gaming, enterprise databases |
| **L4. Host Tooling & OS Stack** | SPDK / `io_uring_cmd`, Linux `blk-mq` / Windows StorNVMe, SIMD integrity verifiers & fuzzers |
| **L3. Interconnects & Fabrics** | PCIe 5.0/6.0 FLIT, NVMe-oF TCP/RoCEv2, CXL & MCTP sidebands |
| **L2. SSD Controller & Firmware** | NVMe 2.3 / OCP 2.6, FTL / FDP / DRAM cache, TCG Opal 2.30 / PLP |
| **L1. Media & Thermal Envelope** | BiCS8 / BiCS10 CBA NAND, High Bandwidth Flash (HBF), air & direct liquid cold-plate cooling |
| **Cross-Cutting Plane A: Observability & Profiling** | `perf`/eBPF traces, OCP SMART/telemetry decoding, Apache Otava CI change-point detection |
| **Cross-Cutting Plane B: Fault & Stress Injection** | Quarch power/PLP cycling, PCIe AER & OCP `C0h` error injection, formal TLA+ state-machine models |

## Eight Critical Validation Domains Added

1. **Disambiguating "TCP" into Both TCG Security & NVMe/TCP Fabrics** (TCG Core 2.01 / Opal 2.30 vs. NVMe/TCP Transport 1.2/1.3 & RoCEv2).
2. **Validator-as-a-System Engineering** (eliminating host CPU bottlenecks via Intel ISA-L SIMD, lock-free queues, NUMA pinning, zero-copy DMA at Gen6 rates).
3. **Out-of-Band Management & Sideband Protocols** (NVMe-MI 2.1/2.2, MCTP, SMBus/I2C, I3C, PCIe VDM, SPDM auth).
4. **Formal Methods & Protocol State-Machine Modeling** (TLA+ / PlusCal specs, safety/liveness invariants, TLC counterexample traces).
5. **Statistical Performance Rigor & Continuous Benchmarking CI** (SNIA SSS PTS steady-state convergence, Coordinated Omission, p99.99/max, Apache Otava / Hunter change-point detection).
6. **Form Factors, Connectors & Signal Integrity Diagnostics** (EDSFF E1.S/E1.L/E3.S/E3.L, SFF-TA-1002, retimers, `nvmeadm sandisk/pci-eye`).
7. **Hardware-in-the-Loop (HIL) Equipment & Shift-Left Virtualization** (OakGate SVF/Enduro, SANBlaze SBExpress, Quarch PPM/PAM, Teledyne LeCroy Summit, QEMU/FEMU).
8. **AI-Assisted Engineering & Verification Governance** (applying approved AI tools to scripting/log analysis while rigorously verifying outputs and enforcing IP/security boundaries).

## Per-Subject Directory Map

| Pillar | Folder | Mapped Original Topics | Interactive HTML |
| :--- | :--- | :--- | :--- |
| **01** | [`01-standards-and-protocols/`](./01-standards-and-protocols/) | Industry spec (NVMe, OCP, TCP/TCG) | [`index.html`](./01-standards-and-protocols/index.html) |
| **02** | [`02-pcie-interconnects-and-si/`](./02-pcie-interconnects-and-si/) | PCIe | [`index.html`](./02-pcie-interconnects-and-si/index.html) |
| **03** | [`03-flash-physics-and-sandisk-platforms/`](./03-flash-physics-and-sandisk-platforms/) | Flash technology, SSD (Enterprise & AI), DRAM | [`index.html`](./03-flash-physics-and-sandisk-platforms/index.html) |
| **04** | [`04-architecture-os-and-concurrency/`](./04-architecture-os-and-concurrency/) | Computer architecture, OS, System programming & concurrency | [`index.html`](./04-architecture-os-and-concurrency/index.html) |
| **05** | [`05-performance-telemetry-and-observability/`](./05-performance-telemetry-and-observability/) | Performance, Telemetry/SMART/Log page | [`index.html`](./05-performance-telemetry-and-observability/index.html) |
| **06** | [`06-validation-fault-injection-and-formal-methods/`](./06-validation-fault-injection-and-formal-methods/) | Testing | [`index.html`](./06-validation-fault-injection-and-formal-methods/index.html) |
| **07** | [`07-power-thermals-and-liquid-cooling/`](./07-power-thermals-and-liquid-cooling/) | Power efficiency, Liquid cooling | [`index.html`](./07-power-thermals-and-liquid-cooling/index.html) |
| **08** | [`08-workloads-tiering-fabrics-and-security/`](./08-workloads-tiering-fabrics-and-security/) | AI, Gaming, HBM, Tiering, CXL, Computational storage, Storage, DC apps, Security | [`index.html`](./08-workloads-tiering-fabrics-and-security/index.html) |
| **09** | [`09-24-week-mastery-syllabus/`](./09-24-week-mastery-syllabus/) | 24-Week (6-Month) Hands-On Learning Syllabus & Rules of Thumb | [`index.html`](./09-24-week-mastery-syllabus/index.html) |
| **Tutor** | [`nvme_systems_tutor.html`](./nvme_systems_tutor.html) | 102-Concept Interactive Canvas Visual Tutor & Diagnostic Quiz | [`nvme_systems_tutor.html`](./nvme_systems_tutor.html) |
