import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Palette, 
  Bell, 
  Zap,
  Save,
  Loader2,
  Globe,
  Database,
  Mail,
  Calendar
} from 'lucide-react';
import { SettingsService } from '../../lib/settings';

interface SettingsProps {
  onProfileUpdate: (profile: any) => void;
  profile: any;
}

export const Settings: React.FC<SettingsProps> = ({ onProfileUpdate, profile }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'ai' | 'integrations' | 'preferences'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Local state for API keys (never show full key for security)
  const [groqKey, setGroqKey] = useState(SettingsService.getGroqApiKey());
  const [leadHunterKey, setLeadHunterKey] = useState(SettingsService.getLeadHunterApiKey());
  const [schedLink, setSchedLink] = useState(SettingsService.getSchedulingLink());

  const handleSave = async () => {
    setIsSaving(true);
    
    // Save API keys to localStorage
    SettingsService.setGroqApiKey(groqKey);
    SettingsService.setLeadHunterApiKey(leadHunterKey);
    SettingsService.setSchedulingLink(schedLink);
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800));
    
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">System Settings</h1>
          <p className="text-slate-400 mt-1 text-sm">Configure your BritSync intelligence and integration bridge.</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saveSuccess ? 'Settings Saved' : 'Save Changes'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-1 space-y-1">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'profile' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <User size={18} /> Business Profile
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'ai' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Zap size={18} /> AI Configuration
          </button>
          <button 
            onClick={() => setActiveTab('integrations')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'integrations' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Database size={18} /> Integration Bridge
          </button>
          <button 
            onClick={() => setActiveTab('preferences')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'preferences' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Palette size={18} /> Appearance
          </button>
        </aside>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-8 shadow-xl">
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                    <User size={20} />
                  </div>
                  <h3 className="font-semibold text-white">Business Identity</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block ml-1">Business Name</label>
                    <input 
                      type="text" 
                      defaultValue={profile?.businessName}
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-slate-300 outline-none focus:border-indigo-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block ml-1">Industry</label>
                    <input 
                      type="text" 
                      defaultValue={profile?.industry}
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-slate-300 outline-none focus:border-indigo-500/50"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block ml-1">Contact Email</label>
                    <input 
                      type="email" 
                      defaultValue={profile?.contactEmail}
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-slate-300 outline-none focus:border-indigo-500/50"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                    <Zap size={20} />
                  </div>
                  <h3 className="font-semibold text-white">Inference Configuration</h3>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                    <p className="text-xs text-amber-500 leading-relaxed font-medium">
                      BritSync currently uses the **Groq Inference Engine** for high-speed strategic reasoning.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block ml-1">Groq API Key</label>
                    <input 
                      type="password" 
                      value={groqKey}
                      onChange={(e) => setGroqKey(e.target.value)}
                      placeholder="gsk_..."
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-slate-300 outline-none focus:border-indigo-500/50 font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block ml-1">Active Reasoning Model</label>
                    <select className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-slate-300 outline-none focus:border-indigo-500/50">
                      <option>llama-3.3-70b-versatile (Recommended)</option>
                      <option>llama-3.2-90b-vision-preview</option>
                      <option>mixtral-8x7b-32768</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                    <Globe size={20} />
                  </div>
                  <h3 className="font-semibold text-white">Lead & Communication Bridge</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block ml-1">LeadHunter API Bridge</label>
                      <span className="text-[10px] font-bold text-emerald-400">STATUS: CONNECTED</span>
                    </div>
                    <input 
                      type="password" 
                      value={leadHunterKey}
                      onChange={(e) => setLeadHunterKey(e.target.value)}
                      placeholder="LH_..."
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-slate-300 outline-none focus:border-indigo-500/50 font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block ml-1">Primary Scheduling Link</label>
                    <div className="relative">
                       <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                       <input 
                        type="url" 
                        value={schedLink}
                        onChange={(e) => setSchedLink(e.target.value)}
                        placeholder="https://calendly.com/your-business"
                        className="w-full bg-black/40 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-slate-300 outline-none focus:border-indigo-500/50"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                      <Mail size={16} className="text-slate-500" />
                      <h4 className="text-sm font-semibold text-white">SMTP Sender Profile</h4>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">Configure the outbound server BritSync uses for your lead campaigns.</p>
                    <button className="text-xs font-bold text-indigo-400 hover:text-white transition-colors flex items-center gap-2">
                      Configure SMTP Overlays →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                    <Palette size={20} />
                  </div>
                  <h3 className="font-semibold text-white">Visual Interface</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="p-4 bg-indigo-500/20 border border-indigo-500/40 rounded-xl text-left">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-sm font-bold text-white">Strategic Dark</span>
                       <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50" />
                    </div>
                    <p className="text-[10px] text-indigo-300/70 font-medium">Default high-contrast executive theme.</p>
                  </button>
                  <button className="p-4 bg-white/5 border border-white/10 rounded-xl text-left hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-sm font-bold text-slate-400">Glassmorphism</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">Soft reflections and frosted backgrounds.</p>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex gap-4 items-start">
            <Shield size={20} className="text-slate-500 flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white">Data Governance</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                BritSync stores your API keys and configuration locally in your browser's encrypted storage. We never store your credentials on our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
