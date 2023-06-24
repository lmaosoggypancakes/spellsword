<template>
        <h1>Welcome to Spellsword!</h1>
        <img src="/logo.png" class="w-64 h-64 mx-auto" />
        <p>
            Spellsword is an interactive, multiplayer game that's aimed to enhance our
            command of the english language. Our philosophy is that through competetive
            challenges, we can learn new vocabulary at a faster rate.
        </p>
        <hr />
        <h3>Game Overview</h3>
        <p>
            Spellsword is an online, multiplayer game played between two players. Users
            race against the clock to create a word from a predefined (but random) set of characters
            that both teams must conform to. Here are some general rules:
            </p>
    <ol>
        <li>In order for your word to be considered valid, it must be a part of the English language and have an agreed-upon definition. As such, slang is often not considered a valid word in Spellsword.</li>
        <li>
            <p>
                Your word must incorporate characters that only a part of the shared set.
            </p>
            <ul>
                <li>Unless there are multiple occurances in the sequences of letters, characters may only be used once or not at all.</li>
                <li>Your word must be at least 2 characters long. Therefore, words like "a" or "I", even though they are valid in the English language, are not considered valid in Spellsword (try to find more challenging moves! Remember: the aim of the game is not to win, but to enhance your vocabulary!)</li>
                <li>For example, if your sequence of letters is <code>PTROENLMRTO</code>, then <code>PROTON</code> is a valid word, because there are at least two <code>O</code>'s in the sequence</li>
                <li>However, the word <code>PROBLEM</code> would not be a valid word; there is no <code>B</code> in the provided sequence.</li>
            </ul>
        </li>
        <li>Each word is given a <i>score</i>; words with more complexity are given more points. The first user to reach <strong>30 points</strong> automatically wins. See the <Link href="/app/learn/scoring">scoring guidelines</Link> for more details.</li>
        <li>Every invalid guess is given a <i>fault</i> to the user who made the guess. Users who make 3 <i>faults</i> before either player reaches 30 <i>points</i> automatically lose the match.</li>
        <li>
            <p>There are 3 possible states to the game's final result:</p>
            <ul>
                <li><i>Loss:</i> your opponent reached 30 points, <strong>and/or</strong> you made 3 <i>faults</i>.</li>
                <li><i>Win:</i> you reached 30 points (yay!), <strong>and/or</strong> your opponent made 3 <i>faults</i>.</li>
                <li><i>Draw:</i> either both players have reached 30 points, or both players have made 3 <i>faults</i></li> 
            </ul>
            <blockquote>
                How can both players exceed 30 points, if a winner is determined automatically?
            </blockquote>
            <p>
                After a <i>winning</i> state is reached (i.e, one player scored above 30 points or made 3 <i>faults</i>), the other player will make a <i>final</i> move.
                <ul>
                    <li>Consider a situation in which <i>Player 1</i> has 27 points, and <i>Player 2</i> has 29. After <i>Player 1</i> makes a guess that gives him 5 points, he is now at 32 points. <i>Player 2</i> is now prompted to move.</li>
                    <li>If <i>Player 2</i> makes a guess worth more than 1 point (such that <i>Player 2</i>'s combined score will be greater than 30 as well'), the game is a draw. </li>
                    <li>The same applies to <i>faults</i> in the same way. If both players have 2 <i>faults</i>, and <i>Player 1</i> makes one more fault, then the game is a draw if <i>Player 2</i> makes a fault immediately after.</li>

                </ul>
            </p>
        </li>
    </ol>
    <ButtonGroup>
        <Next href="scoring">Scoring</Next>
    </ButtonGroup>
</template>
<script setup lang="ts">
definePageMeta({
    layout: "learn",

});
</script>
