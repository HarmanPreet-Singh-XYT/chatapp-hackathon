'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MailIcon, 
  LockIcon, 
  GithubIcon,
  LinkedinIcon,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AuthPage = () => {
  const router = useRouter();
  const [authMode, setAuthMode] = useState('signup'); // signup, signin, reset
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    companyName: '',
    termsAgreed: false
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Advanced password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  // Validation logic
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Additional validation for signup
    if (authMode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Social login handlers with redirect
  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate OAuth process
    setTimeout(() => {
      // In a real app, you'd verify the Google auth response
      console.log('Google Login Successful');
      setIsLoading(false);
      router.push('/chat');
    }, 1500);
  };

  const handleGitHubLogin = () => {
    setIsLoading(true);
    // Simulate OAuth process
    setTimeout(() => {
      // In a real app, you'd verify the GitHub auth response
      console.log('GitHub Login Successful');
      setIsLoading(false);
      router.push('/chat');
    }, 1500);
  };

  const handleLinkedInLogin = () => {
    setIsLoading(true);
    // Simulate OAuth process
    setTimeout(() => {
      // In a real app, you'd verify the LinkedIn auth response
      console.log('LinkedIn Login Successful');
      setIsLoading(false);
      router.push('/chat');
    }, 1500);
  };

  // Simple direct auth with redirect
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    setError('');
    
    if (validateForm()) {
      setIsLoading(true);

      try {
        if (authMode === 'signin') {
          // Simulate login API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          console.log('User logged in:', formData.email);
          // After successful login, redirect to chat
          router.push('/chat');
        } else if (authMode === 'signup') {
          // Simulate registration API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          const fullName = `${formData.firstName} ${formData.lastName}`.trim();
          console.log('User registered:', {
            email: formData.email,
            name: fullName,
            phone: formData.phoneNumber
          });
          // After successful registration, redirect to chat
          router.push('/chat');
        } else if (authMode === 'reset') {
          // Simulate password reset
          await new Promise(resolve => setTimeout(resolve, 1500));
          console.log('Password reset requested for', formData.email);
          // Show success message instead of redirect
          setError('');
          alert('Password reset link has been sent to your email!');
        }
      } catch (err) {
        setError('Authentication failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Switch auth mode and clear errors
  const switchAuthMode = (mode: string) => {
    setAuthMode(mode);
    setFormErrors({});
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visualization Section */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative z-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {authMode === 'signup' 
                  ? 'Create Your Account' 
                  : authMode === 'signin' 
                  ? 'Welcome Back' 
                  : 'Reset Password'}
              </h2>
              <p className="text-white/80 mb-8">
                {authMode === 'signup' 
                  ? 'Join our platform and unlock new possibilities' 
                  : authMode === 'signin' 
                  ? 'Securely access your personal dashboard' 
                  : 'Reset your account password'}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-1 bg-white/30"></div>
                  <span className="text-white/70">Secure & Advanced</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-1 bg-white/30"></div>
                  <span className="text-white/70">Enterprise Grade</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Authentication Form Section */}
          <div className="p-8 md:p-12">
            {/* Auth Mode Switcher */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex space-x-2">
                <Button 
                  variant={authMode === 'signup' ? 'default' : 'outline'}
                  onClick={() => switchAuthMode('signup')}
                  disabled={isLoading}
                >
                  Sign Up
                </Button>
                <Button 
                  variant={authMode === 'signin' ? 'default' : 'outline'}
                  onClick={() => switchAuthMode('signin')}
                  disabled={isLoading}
                >
                  Sign In
                </Button>
              </div>
              {authMode === 'signin' && (
                <Button 
                  variant="link"
                  onClick={() => switchAuthMode('reset')}
                  disabled={isLoading}
                  className="text-blue-600"
                >
                  Forgot Password?
                </Button>
              )}
            </div>
            
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Social Login Options */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Button 
                variant="outline" 
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="flex items-center justify-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  className="mr-2"
                >
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-1 7.27-2.69l-3.57-2.75c-.99.67-2.26 1.07-3.7 1.07-2.85 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.46 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button 
                variant="outline" 
                onClick={handleGitHubLogin}
                disabled={isLoading}
                className="flex items-center justify-center"
              >
                <GithubIcon className="mr-2" />
                GitHub
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLinkedInLogin}
                disabled={isLoading}
                className="flex items-center justify-center"
              >
                <LinkedinIcon className="mr-2" />
                LinkedIn
              </Button>
            </div>

            <Separator className="mb-6" />

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-neutral-600 mb-2">First Name</label>
                    <Input 
                      placeholder="Enter first name" 
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
                      disabled={isLoading}
                      className={formErrors.firstName ? "border-red-500" : ""}
                    />
                    {formErrors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-600 mb-2">Last Name</label>
                    <Input 
                      placeholder="Enter last name" 
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({...prev, lastName: e.target.value}))}
                      disabled={isLoading}
                      className={formErrors.lastName ? "border-red-500" : ""}
                    />
                    {formErrors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm text-neutral-600 mb-2">Email Address</label>
                <div className="relative">
                  <Input 
                    placeholder="Enter your email" 
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                    disabled={isLoading}
                    className={formErrors.email ? "border-red-500 pl-10" : "pl-10"}
                  />
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>

              <div className="relative">
                <label className="block text-sm text-neutral-600 mb-2">Password</label>
                <div className="relative">
                  <Input 
                    type="password"
                    placeholder="Enter your password" 
                    value={formData.password}
                    onChange={(e) => {
                      const password = e.target.value;
                      setFormData(prev => ({...prev, password}));
                      setPasswordStrength(calculatePasswordStrength(password));
                    }}
                    disabled={isLoading}
                    className={formErrors.password ? "border-red-500 pl-10" : "pl-10"}
                  />
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
                <div className="h-1 w-full bg-neutral-200 mt-2">
                  <div 
                    className={`h-1 ${
                      passwordStrength === 0 ? 'bg-red-500 w-0' :
                      passwordStrength === 1 ? 'bg-red-500 w-1/5' :
                      passwordStrength === 2 ? 'bg-orange-500 w-2/5' :
                      passwordStrength === 3 ? 'bg-yellow-500 w-3/5' :
                      passwordStrength === 4 ? 'bg-green-500 w-4/5' :
                      'bg-green-700 w-full'
                    } transition-all duration-300`}
                  ></div>
                </div>
                {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
              </div>

              {(authMode === 'signup' || authMode === 'reset') && (
                <div>
                  <label className="block text-sm text-neutral-600 mb-2">
                    {authMode === 'signup' ? 'Confirm Password' : 'New Password'}
                  </label>
                  <div className="relative">
                    <Input 
                      type="password"
                      placeholder="Confirm your password" 
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({...prev, confirmPassword: e.target.value}))}
                      disabled={isLoading}
                      className={formErrors.confirmPassword ? "border-red-500 pl-10" : "pl-10"}
                    />
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                  )}
                </div>
              )}

              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm text-neutral-600 mb-2">Phone Number</label>
                  <Input 
                    placeholder="Enter your phone number" 
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData(prev => ({...prev, phoneNumber: e.target.value}))}
                    disabled={isLoading}
                  />
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {authMode === 'signup' ? 'Creating Account...' : 
                     authMode === 'signin' ? 'Signing In...' : 
                     'Resetting Password...'}
                  </>
                ) : (
                  <>
                    {authMode === 'signup' ? 'Create Account' : 
                     authMode === 'signin' ? 'Sign In' : 
                     'Reset Password'}
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;