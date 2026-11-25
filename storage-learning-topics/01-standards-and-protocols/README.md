# Pillar 01: Industry Standards & Protocol Architecture

> **Interactive Module:** [Open Pillar 01 HTML](https://guymdls.github.io/learning-topics/storage-learning-topics/01-standards-and-protocols/) · [Local `index.html`](./index.html)

**Mapped Original Topics:** Industry spec (NVMe, OCP, TCP/TCG)
**Added Extensions:** NVMe-MI 2.1/2.2, MCTP/SMBus/I3C/PCIe VDM, SNIA SSS PTS 2.0.2, NVMe 2.4 & OCP 2.7 deltas.

## Wire-Level Foundations

- **Active Specification Stack:** NVMe Base 2.3, NVM Command Set 1.2, PCIe Transport 1.3, OCP Datacenter NVMe SSD 2.6, and TCG Core 2.01 / Opal 2.30.
- **64-byte Submission Queue Entry (SQE):** CDW0–CDW15, strictly **little-endian** (unlike big-endian SCSI/SAS).
  - `CDW0`: Opcode, FUSE, PSDT (PRP vs. SGL scatter-gather DMA pointer mode), Command Identifier (CID).
  - `NLB` (Number of Logical Blocks): **0-based** (`0` = 1 logical block).
- **16-byte Completion Queue Entry (CQE):** DW0–DW3 carrying SQ Head Pointer, SQ ID, CID, Status Field, and the **Phase Tag (`P`) bit** used for lockless completion polling.

## Four Major Enterprise Protocol Shifts (2025–2026)

1. **NVMe Flexible Data Placement (FDP, TP4146):** Ratified in NVMe 2.1 and deployed broadly in 2026 SSDs. Organizes flash into Reclaim Groups (RGs) and Reclaim Units (RUs) addressed via Reclaim Unit Handles (RUHs) and Placement Identifiers (PIDs) in `CDW12` (`Directive Type = Data Placement`). Retains conventional random-LBA block semantics while letting hosts isolate write lifetimes to drive WAF near `1.0`.
2. **NVMe 2.3 (Ratified July/August 2025 — Active Baseline):** Rapid Path Failure Recovery (RPFR), Power Limit Config (PLC, publicly presented by SanDisk engineering), Self-reported Drive Power (SDP), Sanitize Per Namespace (SPN), and Configurable Device Personality (CDP).
3. **NVMe 2.4 (Published August 2026 — Forward Roadmap):** Post-Quantum Cryptography (PQC), PCIe Exported NVM Subsystem Migration, hardware Rate Limiting (controller-enforced BW/IOPS QoS caps), Voltage Monitoring (configurable undervoltage/overvoltage alerts & history), and Restore Manufacturing Default Settings.
4. **OCP Datacenter NVMe SSD 2.6 & 2.7:** Unifies hyperscale requirements (Meta, Microsoft, HPE, Dell): 21 Error Injection types (`Set Features C0h`), `<2s` firmware watchdog (`CRASH-5`), autonomous panic recovery preferring NVMe Controller Reset (`EREC-2`), `<1 ms` typical (`<5 ms` max) I/O latency impact during 32 KiB Telemetry Data Area 1 retrieval, Virtual FIFOs (`>16` FIFOs across DA1/DA2), mandatory OCP S.A.F.E. firmware audits (`SEC-15`), and peak/average power telemetry. **OCP 2.7** (late 2025) fixed two 2.6 offset errata and added FIPS 140 status to Device Capability Log `C4h`. Out-of-band management runs via **NVMe-MI 2.1/2.2** over MCTP/SMBus/I2C, I3C, and PCIe VDM.

## Curated Sources & Reference Library

| Source / Resource | Format | Link / Identifier | How to Use It |
| :--- | :--- | :--- | :--- |
| **NVM Express Specification Library (Base 2.3/2.4, NVM CS 1.2/1.3, PCIe 1.3/1.4, TCP 1.2/1.3, NVMe-MI 2.1/2.2)** | Primary Spec | [nvmexpress.org/specifications](https://nvmexpress.org/specifications/) | Authoritative lookup for SQE/CQE bit fields, feature IDs, log pages, and reset state machines. |
| **OCP Datacenter NVMe SSD Specification v2.6 (& OCP Storage Project Hub for v2.7)** | Primary Spec | [OCP SSD v2.6 PDF](https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-6-2-pdf) · [OCP Storage Project](https://www.opencompute.org/projects/storage/) | Map every requirement ID (SLOG-*, ERRIE-*, CRASH-5, EREC-2, PCM-1/2, SEC-15) directly to automated test assertions. |
| **Storage Protocol Specifications Deep Dive (s10rage)** | Technical Reference | [s10rage NVMe / NVMe-oF](https://s10rage.com/docs/interfaces-and-protocols/storage-protocol-specifications-nvme-nvmeof) | Rapid Dword-by-Dword reference for NVMe SQE/CQE structures and NVMe/TCP PDU headers. |
| **NVMe Power Limit Configuration (SanDisk Presentation)** | Technical Video | [YouTube: NVMe PLC](https://www.youtube.com/watch?v=gZsZrrXHHVM) | Review SanDisk's framing of NVMe 2.3 Power Limit Config for AI power governance. |
| **SNIA Solid State Storage PTS v2.0.1 / v2.0.2** | Primary Spec | [SNIA SSS PTS PDF](https://www.snia.org/sites/default/files/technical_work/PTS/SSS_PTS_2.0.1.pdf) | Standardized methodology for drive purging, preconditioning, and steady-state convergence. |

