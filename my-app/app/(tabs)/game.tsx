import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { colors } from '@/constants/Colors';

const WORDS = [
  'REACT', 'JAVASCRIPT', 'TYPESCRIPT', 'EXPO', 'NATIVE', 'COMPONENT', 'HOOK', 'PROPS', 'STATE',
  'ASYNC', 'PROMISE', 'FUNCTION', 'OBJECT', 'ARRAY', 'REDUX', 'CONTEXT', 'NAVIGATION', 'STYLES', 'LAYOUT',
  'ANDROID', 'IOS', 'MOBILE', 'PACKAGE', 'MODULE', 'COMPILER', 'BUNDLE', 'PERFORMANCE', 'ACCESSIBILITY',
  'TESTING', 'ALGORITHM', 'DATA', 'PORTFOLIO', 'DESIGN', 'INTERFACE'
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
        {/* Texto de erros em branco */}
        <Text style={styles.hangmanText}>Erros: {wrong} / {MAX_WRONG}</Text>
        <View style={styles.hangmanFigure}>
          {/* Boneco em branco */}
          <Text style={styles.figureLine}>{wrong > 0 ? 'O' : ''}</Text>
          <Text style={styles.figureLine}>{wrong > 1 ? '|' : ''}</Text>
          <Text style={styles.figureLine}>{wrong > 2 ? '/' : ''}{wrong > 3 ? ' ' : ''}{wrong > 4 ? '\\' : ''}</Text>
          <Text style={styles.figureLine}>{wrong > 5 ? '|' : ''}</Text>
        </View>
      </View>

      <View style={styles.wordBox}>
        {/* Letras da palavra em branco */}
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
    backgroundColor: colors.background || '#1e2a38', // Garante fundo escuro
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary, // Rosa do tema
    marginBottom: 12,
    textAlign: 'center',
  },
  hangmanContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  hangmanText: {
    color: '#FFFFFF', // Texto "Erros" em branco
    marginBottom: 6,
    fontSize: 16,
  },
  hangmanFigure: {
    alignItems: 'center',
    minHeight: 80, // Aumentei um pouco para caber o boneco
    justifyContent: 'center',
  },
  figureLine: {
    fontSize: 24, // Aumentei para o boneco ficar mais visível
    lineHeight: 26,
    color: '#FFFFFF', // Boneco em BRANCO
    fontWeight: 'bold',
  },
  wordBox: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Fundo sutil para a caixa da palavra
  },
  wordText: {
    fontSize: 32,
    letterSpacing: 6,
    color: '#FFFFFF', // Letras da palavra em BRANCO
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    marginRight: 8,
    color: '#FFFFFF', // Texto digitado em branco
    fontSize: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#1e2a38', // Texto do botão escuro para contraste com o rosa
    fontWeight: 'bold',
    fontSize: 16,
  },
  sub: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: colors.primary, // Títulos em Rosa
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
    justifyContent: 'center',
  },
  key: {
    width: 38,
    height: 38,
    borderRadius: 6,
    backgroundColor: '#3b4d63', // Teclas não usadas num tom de azul médio
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  keyText: {
    fontWeight: '700',
    color: '#FFFFFF', // Letras do teclado em branco
  },
  keyCorrect: {
    backgroundColor: '#2b8a3e', // Verde para acertos
  },
  keyWrong: {
    backgroundColor: '#b00020', // Vermelho para erros
    opacity: 0.6,
  },
  triedBox: {
    marginBottom: 20,
    alignItems: 'center',
  },
  triedText: {
    color: '#CCCCCC', // Letras tentadas em cinza claro
    fontSize: 16,
  },
  controls: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  winText: {
    color: '#4ade80', // Verde claro neon
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  loseText: {
    color: '#f87171', // Vermelho claro
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  restart: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  restartText: {
    color: '#1e2a38',
    fontWeight: 'bold',
    fontSize: 18,
  },
});