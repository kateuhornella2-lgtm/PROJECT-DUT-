import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { inscription } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FileText, User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle, Shield, Key, QrCode } from 'lucide-react';

export default function Inscription() {
  const navigate = useNavigate();
  const { loginCitoyen } = useAuth();
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', motDePasse: '', telephone: '', cni: '' });
  
  const [erreur, setErreur] = useState('');
  const [chargement, setChargement] = useState(false);
  const [voirMdp, setVoirMdp] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // CNI uploads removed — no handler needed

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');

    setChargement(true);
    try {
      const payload = { ...form };

      const res = await inscription(payload);
      loginCitoyen(res.data.token, res.data.utilisateur);
      navigate('/dashboard');
    } catch (err) {
      setErreur(err.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Panneau gauche */}
      <div className="hidden md:flex flex-col justify-between w-2/5 p-10 text-white"
        style={{ background: 'linear-gradient(160deg, #16a34a 0%, #15803d 50%, #a3e635 100%)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <FileText size={18} color="white" />
          </div>
          <div>
            <p className="font-bold leading-tight">e-Mairie Douala</p>
            <p className="text-green-200 text-xs">Ville de Douala</p>
          </div>
        </div>

          {/* Selfie removed per request */}
        <div>
          <h2 className="text-3xl font-bold mb-4 leading-tight">Inscription sécurisée</h2>
          <p className="text-green-100 mb-6">Votre CNI est requise pour garantir l'authenticité de vos demandes administratives.</p>
         
          <div className="space-y-3">
            {[
              { Icon: Shield, text: 'Numéro CNI requis' },
              { Icon: Key, text: 'Code unique pour chaque demande' },
              { Icon: QrCode, text: 'QR code envoyé par email' },
              { Icon: CheckCircle, text: 'Vérification possible sans connexion' },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={16} color="white" />
                </div>
                <span className="text-green-100 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-green-200 text-xs">© 2026 Communauté Urbaine de Douala</p>
      </div>

      {/* Panneau droit */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-8 flex items-start justify-center">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-6 md:hidden">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <FileText size={16} color="white" />
            </div>
            <p className="font-bold text-gray-900">e-Mairie Douala</p>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Créer un compte</h1>
          <p className="text-gray-500 text-sm mb-6">
            Déjà inscrit ?{' '}
            <Link to="/connexion" className="text-green-600 font-semibold hover:underline">Se connecter</Link>
          </p>

          {erreur && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm">
              ⚠️ {erreur}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* CNI uploads removed per request */}

            {/* Nom & Prénom */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="nom" value={form.nom} onChange={handleChange} required
                    className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    placeholder="Nzepang" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input name="prenom" value={form.prenom} onChange={handleChange} required
                    className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    placeholder="Soleil" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="email" type="email" value={form.email} onChange={handleChange} required
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  placeholder="exemple@gmail.com" />
              </div>
            </div>

            {/* Numéro CNI */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de la carte d'identité (CNI) *</label>
              <div className="relative">
                <Shield size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="cni" value={form.cni} onChange={handleChange} required
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  placeholder="1234567890" />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <div className="relative">
                <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="telephone" value={form.telephone} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  placeholder="6XXXXXXXX" />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="motDePasse" type={voirMdp ? 'text' : 'password'}
                  value={form.motDePasse} onChange={handleChange} required
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  placeholder="Minimum 6 caractères" />
                <button type="button" onClick={() => setVoirMdp(!voirMdp)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {voirMdp ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={chargement}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50">
              {chargement ? 'Création en cours...' : 'Créer mon compte'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
