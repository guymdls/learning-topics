# 01. Industry Standards & Protocol Architecture (Simplified)

> **Interactive Lesson & Lab:** [Open Subject 01 HTML](https://guymdls.github.io/learning-topics/storage-learning-topics/01-standards-and-protocols/)

## The 30-Second Mental Model
- **NVMe** is the **language** the host computer speaks to the SSD: the host drops a **64-byte work order (SQE)** into a circular mailbox in RAM, rings a doorbell, and reads back a **16-byte receipt (CQE)**.
- **OCP Datacenter NVMe SSD 2.6/2.7** is the **strict hyperscaler rulebook** (written by Meta, Microsoft, HPE, Dell) sitting *on top* of NVMe so cloud data centers know exactly how every SSD reports health, handles crashes, and injects test errors.
- **NVMe-MI** is the **side door** allowing a server's baseboard controller (BMC) to check SSD temperature and health over a slow side wire (SMBus/I3C) even when the main OS is frozen.

## Curated Sources & Reference Library

| Source / Resource | Format | Link / Identifier | How to Use It |
| :--- | :--- | :--- | :--- |
| **Storage Protocol Specifications Deep Dive (s10rage)** | Visual Guide | [s10rage NVMe / NVMe-oF](https://s10rage.com/docs/interfaces-and-protocols/storage-protocol-specifications-nvme-nvmeof) | Best beginner-friendly Dword-by-Dword visual walkthrough of NVMe SQE/CQE packets before opening the 784-page spec. |
| **NVMe Power Limit Configuration (SanDisk Presentation)** | Short Video | [YouTube: NVMe PLC](https://www.youtube.com/watch?v=gZsZrrXHHVM) | Clear presentation by SanDisk engineers showing how NVMe 2.3 features solve real AI data-center problems. |
| **NVM Express Specification Library (Base 2.3/2.4, NVM CS 1.2/1.3, PCIe 1.3/1.4, TCP 1.2/1.3, NVMe-MI 2.1/2.2)** | Primary Spec | [nvmexpress.org/specifications](https://nvmexpress.org/specifications/) | Use as a lookup dictionary (never read cover-to-cover!) for exact bit fields, status codes, and reset rules. |
| **OCP Datacenter NVMe SSD Specification v2.6 (& OCP Storage Hub for v2.7)** | Primary Spec | [OCP SSD v2.6 PDF](https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-6-2-pdf) · [OCP Storage Project](https://www.opencompute.org/projects/storage/) | Hyperscale checklist from Meta/Microsoft/Google/Dell: maps IDs like CRASH-5 and EREC-2 directly to pass/fail tests. |
| **SNIA Solid State Storage PTS v2.0.1 / v2.0.2** | Primary Spec | [SNIA SSS PTS PDF](https://www.snia.org/sites/default/files/technical_work/PTS/SSS_PTS_2.0.1.pdf) | Standard recipe for wiping a drive and preconditioning it to steady state before measuring speed. |

