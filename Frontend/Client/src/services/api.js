import axios from "axios";

const API = "http://localhost:5000/api";

// 🔹 Summary
export const summarizeText = (data) => {
  return axios.post(`${API}/summarize`, data);
};

// 🔹 Quiz
export const generateQuiz = (text, difficulty, questionCount) => {
  return axios.post(`${API}/quiz`, {
    text,
    difficulty,
    questionCount,
  });
};

// 🔥 SAVE SCORE (MISSING THA)
export const saveScore = (data) => {
  return axios.post(`${API}/scores`, data);
};

// 🔥 GET SCORES
export const getScores = () => {
  return axios.get(`${API}/scores`);
};

// 🔥 History
export const getHistory = () => {
  return axios.get(`${API}/history`);
};

export const deleteHistory = (id) => {
  return axios.delete(`${API}/history/${id}`);
};

export const updateHistory = (id, data) => {
  return axios.put(`${API}/history/${id}`, data);
};