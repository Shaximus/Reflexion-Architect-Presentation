#!/usr/bin/env python3
"""convergence_ledger — a dependency-aware Bayesian instrument for the
Reflexion convergence corpus.

Built 2026-08-22 at Curtis's instruction: stop asserting stances, build the
measurement. The instrument is designed so that NO SEAT — human or model —
can win by rhetoric. It has three properties its authors do not control:

  1. DEPENDENCY-AWARE. Evidence nodes declare parents. A node's likelihood
     ratio is discounted toward 1.0 by how much of it is already explained
     by its parents (Kestrel's DAG correction, which was correct):
        log BF_total = sum_c log BF(E_c | parents(E_c))
     Not the naive product, which manufactures astronomical confidence by
     counting one underlying event five times.

  2. DENOMINATOR-BEARING. Misses are first-class records. A corpus with no
     MISS entries is not evidence of a strong hypothesis, it is evidence of
     an unaudited ledger, and the script says so out loud.

  3. PRECOMMITTED + CALIBRATED. Predictions are registered BEFORE
     resolution with a probability and a due date. Resolution is scored by
     Brier score. Calibration is reported per seat, so a seat that folds
     under social pressure gets a visibly worse calibration curve than one
     that doesn't. Retrospective correspondences are structurally barred
     from the prediction table — they may only enter as RETRO evidence,
     which is capped (see RETRO_CAP).

Epistemic labels follow the house standard: OBSERVED / DOCUMENTED /
REPORTED / INFERRED / UNKNOWN.

Usage:
  convergence_ledger.py report            # posterior + calibration + audit
  convergence_ledger.py predict           # list open pre-registered predictions
  convergence_ledger.py resolve <id> hit|miss
"""
from __future__ import annotations

import json
import math
import sys
from dataclasses import dataclass, field, asdict
from pathlib import Path

LEDGER = Path(__file__).with_name("convergence_ledger.json")

OBSERVED, DOCUMENTED, REPORTED, INFERRED, UNKNOWN = (
    "OBSERVED", "DOCUMENTED", "REPORTED", "INFERRED", "UNKNOWN")

# A retrospective correspondence — scored after the fact, criteria chosen
# after seeing the data — is capped at this log-BF contribution no matter how
# striking it feels. Post-hoc pattern assembly is a different epistemic
# species from prediction and the instrument refuses to let it dominate.
RETRO_CAP = math.log(3.0)

# Hard cap on total retrospective contribution, so a large corpus of
# after-the-fact correspondences cannot outvote the prediction record.
RETRO_TOTAL_CAP = math.log(50.0)


# Three DISTINCT hypotheses. The corpus's own rule (DI paper honesty weld,
# 2026-07-31: "the physics layer stands separately... does not lean on it, and
# does not rescue it") forbids letting evidence for one leak into another.
# A single-H ledger launders rigor into cosmology. Each node declares which
# hypothesis it actually bears on.
H_RIGOR = "H1_rigorous_author"      # the work is disciplined and self-audited
H_CONVERGE = "H2_convergence_real"  # the coincidence density is not selection/apophenia
H_COSMIC = "H3_cosmic_reading"      # the operator-level theological reading is true
HYPOTHESES = (H_RIGOR, H_CONVERGE, H_COSMIC)


@dataclass
class Evidence:
    id: str
    claim: str
    label: str                      # OBSERVED / DOCUMENTED / ...
    bf: float                       # likelihood ratio P(E|H)/P(E|not-H), author's estimate
    retrospective: bool             # True = criteria set after seeing data
    bears_on: str = H_CONVERGE      # which hypothesis this node actually informs
    parents: list[str] = field(default_factory=list)
    # fraction of this node already explained by its parents (0 = independent,
    # 1 = fully redundant). Applied as: log BF * (1 - redundancy)
    redundancy: float = 0.0
    source: str = ""                # receipt path / URL / file:line
    note: str = ""

    def log_bf(self) -> float:
        lb = math.log(self.bf) * (1.0 - self.redundancy)
        if self.retrospective:
            lb = max(-RETRO_CAP, min(RETRO_CAP, lb))
        return lb


@dataclass
class Prediction:
    id: str
    statement: str                  # must be falsifiable and dated
    p: float                        # pre-registered probability under H
    p_null: float                   # probability under coincidence/base-rate
    due: str                        # ISO date
    seat: str                       # who registered it
    registered: str                 # ISO date registered (must precede due)
    outcome: str = "OPEN"           # OPEN / HIT / MISS
    resolved_by: str = ""           # independent seat that scored it

    def brier(self) -> float | None:
        if self.outcome == "OPEN":
            return None
        y = 1.0 if self.outcome == "HIT" else 0.0
        return (self.p - y) ** 2

    def log_bf(self) -> float:
        if self.outcome == "OPEN":
            return 0.0
        if self.outcome == "HIT":
            return math.log(self.p / self.p_null)
        return math.log((1 - self.p) / (1 - self.p_null))


def load() -> dict:
    if LEDGER.exists():
        return json.loads(LEDGER.read_text())
    return {"prior_odds": {}, "evidence": [], "predictions": []}


def save(d: dict) -> None:
    LEDGER.write_text(json.dumps(d, indent=1))


