# Cashtel Assurance - Frontend React

Application web frontend pour la plateforme d'assurance Cashtel, construite avec React, TypeScript et Tailwind CSS.

## 🚀 Fonctionnalités

### Authentification et Autorisation
- Connexion/Inscription avec l'API Django
- Gestion des rôles (Individual, Organization, Provider, Member, Admin)
- Authentification JWT avec refresh tokens
- Protection des routes selon les rôles

### Modules par Rôle

#### 👤 Client (Individual)
- Dashboard avec statistiques personnelles
- Gestion des polices d'assurance
- Déclaration et suivi des sinistres
- Historique des paiements
- Profil utilisateur

#### 🏢 Organisation
- Gestion des employés
- Polices de groupe
- Rapports et analytics
- Tableau de bord organisationnel

#### 🤝 Agent/Provider
- Gestion de la clientèle
- Suivi des commissions
- Catalogue de produits
- Performance et statistiques

#### ⚙️ Admin
- Gestion globale des utilisateurs
- Supervision des agents et organisations
- Analytics système
- Configuration de la plateforme

### Services IA Intégrés
- Analyse automatique des réclamations
- Détection de fraude
- Recommandations personnalisées
- Chat assistant IA
- Évaluation des risques
- Génération de devis intelligents

### Fonctionnalités Avancées
- QR Code pour cartes d'assurance numériques
- Scanner de documents
- Notifications en temps réel
- Paiements sécurisés
- Interface responsive mobile-first
- Support multilingue (préparé)

## 🛠️ Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **État**: Context API, Local Storage
- **HTTP**: Fetch API native
- **QR Code**: qrcode, qr-scanner
- **Icons**: Lucide React
- **Build**: Vite

## 📦 Installation

1. **Cloner le repository**
```bash
git clone <repository-url>
cd cashtel-assurance-frontend
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
```bash
cp .env.example .env
```

Modifier `.env` avec vos configurations :
```env
REACT_APP_API_URL=http://localhost:8000/api
```

4. **Démarrer le serveur de développement**
```bash
npm run dev
```

## 🔧 Configuration API

L'application est configurée pour consommer l'API Django. Assurez-vous que :

1. **L'API Django est démarrée** sur `http://localhost:8000`
2. **CORS est configuré** pour accepter les requêtes depuis `http://localhost:5173`
3. **Les endpoints suivants sont disponibles** :
   - `POST /api/auth/login/` - Connexion
   - `POST /api/auth/register/` - Inscription
   - `POST /api/claims/analyze` - Analyse IA des réclamations
   - `GET /api/payment-methods` - Méthodes de paiement
   - Et tous les autres endpoints listés dans votre `urls.py`

## 🏗️ Structure du Projet

```
src/
├── components/           # Composants React
│   ├── auth/            # Authentification
│   ├── layout/          # Layout (Header, Sidebar, Footer)
│   ├── modules/         # Modules métier
│   ├── pages/           # Pages (404, Help)
│   └── ui/              # Composants UI réutilisables
├── contexts/            # Contexts React
├── services/            # Services API
├── types/               # Types TypeScript
└── utils/               # Utilitaires
```

## 🔐 Authentification

L'application utilise JWT pour l'authentification :

1. **Connexion** : Envoie username/password à `/api/auth/login/`
2. **Stockage** : Tokens stockés dans localStorage
3. **Autorisation** : Header `Authorization: Bearer <token>` sur chaque requête
4. **Refresh** : Gestion automatique du refresh token
5. **Déconnexion** : Nettoyage des tokens et redirection

## 🎨 Thème et Design

L'application utilise un système de couleurs cohérent :

- **Primary**: Orange (#FF6F0F)
- **Secondary**: Beige clair (#FFF0E6)
- **Light**: Gris très clair (#F8F8F9)
- **Dark**: Bleu foncé (#001D23)

## 📱 Responsive Design

- **Mobile First** : Conçu d'abord pour mobile
- **Breakpoints** : sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation** : Sidebar collapsible sur mobile
- **Touch Friendly** : Boutons et interactions optimisés pour le tactile

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e

# Coverage
npm run test:coverage
```

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

### Déploiement sur Netlify
```bash
npm run build
# Déployer le dossier dist/
```

### Variables d'environnement de production
```env
REACT_APP_API_URL=https://your-api-domain.com/api
NODE_ENV=production
```

## 🔧 Scripts Disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualisation du build
- `npm run lint` - Linting ESLint
- `npm run type-check` - Vérification TypeScript

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :

1. **Documentation** : Consultez ce README
2. **Issues** : Ouvrez une issue sur GitHub
3. **Email** : support@cashtelassurance.com

## 🔄 Changelog

### v1.0.0 (2024-12-XX)
- ✅ Intégration complète avec l'API Django
- ✅ Authentification JWT
- ✅ Modules pour tous les rôles utilisateur
- ✅ Services IA intégrés
- ✅ Interface responsive
- ✅ QR Code et scanner
- ✅ Système de notifications
- ✅ Gestion des paiements