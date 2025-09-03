import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Configurar provedor do Google
const googleProvider = new GoogleAuthProvider();

export const authService = {
  // Login com Firebase
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Buscar dados adicionais do usuário no Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;
      
      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          ...userData
        }
      };
    } catch (error) {
      return {
        success: false,
        message: this.getFirebaseError(error.code)
      };
    }
  },

  // Login com Google
  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Verificar se é um novo usuário
      const isNewUser = result._tokenResponse?.isNewUser;
      
      // Se for um novo usuário, criar documento no Firestore
      if (isNewUser) {
        const userDoc = {
          uid: user.uid,
          email: user.email,
          nome: user.displayName || '',
          apelido: user.displayName?.split(' ')[0] || '',
          dataCriacao: new Date().toISOString(),
          dataAniversario: null,
          fotoPerfil: user.photoURL || '',
          configuracao: {
            tema: 'escuro',
            notificacoes: true,
            privacidadePadrao: 'casal'
          }
        };
        
        await setDoc(doc(db, 'users', user.uid), userDoc);
        
        return {
          success: true,
          user: userDoc
        };
      } else {
        // Usuário existente - buscar dados do Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.exists() ? userDoc.data() : null;
        
        return {
          success: true,
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified,
            ...userData
          }
        };
      }
    } catch (error) {
      return {
        success: false,
        message: this.getFirebaseError(error.code)
      };
    }
  },

  // Registro com Firebase
  async register(userData) {
    try {
      const { email, password, nome, apelido } = userData;
      
      // Criar usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Atualizar perfil do usuário
      await updateProfile(user, {
        displayName: nome
      });
      
      // Criar documento do usuário no Firestore
      const userDoc = {
        uid: user.uid,
        email: user.email,
        nome,
        apelido,
        dataCriacao: new Date().toISOString(),
        dataAniversario: null,
        fotoPerfil: '',
        configuracao: {
          tema: 'escuro',
          notificacoes: true,
          privacidadePadrao: 'casal'
        }
      };
      
      await setDoc(doc(db, 'users', user.uid), userDoc);
      
      // Enviar email de verificação
      await sendEmailVerification(user);
      
      return {
        success: true,
        user: userDoc
      };
    } catch (error) {
      return {
        success: false,
        message: this.getFirebaseError(error.code)
      };
    }
  },

  // Logout
  async logout() {
    try {
      await signOut(auth);
      this.clearAuthData();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: this.getFirebaseError(error.code)
      };
    }
  },

  // Recuperar senha
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: 'Email de recuperação enviado!' };
    } catch (error) {
      return {
        success: false,
        message: this.getFirebaseError(error.code)
      };
    }
  },

  // Verificar se usuário está logado
  isAuthenticated() {
    return auth.currentUser !== null;
  },

  // Obter usuário atual
  getCurrentUser() {
    return auth.currentUser;
  },

  // Salvar dados no localStorage
  setAuthData(userData) {
    localStorage.setItem('user_data', JSON.stringify(userData));
  },

  // Obter dados do localStorage
  getUser() {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  },

  // Limpar dados de autenticação
  clearAuthData() {
    localStorage.removeItem('user_data');
  },

  // Traduzir erros do Firebase
  getFirebaseError(errorCode) {
    const errors = {
      'auth/invalid-email': 'Email inválido',
      'auth/user-disabled': 'Usuário desativado',
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/wrong-password': 'Senha incorreta',
      'auth/email-already-in-use': 'Email já está em uso',
      'auth/weak-password': 'Senha muito fraca',
      'auth/operation-not-allowed': 'Operação não permitida',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
      'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.',
      'auth/popup-closed-by-user': 'Login cancelado pelo usuário',
      'auth/popup-blocked': 'Popup bloqueado. Permita popups para este site.',
      'auth/cancelled-popup-request': 'Múltiplas tentativas de popup detectadas'
    };
    
    return errors[errorCode] || 'Erro desconhecido. Tente novamente.';
  },

  // Observar mudanças de estado de autenticação
  onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
  }
};

// Configurar observador de estado de autenticação
auth.onAuthStateChanged(async (user) => {
  if (user) {
    // Usuário logado - buscar dados do Firestore
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        authService.setAuthData(userData);
      } else {
        // Se não existir documento, criar um básico
        const basicUserData = {
          uid: user.uid,
          email: user.email,
          nome: user.displayName || '',
          apelido: user.displayName?.split(' ')[0] || '',
          dataCriacao: new Date().toISOString(),
          fotoPerfil: user.photoURL || ''
        };
        authService.setAuthData(basicUserData);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  } else {
    // Usuário deslogado
    authService.clearAuthData();
  }
});

export default authService;