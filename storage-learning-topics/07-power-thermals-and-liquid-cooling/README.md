# 07. Power Efficiency, Thermals & Liquid Cooling (Simplified)

> **Interactive Lesson & Power-Spike Simulator:** [Open Subject 07 HTML](https://guymdls.github.io/learning-topics/storage-learning-topics/07-power-thermals-and-liquid-cooling/)

## The 30-Second Mental Model
- **Hidden Micro-Spikes (PCM-1 vs. PCM-2):** When 16+ NAND dies program simultaneously, power surges for just **100 microseconds**. A slow 1-second meter (**PCM-1**) averages it away, so OCP 2.6 added **PCM-2** (`≤4 µs` sampling) to make sure 24 drives don't trip a server power supply together!
- **Why SSDs Are Going Liquid-Cooled:** Dense PCIe Gen5/Gen6 E3.S/E3.L drives burn **25W–70W** crammed next to hot GPUs. **Direct-to-Chip (DTC) warm-water cold plates (40–45°C)** lead data-center adoption (~55% market share) over messy dielectric immersion tanks (<10%).

## Curated Sources & Reference Library

| Source / Resource | Format | Link / Identifier | How to Use It |
| :--- | :--- | :--- | :--- |
| **Direct-to-Chip Liquid Cooling Developer Guide (2026) & Solid-State Cooling Brief** | Clear Visual Guides | [build.inc DTC Guide](https://build.inc/insights/direct-to-chip-liquid-cooling-developer-guide) · [Patsnap Cooling 2026](https://eureka.patsnap.com/resources/blog/rd-blog/solid-state-cooling-technology-2026-patsnap-eureka/) | Start here! Plain-English comparison of warm-water cold plates vs immersion tanks, SFF-TA-1008 enclosures, and TEC cooling. |
| **OCP 2.6 Power Measurement Thread (PCM-1 vs. PCM-2)** | Short Engineer Thread | [OCP-Storage PCM-1/2 Thread](https://ocp-all.groups.io/g/OCP-Storage/topic/ocp_datacenter_nvme_ssd_v2_6/109456924) | Explains in 5 minutes why 100 µs peak power sampling (≤4 µs interval) was added to OCP 2.6. |
| **OCP Cooling Environments Project & Windows NVMe Power Guidelines** | Standards & OS Docs | [OCP Cooling Project](https://www.opencompute.org/projects/cooling-environments/) · [Microsoft NVMe Power Docs](https://learn.microsoft.com/en-us/windows-hardware/design/component-guidelines/power-management-for-storage-hardware-devices-nvme) | Reference for rack liquid-cooling specs and Windows client APST sleep transitions. |

