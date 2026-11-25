# 06. Validation, Fault Injection & Formal Methods (Simplified)

> **Interactive Lesson & Fault Explorer:** [Open Subject 06 HTML](https://guymdls.github.io/learning-topics/storage-learning-topics/06-validation-fault-injection-and-formal-methods/)

## The 30-Second Mental Model
- **Happy-path tests don't catch data-losing bugs.** Real validation means cutting power mid-write (**Quarch PLP**), forcing firmware panics (**OCP `C0h` 21 error modes**), bombarding queues with mutated commands (**state-aware fuzzing**), and mathematically proving concurrent resets can't deadlock (**TLA+**).
- **Shift Left:** Build and test your scripts on **QEMU NVMe** (`ocp=on, fdp=on`) on your own machine first so you never waste hours debugging typos on expensive PCIe 6.0 hardware!

## Curated Sources & Reference Library

| Source / Resource | Format | Link / Identifier | How to Use It |
| :--- | :--- | :--- | :--- |
| **Learn TLA+ (Hillel Wayne) & QEMU NVMe Emulation Docs** | Interactive Tutorial + Emulator | [learntla.com](https://learntla.com/) · [QEMU NVMe Docs](https://qemu-project.gitlab.io/qemu/system/devices/nvme.html) | Start here! Spin up a virtual OCP+FDP SSD on your laptop in 5 minutes and learn TLA+ state modeling step-by-step. |
| **State-Data-Aware SSD Firmware Fuzzing (2025) & SPDK + AFL++ Fuzzing Report** | Paper & Practical Repo | [arXiv 2505.03062](https://arxiv.org/html/2505.03062v1) · [nvme-fuzzing-report](https://github.com/benlimpa/nvme-fuzzing-report) · [QEMU Fuzzing](https://www.qemu.org/docs/master/devel/testing/fuzzing.html) | Shows how smart state-aware fuzzing finds firmware crashes in 67% fewer commands than blind fuzzing. |
| **UNH-IOL Conformance Plans & Windows HLK NVMe Testing Docs** | Official Cert Guides | [UNH-IOL NVMe Tools](https://www.iol.unh.edu/testing/storage/nvme/tools) · [NVM CS Conformance v26 PDF](https://www.iol.unh.edu/sites/default/files/testsuites/nvme/v26/UNH-IOL_NVM_Command_Set_Conformance_v26.0_2026.08.12.pdf) · [Microsoft HLK NVMe Docs](https://learn.microsoft.com/en-us/windows-hardware/test/hlk/testref/nvme-ssd-testing-overview) | Industry certification checklists for NVMe compliance and Microsoft WHQL sign-off. |
| **OakGate, SANBlaze & Quarch Lab Hardware Guides** | HIL Equipment Docs | [Teledyne LeCroy OakGate](https://www.teledynelecroy.com/ssdtesting/oakgate-ssd-test-solutions.aspx) · [SANBlaze OCP](https://www.sanblaze.com/ocp) · [Quarch Power Analysis](https://quarch.com/solutions/ssd-power-analysis/) | Reference for the commercial test appliances and programmable power glitchers in SanDisk labs. |