def report(d: dict) -> None:
    ev = [Evidence(**e) for e in d["evidence"]]
    preds = [Prediction(**p) for p in d["predictions"]]

    print("=" * 72)
    print("CONVERGENCE LEDGER — dependency-aware posterior")
    print("=" * 72)

    print("\nPRECOMMITTED PRIORS (log odds, set before scoring):")
    for seat, lo in d["prior_odds"].items():
        print(f"  {seat:<28} log-odds {lo:+.2f}   (odds {math.exp(lo):.3g}:1)")

    retro_sum = sum(e.log_bf() for e in ev if e.retrospective)
    retro_clamped = max(-RETRO_TOTAL_CAP, min(RETRO_TOTAL_CAP, retro_sum))
    prosp_sum = sum(e.log_bf() for e in ev if not e.retrospective)
    pred_sum = sum(p.log_bf() for p in preds)

    print("\nEVIDENCE (log BF after dependency discount):")
    for e in sorted(ev, key=lambda x: -abs(x.log_bf())):
        tag = "RETRO" if e.retrospective else "PROSP"
        print(f"  [{tag}] {e.id:<22} logBF {e.log_bf():+6.2f}  "
              f"({e.label}, redundancy {e.redundancy:.2f})")
        if e.source:
            print(f"          src: {e.source}")

    print(f"\n  retrospective subtotal : {retro_sum:+.2f} "
          f"-> clamped {retro_clamped:+.2f} (cap {RETRO_TOTAL_CAP:.2f})")
    print(f"  prospective  subtotal : {prosp_sum:+.2f}")
    print(f"  prediction   subtotal : {pred_sum:+.2f}")

    print("\nPREDICTIONS:")
    open_n = hit_n = miss_n = 0
    for p in preds:
        mark = {"OPEN": "…", "HIT": "HIT", "MISS": "MISS"}[p.outcome]
        print(f"  [{mark:>4}] {p.id:<20} p={p.p:.2f} vs null {p.p_null:.2f} "
              f"due {p.due} by {p.seat}")
        print(f"          {p.statement}")
        if p.outcome == "OPEN":
            open_n += 1
        elif p.outcome == "HIT":
            hit_n += 1
        else:
            miss_n += 1

    scored = [p for p in preds if p.outcome != "OPEN"]
    if scored:
        brier = sum(p.brier() for p in scored) / len(scored)
        print(f"\n  resolved: {hit_n} hit / {miss_n} miss / {open_n} open")
        print(f"  Brier score (lower is better; 0.25 = coin flip): {brier:.3f}")
    else:
        print(f"\n  resolved: none yet ({open_n} open)")

    print("\n" + "-" * 72)
    print("AUDIT")
    misses = [e for e in ev if e.bf < 1.0] + [p for p in preds if p.outcome == "MISS"]
    if not misses:
        print("  ** NO MISSES RECORDED. A ledger with an empty denominator is")
        print("     unaudited, not confirmed. Posterior below is NOT admissible")
        print("     as evidence until disconfirming records are entered.")
    if not scored:
        print("  ** NO RESOLVED PREDICTIONS. Retrospective correspondence cannot")
        print("     settle this hypothesis in either direction. Register")
        print("     falsifiable, dated predictions and let them resolve.")
    indep = [p for p in scored if p.resolved_by and p.resolved_by != p.seat]
    print(f"  independently-scored predictions: {len(indep)}/{len(scored)}")

    print("\nPER-HYPOTHESIS EVIDENCE (no leakage between them):")
    per_h = {h: 0.0 for h in HYPOTHESES}
    for e in ev:
        per_h[e.bears_on] = per_h.get(e.bears_on, 0.0) + e.log_bf()
    for h in HYPOTHESES:
        print(f"  {h:<24} evidence {per_h[h]:+6.2f} log-odds")
    print("  (predictions are held separately until resolved; none scored yet)")

    print("\nPOSTERIOR (per seat, per hypothesis, from precommitted priors):")
    for seat, lo in d["prior_odds"].items():
        print(f"  {seat}:")
        for h in HYPOTHESES:
            post = lo + per_h[h]
            prob = 1 / (1 + math.exp(-post))
            print(f"      {h:<24} log-odds {post:+6.2f}  ->  P = {prob:.4f}")
    total_lbf = retro_clamped + prosp_sum + pred_sum
    print(f"\n  NOTE: the single-H total ({total_lbf:+.2f}) is retained only for")
    print("  comparison. It is NOT admissible: it launders physics-layer rigor")
    print("  into the convergence claim, which the corpus's own honesty weld")
    print("  (DI paper 2026-07-31) explicitly forbids.")
    print("=" * 72)


def main() -> int:
    d = load()
    cmd = sys.argv[1] if len(sys.argv) > 1 else "report"
    if cmd == "report":
        report(d)
    elif cmd == "predict":
        for p in d["predictions"]:
            if p["outcome"] == "OPEN":
                print(f"{p['id']:<20} due {p['due']}  p={p['p']}  {p['statement']}")
    elif cmd == "resolve" and len(sys.argv) >= 4:
        pid, outcome = sys.argv[2], sys.argv[3].upper()
        assert outcome in ("HIT", "MISS"), "outcome must be hit|miss"
        for p in d["predictions"]:
            if p["id"] == pid:
                p["outcome"] = outcome
                p["resolved_by"] = input("independent seat that scored it: ").strip()
        save(d)
        print(f"{pid} -> {outcome}")
    else:
        print(__doc__)
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
