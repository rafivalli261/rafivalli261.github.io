---
title: "Game Theory in Practice"
date: 2026-02-22
description: "An explanations on how game theory works and what are the implementation"
tags: ["game theory", "research"]
draft: false
---

In this vast world of information, there are millions of concepts lying to be found. Discoveries among researchers have become major debates over centuries — one could complete another, one could refute another, one could support each other. One of them is called **game theory**, which is quite different from what you might be thinking if you're a gamer.

Game theory is the mathematical study of strategic decision-making: what happens when the outcome of your choice depends not just on what you do, but on what everyone else involved decides to do too. It was formalized by John von Neumann and Oskar Morgenstern in their 1944 book *Theory of Games and Economic Behavior*, and later extended by John Nash, whose equilibrium concept (more on that below) is still the backbone of the field. Since then it has quietly spread far beyond economics — into biology (why do animals cooperate or fight?), computer science (how do you design an auction that can't be gamed?), and more recently, machine learning, where it underpins tools like SHAP for explaining model predictions.

## The building blocks

Every game, no matter how complex, is built from three ingredients:

- **Players** — the decision-makers. Could be two people, two companies, or a person and an algorithm.
- **Strategies** — the set of choices available to each player.
- **Payoffs** — the outcome (often a number representing utility, profit, or points) each player receives, depending on the combination of strategies everyone chose.

The classic way to represent a simple two-player game is a **payoff matrix**. Each cell shows the payoff to (row player, column player) for that pair of strategies.

## The Prisoner's Dilemma

The most famous example in game theory is the Prisoner's Dilemma. Two suspects are interrogated separately. Each can either **stay silent** (cooperate with each other) or **betray** the other (defect). Here's the payoff matrix, where the numbers represent years of prison avoided (higher is better):

| | Suspect B: Silent | Suspect B: Betray |
|---|---|---|
| **Suspect A: Silent** | 3, 3 | 0, 5 |
| **Suspect A: Betray** | 5, 0 | 1, 1 |

If both stay silent, they each get a light sentence. If both betray, they both get a heavier one. But if one betrays while the other stays silent, the betrayer walks free while the other takes the fall.

Look at it from Suspect A's point of view: no matter what B does, A is always better off betraying. The same logic applies to B. So both rationally choose to betray — even though staying silent together would have given both a better outcome. This is what makes the dilemma interesting: **individually rational choices lead to a collectively worse result.**

## Nash equilibrium

This "everyone betrays" outcome is an example of a **Nash equilibrium** — a set of strategies where no player can improve their own payoff by changing their strategy alone, given what everyone else is doing. In notation, a strategy profile `(s1*, s2*, ..., sn*)` is a Nash equilibrium if, for every player `i`:

```
payoff_i(si*, s-i*) >= payoff_i(si', s-i*)   for every alternative strategy si'
```

In plain words: given everyone else's choices, you have nothing to gain by switching. It doesn't mean the outcome is *good* — the Prisoner's Dilemma equilibrium is worse for both players than mutual cooperation — it just means it's *stable*. No one has an incentive to unilaterally deviate.

Here's a small script that finds all pure-strategy Nash equilibria for a two-player game, given its payoff matrices:

```python
def find_nash_equilibria(payoff_a, payoff_b):
    """
    payoff_a, payoff_b: 2D lists, payoff_a[i][j] / payoff_b[i][j]
    is the payoff to player A / B when A plays row i and B plays column j.
    """
    rows, cols = len(payoff_a), len(payoff_a[0])
    equilibria = []

    for i in range(rows):
        for j in range(cols):
            # Is row i A's best response to column j?
            a_best = all(payoff_a[i][j] >= payoff_a[i2][j] for i2 in range(rows))
            # Is column j B's best response to row i?
            b_best = all(payoff_b[i][j] >= payoff_b[i][j2] for j2 in range(cols))

            if a_best and b_best:
                equilibria.append((i, j))

    return equilibria


# Prisoner's Dilemma: 0 = Silent, 1 = Betray
payoff_a = [[3, 0], [5, 1]]
payoff_b = [[3, 5], [0, 1]]

print(find_nash_equilibria(payoff_a, payoff_b))
# [(1, 1)]  -> both betray, exactly as predicted above
```

Running this on the Prisoner's Dilemma matrix confirms the intuition: `(Betray, Betray)` is the only stable outcome, even though `(Silent, Silent)` produces more total payoff.

## Not every game is a trap

The Prisoner's Dilemma gets the spotlight because it's counterintuitive, but it's just one flavor of game. A few other distinctions worth knowing:

- **Zero-sum vs. non-zero-sum**: in a zero-sum game (like chess, or splitting a fixed pie) one player's gain is exactly another's loss. Most real-world situations, including the Prisoner's Dilemma, are non-zero-sum — cooperation can grow the total payoff for everyone.
- **Cooperative vs. non-cooperative**: cooperative game theory assumes players can form binding agreements and asks how they should fairly split the joint reward. This branch is what gives us the *Shapley value* — a way of distributing credit for a team's total payoff to each individual member, based on their average marginal contribution. It's a neat idea on its own, and it happens to be the exact same math that powers SHAP, a popular technique for explaining machine learning model predictions — something I plan to write about next.
- **Simultaneous vs. sequential**: the games above are simultaneous (both players choose at once). Sequential games, where players move in turn and can react to what's already happened, need a different toolkit entirely (game trees, backward induction) — a topic for another post.

## Why it matters

Game theory shows up anywhere outcomes depend on more than one decision-maker: auction design (how eBay and ad exchanges price bids), evolutionary biology (why cooperation persists even when cheating pays short-term), voting systems, negotiation, and — as mentioned above — explaining what's going on inside a machine learning model. The common thread is always the same: model the players, the strategies, and the payoffs, then ask what stable outcome the incentives point toward.

That's the toolkit. Next up: using it — specifically the Shapley value — to pry open a black-box model with SHAP.
