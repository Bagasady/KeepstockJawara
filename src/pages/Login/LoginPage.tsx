import React, { useState, useEffect } from 'react';
import { User, KeyRound, ArrowRight, Sparkles, TrendingUp, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../store/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // Animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStep(1), 200);
    const timer2 = setTimeout(() => setAnimationStep(2), 600);
    const timer3 = setTimeout(() => setAnimationStep(3), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }
    
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await login(username, password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const FloatingIcon = ({ icon: Icon, delay, className }: { icon: any, delay: number, className: string }) => (
    <div 
      className={`absolute opacity-20 animate-pulse ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '3s'
      }}
    >
      <Icon size={24} />
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Floating Icons */}
      <FloatingIcon icon={BarChart3} delay={0} className="top-20 left-20 text-blue-400" />
      <FloatingIcon icon={TrendingUp} delay={1} className="top-32 right-32 text-purple-400" />
      <FloatingIcon icon={Sparkles} delay={2} className="bottom-32 left-32 text-pink-400" />
      <FloatingIcon icon={BarChart3} delay={3} className="bottom-20 right-20 text-blue-400" />
      
      {/* Main Login Container */}
      <div className={`max-w-md w-full relative z-10 transform transition-all duration-1000 ${
        animationStep >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        
        {/* Header Section */}
        <div className={`text-center mb-8 transform transition-all duration-1000 delay-300 ${
          animationStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
            <BarChart3 size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">KeepStock</h1>
          <p className="text-gray-300">Advanced Inventory Management</p>
        </div>
        
        {/* Login Form */}
        <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 transform transition-all duration-1000 delay-500 ${
          animationStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm flex items-center backdrop-blur-sm animate-shake">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Input
                  label="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError(null);
                  }}
                  placeholder="Enter your username"
                  icon={<User size={18} />}
                  fullWidth
                  className="login-input"
                />
              </div>
              
              <div className="relative group">
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  placeholder="Enter your password"
                  icon={<KeyRound size={18} />}
                  fullWidth
                  className="login-input"
                />
              </div>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={isLoading}
              icon={isLoading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div> : <ArrowRight size={18} />}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          
          {/* Sample Credentials */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-sm text-gray-300 text-center mb-4">Demo Credentials:</p>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white/5 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                   onClick={() => {
                     setUsername('admin');
                     setPassword('admin123');
                   }}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-white">Administrator</p>
                    <p className="text-xs text-gray-400">Full system access</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-purple-300">admin</p>
                    <p className="text-xs text-gray-400">admin123</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer text-center"
                     onClick={() => {
                       setUsername('XPTN');
                       setPassword('@JC5008');
                     }}>
                  <p className="font-medium text-white text-sm">XPTN Store</p>
                  <p className="text-xs text-gray-400">XPTN / @JC5008</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer text-center"
                     onClick={() => {
                       setUsername('XPDN');
                       setPassword('@JC2004');
                     }}>
                  <p className="font-medium text-white text-sm">XPDN Store</p>
                  <p className="text-xs text-gray-400">XPDN / @JC2004</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Secure • Reliable • Modern
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;