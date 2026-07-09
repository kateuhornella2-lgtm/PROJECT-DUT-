import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || window.location.origin}/api`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const inscription = (data) => API.post('/auth/inscription', data);
export const connexion = (data) => API.post('/auth/connexion', data);
export const connexionAdmin = (data) => API.post('/auth/admin/connexion', data);
export const getMesDemandes = () => API.get('/demandes/mes-demandes');
export const getDemandeById = (id) => API.get(`/demandes/${id}`);
export const creerDemande = (data) => API.post('/demandes', data);
export const verifierParCode = (code, typeActe) => API.get(`/demandes/verifier/${code}`, { params: typeActe ? { typeActe } : {} });
export const uploadDocuments = (demandeId, formData) =>
  API.post(`/documents/${demandeId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
export const getDemandesAdmin = (params) => API.get('/admin/demandes', { params });
export const accepterDemande = (id, data) => API.patch(`/admin/demandes/${id}/accepter`, data);
export const rejeterDemande = (id, data) => API.patch(`/admin/demandes/${id}/rejeter`, data);
export const motDePasseOublie = (data) => API.post('/auth/mot-de-passe-oublie', data);
export const reinitialiserMotDePasse = (data) => API.post('/auth/reinitialiser-mot-de-passe', data);
export default API;
