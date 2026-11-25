# Pillar 07: Power Efficiency, Thermal Governance & Liquid Cooling

> **Interactive Module:** [Open Pillar 07 HTML](https://guymdls.github.io/learning-topics/storage-learning-topics/07-power-thermals-and-liquid-cooling/) · [Local `index.html`](./index.html)

**Mapped Original Topics:** Power efficiency, Liquid cooling.

## Power Governance & OCP 2.6 PCM-1 vs. PCM-2

- **Idle & Link Scaling:** NVMe APST & PCIe L1 low-power states (down to **5 mW idle** on client Gen5 drives like SanDisk SN8100) plus **PCIe 6.0 L0p** partial-width lane scaling.
- **Active Power Capping & Telemetry:** **NVMe 2.3 Power Limit Config (PLC)** & **Self-reported Drive Power (SDP)**, **NVMe 2.4 Voltage Monitoring**, and **SanDisk UltraQLC Dynamic Frequency Scaling (DFS)** (vendor-projected **+10% performance** at a given power level).
- **OCP 2.6 Power Measurement Rules:**
  - **PCM-1:** 1-second maximum average power.
  - **PCM-2:** Peak power measured over a **100 µs window** at a sampling interval of **≤4 µs**, explicitly designed to catch brief NAND program/erase current spikes invisible to 1-second averaging.

## Dense EDSFF Thermals & Liquid Cooling Architectures

- **EDSFF Thermal Envelopes:** `20W` (E1.S), `25–40W` (E3.S), up to `40–70W` (thick E3.L)—pushing Gen5/Gen6 controllers beyond passive air cooling in dense AI racks.
- **Single-Phase Direct-to-Chip (DTC) Cold Plates (~55% 2026 liquid cooling market estimate):** Runs warm supply water at **40–45°C** for facility **PUE 1.05–1.20** while fitting existing server cabinets. Shipping DLC SSDs include KIOXIA `CM9-DLC` E3.S, KIOXIA `NX1` E1.S (OCP 2.6 + FDP), and Micron `9650` Gen6 E1.S/E3.S.
- **Immersion Cooling (<10% market estimate):** Dielectric tanks reaching **pPUE ~1.01**, gated by tank infrastructure, fluid-compatibility qualification, and wet serviceability.
- **Next-Gen Thermal Governance:** SNIA **SFF-TA-1008** hot-swappable liquid-cooled enclosures, **LSTM/ML predictive thermal control**, and firmware-native **thermoelectric cooler (TEC)** actuation (including Western Digital dual-threshold TEC patents) to avoid reactive throttling drops.

## Curated Sources & Reference Library

| Source / Resource | Format | Link / Identifier | How to Use It |
| :--- | :--- | :--- | :--- |
| **Direct-to-Chip Liquid Cooling Developer Guide (2026)** | Technical Analysis | [build.inc DTC Guide](https://build.inc/insights/direct-to-chip-liquid-cooling-developer-guide) | Grounding on DTC vs immersion trade-offs, 40–45°C warm-water loops, PUE, and chassis integration. |
| **OCP Cooling Environments Project** | Standards Hub | [OCP Cooling Environments](https://www.opencompute.org/projects/cooling-environments/) | Track OCP guidance for cold plates, immersion fluid compatibility, and rack thermal boundaries. |
| **Solid-State Cooling Patent & Architecture Analysis (2026)** | R&D Brief | [Patsnap Solid-State Cooling 2026](https://eureka.patsnap.com/resources/blog/rd-blog/solid-state-cooling-technology-2026-patsnap-eureka/) | Understand SFF-TA-1008 liquid-cooled SSD enclosures, TEC firmware actuation, and ML predictive thermal control. |
| **OCP 2.6 Power Measurement Thread (PCM-1 vs. PCM-2)** | OCP Storage List | [OCP-Storage PCM-1/2 Thread](https://ocp-all.groups.io/g/OCP-Storage/topic/ocp_datacenter_nvme_ssd_v2_6/109456924) | Practical clarification of 100 µs / ≤4 µs peak-power validation methodology. |
| **Windows NVMe Power Management Guidelines** | Microsoft Docs | [Microsoft NVMe Power Docs](https://learn.microsoft.com/en-us/windows-hardware/design/component-guidelines/power-management-for-storage-hardware-devices-nvme) | Reference for APST and StorNVMe idle/active state transitions on client SSDs. |

