# 04. Computer Architecture, OS Internals & Concurrency (Simplified)

> **Interactive Lesson & Path Picker:** [Open Subject 04 HTML](https://guymdls.github.io/learning-topics/storage-learning-topics/04-architecture-os-and-concurrency/)

## The 30-Second Mental Model
- **The Speed Trap:** When a modern SSD finishes a read in **10–50 microseconds**, traditional OS system calls, interrupts, mutex locks, and byte-by-byte CRC loops waste **~40% of total latency** — making *your test program* slower than the SSD!
- **Three Fixes Every Validation Engineer Uses:**
  1. **Bypass OS overhead** with `io_uring_cmd` (`/dev/ngXnY`) or **SPDK** user-space polling.
  2. **Share nothing across CPU cores:** 1 thread = 1 NVMe queue pair, pinned to the local **NUMA** socket, with **64-byte aligned** counters.
  3. **Use SIMD vector instructions (Intel ISA-L)** to check data CRCs at 28+ GB/s.

## Curated Sources & Reference Library

| Source / Resource | Format | Link / Identifier | How to Use It |
| :--- | :--- | :--- | :--- |
| **Operating Systems: Three Easy Pieces (OSTEP v1.10) & Rust Atomics and Locks (Mara Bos)** | 2 Free Online Books | [OSTEP (Ch. 44–45)](https://pages.cs.wisc.edu/~remzi/OSTEP/) · [Rust Atomics & Locks](https://mara.nl/atomics/) | Start here! Both are free, famous for plain-English clarity, and teach SSD I/O + x86 vs ARM64 atomics effortlessly (applies directly to C++ too). |
| **Efficient IO with io_uring (Axboe) + SPDK / xNVMe / Intel ISA-L** | Docs & Code | [io_uring.pdf](https://kernel.dk/io_uring.pdf) · [SPDK NVMe](https://spdk.io/doc/nvme.html) · [xNVMe](https://github.com/xnvme/xnvme) · [Intel ISA-L](https://github.com/intel/isa-l) | Practical libraries you will call directly when writing high-speed SanDisk validation tools. |
| **Computer Systems: A Programmer's Perspective (CS:APP3e) & Hennessy/Patterson** | Core Textbooks | [csapp.cs.cmu.edu](https://csapp.cs.cmu.edu/) · [Elsevier CAQA 6e](https://shop.elsevier.com/books/computer-architecture/hennessy/978-0-12-811905-1) | Deep foundation on CPU caches, virtual memory, DMA, and cache coherence. |
| **Linux Kernel Docs (blk-mq, nvme) & NVIDIA/Gen5 Tuning Checklists** | OS Guides | [blk-mq](https://docs.kernel.org/block/blk-mq.html) · [kernel-internals NVMe](https://kernel-internals.org/block/nvme/) · [NVIDIA Grace IO Guide](https://docs.nvidia.com/dccpu/grace-perf-tuning-guide/optimizing-io.html) · [Xinnor Gen5 Tuning](https://xinnor.io/blog/pcie-gen-5-storage-array-optimization-overcoming-the-obstacles-to-maximize-performance/) | Step-by-step Linux tuning commands and kernel driver walkthroughs. |
| **What Every Programmer Should Know About Memory (Drepper), Pikus & McKenney Perfbook** | Advanced Optimization | [Drepper PDF](https://liuyehcf.github.io/resources/paper/What-Every-Programmer%E2%80%93Should-Know-About-Memory.pdf) · [Pikus GitHub](https://github.com/PacktPublishing/The-Art-of-Writing-Efficient-Programs) · [Perfbook PDF](https://www.kernel.org/pub/linux/kernel/people/paulmck/perfbook/perfbook.html) · [Agner Fog](https://www.agner.org/optimize/) | Consult when squeezing maximum IOPS per CPU core out of C++/Rust verifiers. |

