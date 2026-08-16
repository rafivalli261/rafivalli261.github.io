---
title: "The Math of Game Theory"
date: 2026-08-14
description: "A formula-driven follow-up: mixed-strategy Nash equilibria, the minimax theorem, and the Shapley value, each worked through by hand."
tags: ["game theory", "mathematics", "research"]
draft: false
---

In [Game Theory in Practice](/blog/game-theory-in-practice), I introduced the basic vocabulary — players, strategies, payoffs — and showed how to find a **pure-strategy Nash equilibrium** by hand and by script. That covered the easy case: games where a stable outcome exists without anyone needing to randomize. This post picks up where that one left off and gets into the actual math: what happens when no pure equilibrium exists, how zero-sum games are solved exactly, and how to fairly split a payoff among a team. Every section ends with a full numeric example, worked to a checkable answer.

## When pure strategies aren't enough

Consider **Matching Pennies**. Two players each show a coin as Heads or Tails, simultaneously. If the coins match, Row wins a dollar from Column; if they differ, Column wins a dollar from Row.

| | Column: Heads | Column: Tails |
|---|---|---|
| **Row: Heads** | +1, −1 | −1, +1 |
| **Row: Tails** | −1, +1 | +1, −1 |

Check every cell for a pure Nash equilibrium: at (Heads, Heads), Row is happy (getting +1), but Column would rather switch to Tails (turning their −1 into +1). Every cell has the same problem — whoever is losing always wants to flip. There is **no pure-strategy equilibrium** here at all.

The fix is to let players randomize. Say Row plays Heads with probability `p` (Tails with `1-p`), and Column plays Heads with probability `q` (Tails with `1-q`). A **mixed strategy** is just a probability distribution over your available actions, and your payoff becomes an *expected* value:

```
E[payoff to Row] = p*q*(+1) + p*(1-q)*(-1) + (1-p)*q*(-1) + (1-p)*(1-q)*(+1)
```

### Solving it: the indifference principle

The key trick for finding a mixed equilibrium: at equilibrium, each player must be *indifferent* between the actions they're randomizing over — otherwise they'd just play the better one with probability 1.

Fix Column's mix at probability `q` of Heads, and compute Row's expected payoff from each pure action:

```
Row plays Heads: q*(+1) + (1-q)*(-1) = 2q - 1
Row plays Tails:  q*(-1) + (1-q)*(+1) = 1 - 2q
```

For Row to be willing to mix, these must be equal:

```
2q - 1 = 1 - 2q  =>  4q = 2  =>  q* = 1/2
```

By the symmetry of the game, the same algebra applied to Column's indifference condition gives `p* = 1/2`. So the equilibrium is: **both players flip a fair coin.** Plugging `p = q = 1/2` back into the expected payoff gives `2*(1/2) - 1 = 0` — the value of the game is zero, exactly as you'd expect from a fair, symmetric bet.

```python
def matching_pennies_expected_payoff(p, q):
    # Row payoff matrix: Heads/Heads=+1, Heads/Tails=-1, Tails/Heads=-1, Tails/Tails=+1
    return p*q*1 + p*(1-q)*(-1) + (1-p)*q*(-1) + (1-p)*(1-q)*1

print(matching_pennies_expected_payoff(0.5, 0.5))  # 0.0, confirms the equilibrium value
```

## Zero-sum games and the minimax theorem

Matching Pennies is a **zero-sum game** — Row's gain is exactly Column's loss. For this class of games, von Neumann proved something remarkable in 1928, well before the general Nash equilibrium existed: every finite two-player zero-sum game has a well-defined **value** `v`, and

```
max over Row's strategies ( min over Column's responses ) = min over Column's strategies ( max over Row's responses ) = v
```

