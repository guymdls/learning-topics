# Storage & Validation Engineering Mastery Hub (Simplified)

> **Interactive Course Hub:** https://guymdls.github.io/learning-topics/storage-learning-topics/

Designed for a **SanDisk Validation Tools & Performance Optimization Engineer**. Every subject starts with a **plain-English mental model**, a **visual diagram + interactive lab**, and **3 quick quiz questions**, while keeping full NVMe 2.3/2.4, OCP 2.6/2.7, PCIe 6.0, BiCS8/9/10, and HBF specifications one click away.

## Your Two Core Missions

1. **Prove Correctness Under Stress:** Make sure SanDisk SSDs never corrupt data or hang during power loss, firmware faults, heat, or security attacks.
2. **Never Let the Host Be the Bottleneck:** Modern PCIe Gen6 SSDs reach **28 GB/s and 5.5–6.8M IOPS** (vendor-reported). Your test software must use kernel bypass, lock-free queues, and SIMD CRC instructions so the host CPU doesn't slow down the SSD you're testing.

## Recommended Learning Order (4 Phases)

- **Phase 1 — Foundations (Weeks 1–6):** [01. NVMe & OCP Protocols](./01-standards-and-protocols/) → [02. PCIe 6.0 & Signal Integrity](./02-pcie-interconnects-and-si/) → [03. 3D NAND & SanDisk SSDs](./03-flash-physics-and-sandisk-platforms/)
- **Phase 2 — Host Speed & Measurement (Weeks 7–12):** [04. OS I/O, SPDK & Concurrency](./04-architecture-os-and-concurrency/) → [05. Benchmarking & Telemetry](./05-performance-telemetry-and-observability/)
- **Phase 3 — Breaking Drives Safely (Weeks 13–18):** [06. Fault Injection, PLP & TLA+](./06-validation-fault-injection-and-formal-methods/) → [07. Power & Liquid Cooling](./07-power-thermals-and-liquid-cooling/)
- **Phase 4 — Real-World Systems (Weeks 19–24):** [08. AI KV-Cache, CXL & Security](./08-workloads-tiering-fabrics-and-security/)
- **Track Your Schedule:** [09. 24-Week Study Roadmap](./09-24-week-mastery-syllabus/) · **Visual Sandbox:** [102-Concept NVMe Tutor](./nvme_systems_tutor.html)
