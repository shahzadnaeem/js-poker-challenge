class Poker {
  // Write your implementation here

  constructor() {
    this.cardScores = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      'J': 11,
      'Q': 12,
      'K': 13,
      'A': 14
    }
  }

  cardScore(card) {
    return this.cardScores[card] || 0;
  }

  handIsPair(hand) {
    return hand.length == 2 && (hand[0] === hand[1])
  }

  winningPair(hand1, hand2) {

    if (!this.handIsPair(hand1) && !this.handIsPair(hand2)) {
      return []
    } else if (this.handIsPair(hand1) && !this.handIsPair(hand2)) {
      return hand1
    } else if (!this.handIsPair(hand1) && this.handIsPair(hand2)) {
      return hand2
    } else {
      // Both hands are pairs
      if (this.cardScore(hand1[0]) > this.cardScore(hand2[0])) {
        return hand1
      } else {
        return hand2
      }
    }
  }

  // =========================================================================

  pairScore(pair) {
    if (this.handIsPair(pair)) {
      return 2 * this.cardScore(pair[0])
    } else {
      return 0
    }
  }

  winningPairFromArray(pairs) {
    let winningPair = []

    for (let i = 0; i < pairs.length; i++) {

      let pair = pairs[i]

      if (this.pairScore(pair) > this.pairScore(winningPair)) {
        winningPair = pair
      }
    }

    return winningPair
  }

  // =========================================================================


  handIsTriple(hand) {
    return hand[0] === hand[1] && hand[1] === hand[2]
  }

  pairFromHand(hand) {
    if (hand.length === 3 && !this.handIsTriple(hand)) {
      // Do we have two cards the same in this hand?
      // We look at each card and see if it exists anywhere else in the array
      //   [ 1, 2, 1 ]

      const cardElsewhere = hand.filter((card, index) => hand.indexOf(card) !== index)

      // If only 1 card was found elsewhere then we have a pair, return it
      if (cardElsewhere.length === 1) {
        return hand.filter(card => card === cardElsewhere[0])
      }
    }

    return []
  }

  tripleScore(hand) {
    if (this.handIsTriple(hand)) {
      return 3 * this.cardScore(hand[0])
    } else {
      return 0
    }
  }

  biggestHand(hand1, hand2) {
    if (hand1.length > hand2.length) {
      return hand1
    } else if (hand1.length < hand2.length) {
      return hand2
    } else {
      if (hand1.length === 0) {
        return []
      } else if (hand1.length === 2) {
        if (this.pairScore(hand1) > this.pairScore(hand2)) {
          return hand1
        } else {
          return hand2
        }
      } else if (hand1.length === 3) {
        if (this.tripleScore(hand1) > this.tripleScore(hand2)) {
          return hand1
        } else {
          return hand2
        }
      }
    }
  }

  winning3CardHand(hands) {
    let winningHand = []

    for (let i = 0; i < hands.length; i++) {

      let hand = hands[i]

      if (this.handIsTriple(hand)) {
        winningHand = this.biggestHand(winningHand, hand)
      } else if (this.handIsPair(hand)) {
        winningHand = this.biggestHand(winningHand, hand)
      } else if (hand.length === 3) {
        const possiblePair = this.pairFromHand(hand)
        winningHand = this.biggestHand(winningHand, possiblePair)
      }
    }

    return winningHand
  }

}

module.exports = Poker
