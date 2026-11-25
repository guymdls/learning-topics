# Pillar 04: Computer Architecture, OS Internals & Systems Concurrency

> **Interactive Module:** [Open Pillar 04 HTML](https://guymdls.github.io/learning-topics/storage-learning-topics/04-architecture-os-and-concurrency/) · [Local `index.html`](./index.html)

**Mapped Original Topics:** Computer architecture, Operating system, System programming & concurrency.

## Eliminating Host Bottlenecks at Gen5/Gen6 Speeds

When an enterprise NVMe SSD completes a 4 KiB read in ~10–100 µs, the legacy Linux I/O stack (syscalls, VFS, page cache, `struct bio`, `blk-mq`, IRQs) can consume roughly **40% of total NVMe latency** (systems-engineering analysis).

1. **OS & Driver I/O Paths:**
   - **Linux `blk-mq` & `drivers/nvme/host/pci.c`:** Per-CPU software staging queues -> hardware dispatch queues, PRP DMA pool mapping (`nvme_queue_rq`), and phase-tag completion (`nvme_process_cq`).
   - **`io_uring_cmd` NVMe Passthrough (`/dev/ngXnY`, Linux 5.19+):** USENIX FAST '24 measurements (Samsung / Western Digital) showed **+35% throughput (2.9M → 3.9M IOPS)**, landing within **9–16% of raw SPDK** with fixed buffers + polling while keeping `lsblk`, cgroups, and `smartctl`.
   - **SPDK (`vfio-pci` User-Space Poll-Mode):** Hugepages + dedicated polling cores; SPDK benchmarks recorded up to **2.6× more IOPS/core** via `spdk_nvme_perf` vs `fio` on 4K random reads.
   - **Windows Client/Server:** `StorNVMe`, `BypassIO`, and native NVMe paths.
   - **Host Tuning Levers:** `iommu=pt` / `iommu.strict=0`, `intel_idle.max_cstate=0`, `options nvme poll_queues=N`, `rq_affinity`, `nomerges=2`, `nr_requests`, and `numactl` pinning to the PCIe root complex's local NUMA domain.
2. **CPU Microarchitecture & SIMD Acceleration:**
   - Out-of-order pipelines, branch misprediction, 64-byte L1/L2/LLC cache lines, MESI coherence, false sharing, TLB pressure (hugepages for DMA/SPDK).
   - **Intel ISA-L:** Assembly/vector-accelerated CRC (`iscsi32`, `t10dif`, 64-bit), XOR/P+Q RAID, and Reed-Solomon erasure coding for line-rate validation.
3. **Systems Concurrency (C/C++/Rust):**
   - Memory ordering (`Relaxed`, `Acquire/Release`, `SeqCst`, fences), **strongly ordered x86-64 (TSO) vs. weakly ordered ARM64** (load-exclusive/store-exclusive relevant to ARM server hosts & SSD/DPU SoCs), lock-free SPSC/MPSC rings, RCU, and hazard pointers.

## Curated Sources & Reference Library

| Source / Resource | Format | Link / Identifier | How to Use It |
| :--- | :--- | :--- | :--- |
| **Computer Systems: A Programmer's Perspective, 3rd Ed. (CS:APP3e) — Bryant & O'Hallaron** | Book | `ISBN 978-0-13-409266-9` · [csapp.cs.cmu.edu](https://csapp.cs.cmu.edu/) | Study Ch. 5 (Optimizing Program Performance), Ch. 6 (Memory Hierarchy), Ch. 9 (Virtual Memory), and Ch. 12 (Concurrency). |
| **Computer Architecture: A Quantitative Approach, 6th Ed. — Hennessy & Patterson** | Book | `ISBN 978-0-12-811905-1` · [Elsevier Book Page](https://shop.elsevier.com/books/computer-architecture/hennessy/978-0-12-811905-1) | Reference Ch. 2 (Memory Hierarchy), Ch. 5 (Multiprocessors/Coherence), and Ch. 6–7 (Warehouse-Scale & Domain-Specific Architectures). |
| **Operating Systems: Three Easy Pieces (OSTEP v1.10) — Arpaci-Dusseau** | Free Online Book | [OSTEP Home](https://pages.cs.wisc.edu/~remzi/OSTEP/) | Free refresher on virtualization, locks/CVs, Ch. 44 (Flash-based SSDs), and Ch. 45 (Data Integrity). |
| **Linux Kernel Docs (blk-mq, nvme) & Kernel Internals Guide** | Official Docs / Reference | [blk-mq](https://docs.kernel.org/block/blk-mq.html) · [NVMe Docs](https://docs.kernel.org/nvme/index.html) · [kernel-internals NVMe](https://kernel-internals.org/block/nvme/) · [LDD3 (concepts)](https://lwn.net/Kernel/LDD3/) | Study nvme_queue_rq, nvme_irq, polling paths, and quirk policies. Pair with Linux Kernel Development 3rd Ed. (Robert Love). |
| **Efficient IO with io_uring — Jens Axboe + liburing / SPDK / xNVMe / libnvme / ISA-L** | Paper & Codebases | [io_uring.pdf](https://kernel.dk/io_uring.pdf) · [liburing](https://github.com/axboe/liburing) · [SPDK NVMe](https://spdk.io/doc/nvme.html) · [xNVMe](https://github.com/xnvme/xnvme) · [libnvme](https://github.com/linux-nvme/libnvme) · [Intel ISA-L](https://github.com/intel/isa-l) | Read source code directly: spdk/examples/nvme/perf, xNVMe backends, libnvme ioctl wrappers, and ISA-L SIMD CRC routines. |
| **Rust Atomics and Locks — Mara Bos & Is Parallel Programming Hard? — Paul McKenney** | Free Online Books | [Rust Atomics & Locks](https://mara.nl/atomics/) · [Perfbook PDF](https://www.kernel.org/pub/linux/kernel/people/paulmck/perfbook/perfbook.html) | Mara Bos (Ch. 2–3, 7–9) offers the clearest x86 vs ARM64 memory-ordering walkthrough (applicable to C++); pair with C++ Concurrency in Action 2nd Ed. |
| **What Every Programmer Should Know About Memory (Drepper) & The Art of Writing Efficient Programs (Pikus)** | Paper & Book | [Drepper PDF](https://liuyehcf.github.io/resources/paper/What-Every-Programmer%E2%80%93Should-Know-About-Memory.pdf) · [Pikus GitHub](https://github.com/PacktPublishing/The-Art-of-Writing-Efficient-Programs) · [Agner Fog Manuals](https://www.agner.org/optimize/) | Essential for cache-friendly C++ layouts, NUMA locality, and compiler/SIMD tuning. |
| **NVIDIA Grace & PCIe Gen5 Linux NVMe Tuning Guides** | Vendor Guides | [NVIDIA Grace IO Guide](https://docs.nvidia.com/dccpu/grace-perf-tuning-guide/optimizing-io.html) · [Xinnor PCIe Gen5 Guide](https://xinnor.io/blog/pcie-gen-5-storage-array-optimization-overcoming-the-obstacles-to-maximize-performance/) | Practical GRUB, poll_queues, sysctl, and NUMA checklists for high-IOPS lab hosts. |

