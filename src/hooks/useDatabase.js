import { useState, useEffect } from 'react';
import { Memory, Letter } from '../utils/db';

export const useDatabase = () => {
  const [memories, setMemories] = useState([]);
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carrega memórias do banco de dados
  const loadMemories = async () => {
    try {
      setLoading(true);
      const data = await Memory.find().sort({ date: -1 });
      setMemories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Adiciona uma nova memória
  const addMemory = async (memory) => {
    try {
      const newMemory = new Memory(memory);
      await newMemory.save();
      setMemories([newMemory, ...memories]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Carrega cartas do banco de dados
  const loadLetters = async () => {
    try {
      setLoading(true);
      const data = await Letter.find().sort({ createdAt: -1 });
      setLetters(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Adiciona uma nova carta
  const addLetter = async (letter) => {
    try {
      const newLetter = new Letter(letter);
      await newLetter.save();
      setLetters([newLetter, ...letters]);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadMemories();
    loadLetters();
  }, []);

  return {
    memories,
    letters,
    loading,
    error,
    addMemory,
    addLetter,
    refresh: () => {
      loadMemories();
      loadLetters();
    }
  };
};