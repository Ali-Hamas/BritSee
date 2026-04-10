import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { IntelligenceView } from './components/Intelligence/IntelligenceView';
import { LeadHunterView } from './components/Marketing/LeadHunterView';
import { SenderView } from './components/Marketing/SenderView';
import { Settings } from './components/Settings/Settings';
import { Onboarding } from './components/Profile/Onboarding';
import { ProfileService } from './lib/profiles';
import { Loader2 } from 'lucide-react';

const FinanceDashboard = lazy(() => import('./components/Finance/FinanceDashboard').then(m => ({ default: m.FinanceDashboard })));
const OperationsView = lazy(() => import('./components/Operations/OperationsView'));

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
          <div className="glass-card max-w-md">
            <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-slate-400 text-sm mb-4">The application encountered an unexpected error. This usually happens when local storage is corrupted or a service is unavailable.</p>
            <button onClick={() => window.location.reload()} className="bg-primary text-white px-6 py-2 rounded-xl font-bold">Reload Britsee</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [profile, setProfile] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const load = async () => {
      try {
        const data = await ProfileService.getProfile();
        setProfile(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return <Onboarding onComplete={(p) => setProfile(p)} />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <Layout profile={profile}>
          <Suspense fallback={
            <div className="h-full flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<IntelligenceView />} />
              <Route path="/leadhunter" element={<LeadHunterView profile={profile} />} />
              <Route path="/sender" element={<SenderView profile={profile} />} />
              <Route path="/finance" element={<FinanceDashboard profile={profile} />} />
              <Route path="/operations" element={<OperationsView profile={profile} />} />
              <Route path="/settings" element={<Settings profile={profile} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
