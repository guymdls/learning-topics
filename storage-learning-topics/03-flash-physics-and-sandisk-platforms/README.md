# 03. Flash Physics, SSD Architecture & SanDisk Platforms (Simplified)

> **Interactive Lesson & Simulator:** [Open Subject 03 HTML](https://guymdls.github.io/learning-topics/storage-learning-topics/03-flash-physics-and-sandisk-platforms/)

## The 30-Second Mental Model
- **Two Weird Rules of NAND Flash:** (1) You **cannot overwrite** existing data — you must write elsewhere and later erase giant blocks (**Garbage Collection**). (2) Flash cells store bits as tiny clouds of trapped electrons that **slowly leak** with wear and heat, forcing slower multi-pass error recovery (**LDPC Read-Retry**).
- **SanDisk's Secret Weapon (CBA):** **CMOS directly Bonded to Array** bakes fast CMOS logic on one wafer and 218–332 layers of 3D flash on a second wafer, then bonds them together — powering **BiCS8, BiCS9, BiCS10**, **SN861**, **256TB UltraQLC**, and **WD_BLACK SN8100**.

## Curated Sources & Reference Library

| Source / Resource | Format | Link / Identifier | How to Use It |
| :--- | :--- | :--- | :--- |
| **ETH Zürich: Flash Memory & Modern Storage Systems — Prof. Onur Mutlu** | Free Video Lectures | [Lecture Videos](https://people.inf.ethz.ch/omutlu/lecture-videos.html) · [YouTube Channel](https://www.youtube.com/onurmutlulectures) | Start here! Watch Fall 2025/2026 Flash/SSD lectures — visual, crystal-clear teaching on 3D NAND, FTLs, and LDPC. |
| **KIOXIA BiCS8 Technical Brief & SanDisk UltraQLC / BiCS9–10 Briefs** | Short Tech Briefs | [KIOXIA BiCS8 Brief](https://americas.kioxia.com/en-ca/business/resources/tech-brief/bics8-ssd.html) · [SanDisk UltraQLC FMS 2025](https://www.sandisk.com/company/newsroom/press-releases/2025/2025-08-05-sandisk-showcases-ultraqlc-technology-platform-with-milestone-enterprise-ssd-capacity-at-fms-2025) · [BiCS9 / BiCS10 / HBF Roadmap](https://convergedigest.com/sandisk-bics9-bics10-hbf-nand-technology-roadmap/) | Quick 10-minute reads mapping directly to the SanDisk drives sitting on your lab bench. |
| **Inside Solid State Drives (SSDs), 2nd Ed. (2018) — Micheloni, Marelli, Eshghi** | Reference Textbook | `ISBN 978-981-13-0599-3 (Springer)` | Deep reference when you need exact LDPC math, voltage-shift sensing, and data randomization details. |
| **USENIX FAST '19: Intra-SSD Redundancy & Flash Error Models (Kim et al.)** | Research Paper | [FAST '19 Paper PDF](https://www.usenix.org/system/files/fast19-kim-bryan.pdf) | Shows how background scrubbing and read-disturb cause real-world tail-latency spikes. |

