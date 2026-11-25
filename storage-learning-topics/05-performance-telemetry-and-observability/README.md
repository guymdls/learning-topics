# Pillar 05: Performance Engineering, Telemetry & Observability

> **Interactive Module:** [Open Pillar 05 HTML](https://guymdls.github.io/learning-topics/storage-learning-topics/05-performance-telemetry-and-observability/) · [Local `index.html`](./index.html)

**Mapped Original Topics:** Performance, Telemetry / SMART / Log page
**Added Extensions:** SNIA SSS PTS steady-state math, Coordinated Omission, Apache Otava / Hunter change-point CI, `nvme-cli` v3.x & `nvme sndk/wdc` plugins.

## Profiling Methodologies & Statistical Rigor

- **Structured Profiling:** Pair Brendan Gregg's **USE Method** (Utilization, Saturation, Errors) and **TSA Method** (Thread State Analysis) with Intel **TMAM** (Top-Down Microarchitecture Analysis: Front-End Bound, Back-End Bound, Bad Speculation, Retiring), backed by `perf` (PEBS/LBR), CPU/Off-CPU Flame Graphs, and `eBPF / bpftrace`.
- **SNIA SSS PTS v2.0.2 Steady-State Rigor:** Never evaluate FOB (Fresh-Out-of-Box) SSD performance. Purge (`nvme format`), run Workload-Independent Preconditioning (128 KiB sequential writes across `2x` user capacity), and verify 5-round steady-state convergence:
  - `Range(y) < 0.2 × Ave(y)`
  - Linear-fit `Slope(y) < 0.1` (normalized excursion `< 10%` of mean across the 5-round window)
- **Coordinated Omission & Tail Hygiene:** Closed-loop generators pause new submissions during drive stalls, masking multi-second GC or read-retry glitches from `p99.99`. Never average percentiles across runs and never discard `max` latency.
- **Apache Otava (incubating, formerly Hunter):** Uses modified E-divisive means (Student's t-test + overlapping fixed-size windows) to flag real CI performance regressions automatically without static-threshold alert fatigue.

## NVMe, OCP 2.6/2.7 & SanDisk Telemetry Log Page Reference

| Log Page / Feature | Standard / Scope | Key Validation Signals & Gotchas |
| :--- | :--- | :--- |
| **02h SMART/Health & 0Dh Persistent Event Log (PEL)** | NVMe Base 2.3 | Composite/sensor temps, media errors, percentage used; PEL persists non-command subsystem events across power cycles and resets. |
| **07h Host-Initiated & 08h Controller-Initiated Telemetry** | NVMe Base 2.3 + OCP 2.6 | Data Areas 1–4; 08h persists across resets. OCP 2.6 DA1 defaults to 32 KiB with `<1 ms` typical / `<5 ms` max I/O latency impact and `>16` Virtual FIFOs. |
| **C0h OCP Extended SMART** | OCP 2.6 / 2.7 | 512B little-endian; gate on OCP UUID `C194D55B-E094-4794-A21D-29998F56BE6F` (Identify CNS 17h), check GUID `AFD514C97C6F4F9CA4F2BFEA2810AFC5h` and Version (`0005h`=2.6, `0006h`=2.7). Tracks physical writes/reads, XOR/soft ECC, capacitor health (`FFFFh`=no PLP), PCIe retraining, dies offline, lifetime/peak power. |
| **C1h Error Recovery, C2h FW Activation & Latency Monitor** | OCP 2.6 | `C1h` exposes panic count & recommended reset sequence (`EREC-2`); Latency Monitor (`nvme ocp latency-monitor-log`; Set Feature `C5h`) records hardware latency buckets & threshold-breach timestamps. |
| **C4h Device Capabilities, C6h HW Component, C9h Telemetry String Log** | OCP 2.6 / 2.7 | `C9h` enables vendor-neutral decoding of `07h/08h` via `nvme ocp internal-log`; `C4h` v2 adds FIPS 140 status in OCP 2.7; watch OCP 2.6 `C6h` byte-vs-Dword size fixes. |
| **SanDisk Vendor Plugins (`nvme sndk` / legacy `nvme wdc`)** | SanDisk / WDC | `vs-smart-add-log`, `vs-device-waf`, `get-latency-monitor-log`, `vs-temperature-stats`, `get-crash-dump`, `get-pfail-dump`, `vs-internal-log`, and `pci-eye` (via `nvmeadm`). (`nvme-cli` v3.x merges `libnvme` + sandboxed decoders + `nvme-discoverd`.) |

## Curated Sources & Reference Library

| Source / Resource | Format | Link / Identifier | How to Use It |
| :--- | :--- | :--- | :--- |
| **Systems Performance: Enterprise and the Cloud, 2nd Ed. & BPF Performance Tools — Brendan Gregg** | Books | [Systems Performance 2e](https://www.brendangregg.com/systems-performance-2nd-edition-book.html) · [BPF Performance Tools](https://www.brendangregg.com/bpf-performance-tools-book.html) · [bpftrace](https://github.com/bpftrace/bpftrace) · [FlameGraph](https://github.com/brendangregg/flamegraph) | Read Ch. 1–4, 6–9, and 12–15 for USE/TSA/Disks/Benchmarking; capture CPU & Off-CPU Flame Graphs with perf and bpftrace. |
| **Performance Analysis and Tuning on Modern CPUs, 2nd Ed. — Denis Bakhvalov** | Free Book & Course | [easyperf.net](https://easyperf.net/) | Best practical reference on TMAM, PMU counters, PEBS, LBR, Data Address Profiling for false sharing, and C++ tuning. |
| **MIT 6.172 Performance Engineering of Software Systems — Leiserson & Shun** | Free OCW Course | [MIT OCW 6.172](https://ocw.mit.edu/courses/6-172-performance-engineering-of-software-systems-fall-2018/) | Watch lectures on Bentley optimization rules, bit hacks, cache blocking, accurate timing, and memory allocators. |
| **The Art of Computer Systems Performance Analysis — Raj Jain** | Book | `Wiley Classic (1991)` | Foundational reference for experimental design, confidence intervals, and avoiding statistical fallacies. |
| **Everything You Know About Latency Is Wrong (Gil Tene Summary) & Apache Otava (Hunter)** | Article & OSS Tool | [Latency Is Wrong](https://bravenewgeek.com/everything-you-know-about-latency-is-wrong/) · [Apache Otava](https://otava.apache.org/docs/download/) | Essential reading before implementing latency histograms or automated CI performance gates. |
| **nvme-cli Repo & OCP/SanDisk Plugin Source** | Open-Source Code | [nvme-cli](https://github.com/linux-nvme/nvme-cli) · [ocp-nvme.c](https://github.com/linux-nvme/nvme-cli/blob/master/plugins/ocp/ocp-nvme.c) · [wdc-nvme.c](https://github.com/linux-nvme/nvme-cli/blob/master/plugins/wdc/wdc-nvme.c) | Inspect exact struct definitions and mock test coverage (see issue #4312 for sndk plugin commands). |

