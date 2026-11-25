# 02. PCIe, Interconnects, Form Factors & Signal Integrity (Simplified)

> **Interactive Lesson & Calculator:** [Open Subject 02 HTML](https://guymdls.github.io/learning-topics/storage-learning-topics/02-pcie-interconnects-and-si/)

## The 30-Second Mental Model
- **NVMe is the language; PCIe is the physical highway** carrying those NVMe packets across copper traces between CPU and SSD.
- **PCIe 6.0 doubles speed (32 → 64 GT/s)** without doubling clock frequency by stacking **4 voltage levels (PAM4 = 2 bits per tick)** instead of 2 (NRZ). Because smaller voltage gaps cause more bit flips, Gen6 packs everything into fixed **256-byte boxes (FLITs)** with instant error correction (**FEC + CRC**).
- **Lab Reality:** At Gen5/Gen6 speeds, a worn connector or cheap riser card causes silent link retries that look just like a slow SSD!

## Curated Sources & Reference Library

| Source / Resource | Format | Link / Identifier | How to Use It |
| :--- | :--- | :--- | :--- |
| **PCIe 6.0 Explained: FLIT Mode, PAM4, FEC, IDE (Safeguard) & SI/PI Deep Dive (sipi.work)** | Visual Web Guides | [Safeguard PCIe 6.0 Guide](https://safeguard.sh/resources/blog/pcie-6-explained-flit-mode-pam4-fec-and-integrity-and-data-encryption) · [sipi.work PCIe Gen6](https://sipi.work/topics/interfaces/pcie-gen6.html) | Start here! Clear visual diagrams of PAM4 eyes, 256-byte FLIT boxes, and why FEC is mandatory. |
| **EDSFF Form Factors Explained (E1.S/E1.L/E3.S/E3.L)** | Quick Visual Primer | [Servers Direct Guide](https://www.serversdirect.com/insights/nvme-form-factors-explained-m2-u2-e1s-e3s) · [Supermicro EDSFF Glossary](https://www.supermicro.com/en/glossary/edsff) | 5-minute visual guide to server SSD shapes, connectors, and wattage limits. |
| **PCI Express Technology 3.0 — Mike Jackson, Ravi Budruk et al. (MindShare Press)** | Foundational Book | `ISBN 978-0-9770878-6-0` | The gold-standard textbook for understanding TLPs, credits, ordering rules, and link training (LTSSM). |
| **Linux Kernel PCIe AER, P2P DMA & SR-IOV Docs** | Official OS Docs | [PCIe AER HOWTO](https://docs.kernel.org/PCI/pcieaer-howto.html) · [P2P DMA](https://docs.kernel.org/driver-api/pci/p2pdma.html) · [SR-IOV HOWTO](https://docs.kernel.org/PCI/pci-iov-howto.html) | Practical Linux commands to inject PCIe errors (/dev/aer_inject), check P2P GPU paths, and create Virtual Functions. |
| **PCI-SIG Official Specifications & Intel PCIe DevNet Resources** | Primary Spec | [PCI-SIG Specs](https://pcisig.com/specifications) · [Intel PCIe DevNet](https://www.intel.com/content/www/us/en/io/pci-express/pci-express-architecture-devnet-resources.html) | Corporate spec lookup for Base Spec 6.4 / 7.0, retimers, and IDE/CMA/DOE link security. |

