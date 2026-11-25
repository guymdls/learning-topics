# Pillar 02: PCIe, Interconnects, Form Factors & Signal Integrity

> **Interactive Module:** [Open Pillar 02 HTML](https://guymdls.github.io/learning-topics/storage-learning-topics/02-pcie-interconnects-and-si/) · [Local `index.html`](./index.html)

**Mapped Original Topics:** PCIe
**Added Extensions:** EDSFF (E1.S/E1.L/E3.S/E3.L, SFF-TA-1002), retimers/redrivers, PCIe IDE/CMA/DOE, riser SI diagnostics.

## PCIe 5.0 → 6.0 → 7.0 Architectural Transition

- **PCIe 5.0:** 32 GT/s per lane using **NRZ** (128b/130b encoding, variable-length TLP framing).
- **PCIe 6.0 (Base Spec Rev 6.4, June 11, 2025):** 64 GT/s per lane using **PAM4** (2 bits/symbol across 4 voltage levels at 32 GBd, preserving the **16 GHz Nyquist** frequency).
  - Three smaller eye openings push raw First Bit Error Rate (FBER) target to `1e-6` and introduce DFE error bursts.
  - Mandatory **256-byte fixed FLIT Mode** (per PCI-SIG board director public overview): **236 B TLP area + 6 B Data Link Payload + 8 B strong CRC + 6 B lightweight FEC** (corrects up to a 3-consecutive-byte burst in `<2 ns` with CRC, backed by link-level replay on uncorrectable CRC).
  - Yields roughly **30.3 GB/s usable bandwidth each way on PCIe 6.0 x4** (~121 GB/s on x16).
  - **L0p** enables dynamically scaling down active lanes without full LTSSM link retraining to conserve power.
- **PCIe 7.0 (128 GT/s, released to PCI-SIG members June 2025):** Doubles symbol rate to 64 GBd (32 GHz Nyquist). **PCIe 8.0 (256 GT/s)** targeted for member release by 2028.

## Validation Bench Diagnostics & Form Factors

- Inspect negotiated speed, width, FLIT status, MaxPayloadSize (MPS), and completion timeouts via `lspci -vv`.
- Decode **AER** (Advanced Error Reporting) TLP headers and **DPC** (Downstream Port Containment) containment events.
- Validate **SR-IOV** (Physical/Virtual Functions + ARI) and **P2P DMA** hierarchy rules for CMB and GPU transfers, plus **IDE / CMA / DOE** link security.
- Distinguish fixture signal degradation from firmware bugs across **EDSFF E1.S / E1.L / E3.S / E3.L** (`SFF-TA-1002`, 20W–70W) vs. legacy U.2/U.3 and M.2 — Gen5/Gen6 risers and long PCB traces cause silent link downgrades and Correctable Error storms surfaced in OCP SMART *PCIe Link Retraining Count* and *PCIe Correctable Error Count*.

## Curated Sources & Reference Library

| Source / Resource | Format | Link / Identifier | How to Use It |
| :--- | :--- | :--- | :--- |
| **PCI Express Technology 3.0 — Mike Jackson, Ravi Budruk et al. (MindShare Press)** | Book | `ISBN 978-0-9770878-6-0` | Best foundational text for PCIe TLP/DLLP layers, credit-based flow control, transaction ordering, config space, and LTSSM. |
| **PCI-SIG Official Specifications & Intel PCIe DevNet Resources** | Primary Spec / White Papers | [PCI-SIG Specs](https://pcisig.com/specifications) · [Intel PCIe DevNet](https://www.intel.com/content/www/us/en/io/pci-express/pci-express-architecture-devnet-resources.html) | Consult Base Spec 6.4 / 7.0 (via corporate membership) alongside public retimer and CMA/DOE/IDE references. |
| **PCIe 6.0 Explained: FLIT Mode, PAM4, FEC, IDE (Safeguard) & SI/PI Deep Dive (sipi.work)** | Technical Guides | [Safeguard PCIe 6.0 Guide](https://safeguard.sh/resources/blog/pcie-6-explained-flit-mode-pam4-fec-and-integrity-and-data-encryption) · [sipi.work PCIe Gen6](https://sipi.work/topics/interfaces/pcie-gen6.html) | Engineer-grade breakdowns of 256B FLIT math, DFE error-burst precoding, RLM/SNDR linearity, and Linux inspection workflows. |
| **Linux Kernel PCIe AER, P2P DMA & SR-IOV Docs** | Official OS Docs | [PCIe AER HOWTO](https://docs.kernel.org/PCI/pcieaer-howto.html) · [P2P DMA](https://docs.kernel.org/driver-api/pci/p2pdma.html) · [SR-IOV HOWTO](https://docs.kernel.org/PCI/pci-iov-howto.html) | Reference for /dev/aer_inject, sysfs AER stats, P2P hierarchy distance checks, and SR-IOV VF provisioning. |
| **EDSFF Form Factors Explained (E1.S/E1.L/E3.S/E3.L)** | Technical Primer | [Servers Direct Guide](https://www.serversdirect.com/insights/nvme-form-factors-explained-m2-u2-e1s-e3s) · [Supermicro EDSFF Glossary](https://www.supermicro.com/en/glossary/edsff) | Quick mapping of dimensions, thermal envelopes (20W–70W), and chassis airflow profiles. |

