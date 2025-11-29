import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { colors } from '@/constants/Colors';

const WORDS = [
  'REACT', 'JAVASCRIPT', 'TYPESCRIPT', 'EXPO', 'NATIVE', 'COMPONENT', 'HOOK', 'PROPS', 'STATE',
  'ASYNC', 'PROMISE', 'FUNCTION', 'OBJECT', 'ARRAY', 'REDUX', 'CONTEXT', 'NAVIGATION', 'STYLES', 'LAYOUT',
  'ANDROID', 'IOS', 'MOBILE', 'PACKAGE', 'MODULE', 'COMPILER', 'BUNDLE', 'PERFORMANCE', 'ACCESSIBILITY',
  'TESTING', 'ALGORITHM', 'DATA'
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const MAX_WRONG = 6;

function pickRandomWord() {
  const idx = Math.floor(Math.random() * WORDS.length);
  return WORDS[idx];
}

export default function GameScreen() {
  const [word, setWord] = useState<string>(() => pickRandomWord());
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  useEffect(() => {
    checkStatus();
  }, [guessed, wrong, word]);

  function resetGame() {
    setWord(pickRandomWord());
    setGuessed(new Set());
    setWrong(0);
    setInput('');
    setStatus('playing');
  }

  function checkStatus() {
    const letters = Array.from(new Set(word.split('')));
    const guessedAll = letters.every((l) => guessed.has(l));
    if (guessedAll) setStatus('won');
    else if (wrong >= MAX_WRONG) setStatus('lost');
    else setStatus('playing');
  }

  function guessLetter(letter: string) {
    if (status !== 'playing') return;
    letter = letter.toUpperCase();
    if (guessed.has(letter)) return;
    const newSet = new Set(guessed);
    newSet.add(letter);
    setGuessed(newSet);
    if (!word.includes(letter)) {
      setWrong((w) => w + 1);
    }
  }

  function onSubmitInput() {
    if (!input) return;
    const ch = input[0].toUpperCase();
    if (/[A-Z]/.test(ch)) guessLetter(ch);
    setInput('');
  }

  const display = useMemo(() => {
    return word
      .split('')
      .map((ch) => (guessed.has(ch) ? ch : '_'))
      .join(' ');
  }, [word, guessed]);

  const tried = useMemo(() => Array.from(guessed), [guessed]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Jogo da Forca</Text>

      <View style={styles.hangmanContainer}>
        <Text style={styles.hangmanText}>Erros: {wrong} / {MAX_WRONG}</Text>
        <View style={styles.hangmanFigure}>
          <Text style={styles.figureLine}>{wrong > 0 ? 'O' : ''}</Text>
          <Text style={styles.figureLine}>{wrong > 1 ? '|' : ''}</Text>
          <Text style={styles.figureLine}>{wrong > 2 ? '/' : ''}{wrong > 3 ? ' ' : ''}{wrong > 4 ? '\\' : ''}</Text>
          <Text style={styles.figureLine}>{wrong > 5 ? '|' : ''}</Text>
        </View>
      </View>

      <View style={styles.wordBox}>
        <Text style={styles.wordText}>{display}</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          maxLength={1}
          style={styles.input}
          placeholder="Digite uma letra"
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="characters"
          editable={status === 'playing'}
        />
        <TouchableOpacity style={styles.button} onPress={onSubmitInput} disabled={status !== 'playing'}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sub}>Teclado</Text>
      <View style={styles.keyboard}>
        {ALPHABET.map((l) => {
          const used = guessed.has(l);
          const correct = used && word.includes(l);
          return (
            <TouchableOpacity
              key={l}
              onPress={() => guessLetter(l)}
              disabled={used || status !== 'playing'}
              style={[
                styles.key,
                used && (correct ? styles.keyCorrect : styles.keyWrong),
              ]}
            >
              <Text style={styles.keyText}>{l}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.triedBox}>
        <Text style={styles.sub}>Letras tentadas</Text>
        <Text style={styles.triedText}>
          {tried.length ? tried.join(', ') : 'Nenhuma ainda'}
        </Text>
      </View>

      <View style={styles.controls}>
        {status === 'won' && (
          <Text style={styles.winText}>Parabéns! Você ganhou! Palavra: {word}</Text>
        )}
        {status === 'lost' && (
          <Text style={styles.loseText}>Você perdeu! A palavra era: {word}</Text>
        )}

        <TouchableOpacity style={styles.restart} onPress={resetGame}>
          <Text style={styles.restartText}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background || '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  hangmanContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  hangmanText: {
    color: colors.textSecondary,
    marginBottom: 6,
  },
  hangmanFigure: {
    alignItems: 'center',
    minHeight: 60,
  },
  figureLine: {
    fontSize: 18,
    lineHeight: 20,
    color: '#333',
  },
  wordBox: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    marginBottom: 12,
    alignItems: 'center',
  },
  wordText: {
    fontSize: 28,
    letterSpacing: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 6,
    marginRight: 8,
    color: '#000',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  sub: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  } as any,
  key: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  keyText: {
    fontWeight: '700',
  },
  keyCorrect: {
    backgroundColor: '#c8f7dc',
  },
  keyWrong: {
    backgroundColor: '#f7c8c8',
  },
  triedBox: {
    marginBottom: 16,
  },
  triedText: {
    color: colors.textSecondary,
  },
  controls: {
    alignItems: 'center',
    marginTop: 8,
  },
  winText: {
    color: '#2b8a3e',
    fontWeight: '700',
    marginBottom: 10,
  },
  loseText: {
    color: '#b00020',
    fontWeight: '700',
    marginBottom: 10,
  },
  restart: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  restartText: {
    color: '#fff',
    fontWeight: '700',
  },
});