In words: if Row plays defensively (maximizing their *worst-case* payoff) and Column plays defensively (minimizing Row's *best-case* payoff), they arrive at the same number from both directions. Neither player can do better by deviating — this is the **minimax theorem**, and it's the reason zero-sum games can be solved exactly, without any equilibrium-selection ambiguity.

### A worked example without symmetry

Take a less symmetric payoff matrix (Row's payoff; Column's is the negative):

| | Column: Aggressive | Column: Passive |
|---|---|---|
| **Row: Aggressive** | 2 | −1 |
| **Row: Passive** | −3 | 4 |

First, check for a pure-strategy **saddle point**: Row's maximin is `max(min(2,-1), min(-3,4)) = max(-1,-3) = -1`. Column's minimax is `min(max(2,-3), max(-1,4)) = min(2,4) = 2`. Since `-1 ≠ 2`, there's no saddle point — we need mixed strategies.

For a 2×2 zero-sum matrix `[[a, b], [c, d]]` with no saddle point, the equilibrium has a closed form:

```
p* = (d - c) / (a - b - c + d)     (Row's probability of playing row 1)
q* = (d - b) / (a - b - c + d)     (Column's probability of playing column 1)
v  = (a*d - b*c) / (a - b - c + d)
```

Plugging in `a=2, b=-1, c=-3, d=4`, the denominator is `2-(-1)-(-3)+4 = 10`:

```
p* = (4 - (-3)) / 10 = 7/10 = 0.7
q* = (4 - (-1)) / 10 = 5/10 = 0.5
v  = (2*4 - (-1)*(-3)) / 10 = (8 - 3)/10 = 0.5
```

So Row should play Aggressive 70% of the time, Column should split evenly, and the game's value is 0.5 (a slight edge to Row). Sanity-check by verifying Column's expected payoff is the same regardless of which column they pick, given Row's `p* = 0.7`:

```
Column plays Aggressive: 0.7*2 + 0.3*(-3) = 1.4 - 0.9 = 0.5
Column plays Passive:    0.7*(-1) + 0.3*4 = -0.7 + 1.2 = 0.5
```

Both give 0.5, confirming Row's mix makes Column indifferent — which is exactly what an equilibrium requires.

## The Shapley value: splitting the payoff fairly

Not every question in game theory is "what will happen?" — sometimes it's "how should the winnings be *divided*?" That's the domain of **cooperative game theory**, and its central tool is the **Shapley value**, introduced by Lloyd Shapley in 1953.

Setup: a set of `n` players can form coalitions, and a **characteristic function** `v(S)` tells you the total value any coalition `S` can generate on its own. The Shapley value gives each player `i` a fair share:

```
phi_i(v) = sum over all coalitions S not containing i of:
    [ |S|! * (n - |S| - 1)! / n! ] * ( v(S union {i}) - v(S) )
```

That formula looks dense, but it has a simple interpretation: **line up the players in every possible order they could join the coalition, measure how much value player `i` adds at the moment they join, and average that marginal contribution across all orderings.**

### Worked example: three freelancers

Three freelancers can take on a project alone or in teams; here's the revenue (in thousands of dollars) each grouping can generate:

```
v({})        = 0
v({1})       = 0      v({2})       = 0      v({3})       = 0
v({1,2})     = 90     v({1,3})     = 100    v({2,3})     = 110
v({1,2,3})   = 180
```

With 3 players there are `3! = 6` orderings. For each one, compute the marginal value each player adds at their position:

| Order | P1 contributes | P2 contributes | P3 contributes |
|---|---|---|---|
| 1,2,3 | v(1)-v(∅)=0 | v(1,2)-v(1)=90 | v(1,2,3)-v(1,2)=90 |
| 1,3,2 | v(1)-v(∅)=0 | v(1,2,3)-v(1,3)=80 | v(1,3)-v(1)=100 |
| 2,1,3 | v(1,2)-v(2)=90 | v(2)-v(∅)=0 | v(1,2,3)-v(1,2)=90 |
| 2,3,1 | v(1,2,3)-v(2,3)=70 | v(2)-v(∅)=0 | v(2,3)-v(2)=110 |
| 3,1,2 | v(1,3)-v(3)=100 | v(1,2,3)-v(1,3)=80 | v(3)-v(∅)=0 |
| 3,2,1 | v(1,2,3)-v(2,3)=70 | v(2,3)-v(3)=110 | v(3)-v(∅)=0 |

Average each column over the 6 orderings:

```
phi_1 = (0+0+90+70+100+70) / 6 = 330/6 = 55
phi_2 = (90+80+0+0+80+110) / 6 = 360/6 = 60
phi_3 = (90+100+90+110+0+0) / 6 = 390/6 = 65
```

Check: `55 + 60 + 65 = 180 = v({1,2,3})`. This is the **efficiency property** of the Shapley value — the shares always add up to exactly the total value generated, no more, no less. Player 3 gets the largest share, which matches intuition: they're part of the two highest-value pairs (`{1,3}=100` and `{2,3}=110`).

Here's the same computation done by brute force, for verification:

```python
from itertools import permutations

def shapley_values(players, v):
    n = len(players)
    totals = {p: 0 for p in players}

    for order in permutations(players):
        coalition = frozenset()
        for p in order:
            before = v(coalition)
            coalition = coalition | {p}
            after = v(coalition)
            totals[p] += after - before

    return {p: totals[p] / len(list(permutations(players))) for p in players}


def v(coalition):
    values = {
        frozenset(): 0,
        frozenset({1}): 0, frozenset({2}): 0, frozenset({3}): 0,
        frozenset({1,2}): 90, frozenset({1,3}): 100, frozenset({2,3}): 110,
        frozenset({1,2,3}): 180,
    }
    return values[coalition]

print(shapley_values([1, 2, 3], v))
# {1: 55.0, 2: 60.0, 3: 65.0}
```

## Why this particular math matters

Mixed strategies and the minimax theorem explain how to act rationally when there's no "safe" fixed choice — from bluffing in poker to randomizing security patrols so they can't be predicted. The Shapley value solves a different problem entirely: crediting individual contributions inside a team result, fairly and uniquely (it's the *only* allocation rule satisfying efficiency, symmetry, and a few other reasonable axioms).

That last point is why this math matters beyond economics. The exact same formula — average marginal contribution across all orderings — is what powers **SHAP** (SHapley Additive exPlanations), used to explain individual predictions from machine learning models by treating each input feature as a "player" and the model's output as the coalition's payoff. That's the connection this series has been building toward, and it's next.
