# 05. Benchmarking, Telemetry & Observability (Simplified)

> **Interactive Lesson & Steady-State Lab:** [Open Subject 05 HTML](https://guymdls.github.io/learning-topics/storage-learning-topics/05-performance-telemetry-and-observability/)

## The 30-Second Mental Model
- **Trap 1 (Empty-Drive Illusion):** A brand-new SSD (**FOB**) writes 2–3× faster than a drive that has been running in a data center for a week. You must fill it twice and prove **SNIA PTS Steady State** (`Range < 20%`, `Slope < 10%`) before trusting any number.
- **Trap 2 (Coordinated Omission):** If your benchmark waits for a stuck I/O before sending the next one, a 2-second freeze only counts as *one* slow request instead of thousands — hiding awful `p99.99` latency!
- **Built-In X-Ray Vision:** OCP `C0h–C9h` and `nvme sndk` log pages tell you exact internal flash writes, capacitor health, panic counts, and PCIe retries without opening the drive.

## Curated Sources & Reference Library

| Source / Resource | Format | Link / Identifier | How to Use It |
| :--- | :--- | :--- | :--- |
| **Everything You Know About Latency Is Wrong (Gil Tene Summary) & Apache Otava** | 10-Min Must-Read + Tool | [Latency Is Wrong](https://bravenewgeek.com/everything-you-know-about-latency-is-wrong/) · [Apache Otava](https://otava.apache.org/docs/download/) | Start here! Eye-opening, easy read on Coordinated Omission and why averaging percentiles lies — paired with Otava for CI. |
| **Performance Analysis and Tuning on Modern CPUs (Denis Bakhvalov) & Brendan Gregg** | Free Book + Reference | [easyperf.net (Free Book)](https://easyperf.net/) · [Systems Performance 2e](https://www.brendangregg.com/systems-performance-2nd-edition-book.html) · [BPF Performance Tools](https://www.brendangregg.com/bpf-performance-tools-book.html) · [FlameGraph](https://github.com/brendangregg/flamegraph) | Practical guides to Flame Graphs, eBPF histograms, and CPU Top-Down (TMAM) profiling. |
| **nvme-cli Repo & OCP / SanDisk Plugin Source Code** | Open-Source Code | [nvme-cli](https://github.com/linux-nvme/nvme-cli) · [ocp-nvme.c](https://github.com/linux-nvme/nvme-cli/blob/master/plugins/ocp/ocp-nvme.c) · [wdc-nvme.c](https://github.com/linux-nvme/nvme-cli/blob/master/plugins/wdc/wdc-nvme.c) | Exact C struct definitions for OCP C0h–C9h and SanDisk (sndk/wdc) vendor log decoders. |
| **MIT 6.172 Performance Engineering & Raj Jain's Art of Performance Analysis** | Course & Classic Book | [MIT OCW 6.172](https://ocw.mit.edu/courses/6-172-performance-engineering-of-software-systems-fall-2018/) · `Raj Jain (Wiley, 1991)` | Deep fundamentals on code speedups and rigorous experimental statistics. |

