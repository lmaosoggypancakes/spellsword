<template>
  <h1>Scoring Guidelines</h1>
  <p>
    If you're more into the competetive aspect of Spellsword, you may be curious
    as to how guesses are scored in order to maximize points.
  </p>
  <hr />
  <h3>The Formula</h3>
  <code class="language-js">
    points(word) = len(word) + round(consonants / vowels)
  </code>
  <hr />
  <p>
    In essense, <strong>words are scored accoring to their length. </strong>A
    word like <i>absolutely</i> will get more points than <i>please</i>, for
    example. To encourage forming more complex words, however, we have added
    another factor to the formula. In addition to the length of the word, a
    guess' score is also determined by the consonant-to-vowel ration (CV ratio).
    That is, words with more consonants than vowels will get more points than
    vice versa.
  </p>
  <ul>
    <li>
      For example, the word <strong>PROTON</strong> gets 6 +
      <code>round(4 / 2)</code> = 8 points
    </li>
    <li>
      On the other hand, the word <strong>LENGTH</strong> gets 6 +
      <code>round(4 / 1)</code> = 12 points
    </li>
  </ul>
  <p>
    The philosophy behind this is that objectively rarer words tend to have less
    vowels. Competetive players looking to maximize their score might deem it
    necessary to spend the extra seconds looking for a more <i>complex</i> word
    in order to gain more points from the CV ratio.
  </p>
  <aside>
    However, this does NOT mean that if you see an objectively simpler word,
    then you should ignore it. For most players, just the length of a word alone
    is enough to win by points.
  </aside>
  <hr />
  <h3>For the Advanced Player</h3>
  <p>
    In highly competetive matches between skilled players, the CV ratio term
    should be maximized. In the scoring process, consonants and vowels are inversely proportional; that is, the more consonants you have than words, the greater your score will be. For example:
    <ul>
        <li>
            A word with 4 consonants and 3 vowels will get <code>round(4 / 3)</code> = <strong>1 point</strong> added to their total score.
        </li>
        <li>
            A word with 5 consonants and 2 vowels will get <code>round(5 / 2)</code> = <strong>3 points</strong> added to their total score.
        </li>
    </ul>
    <p>From a mathematical perspective, this models the form of <code>y = 1/x</code>, where <code>x</code> is the number of vowels. Do note, however, that making a move that maximizes the CV ratio comes at a great risk, as we have found that these kinds of words will be difficult to find, and so you run the risk of a greater chance of getting a <i>fault</i>.</p>
  </p>
  <ButtonGroup>
    <Previous href="basics">Basics</Previous>
    <Next href="strategy">Strategy Ideas</Next>
  </ButtonGroup>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "learn",
});
</script>
