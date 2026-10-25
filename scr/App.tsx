import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Globe, 
  Video, 
  ShieldAlert, 
  Wifi, 
  Zap, 
  Activity, 
  AlertTriangle,
  RefreshCw,
  SignalHigh
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dash' | 'globe' | 'cams' | 'sentinel'>('dash');
  const [isOffline, setIsOffline] = useState(false);
  const [ping, setPing] = useState(24);

  // Simulate periodic ping telemetry update
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(20 + Math.random() * 8));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#080B10] text-[#F0F6FC] font-['Space_Grotesk'] flex flex-col pb-20">
      
      {/* 1. Offline Fallback Banner */}
      {isOffline && (
        <div className="bg-[#FFB800] text-[#080B10] px-4 py-1.5 text-xs font-['JetBrains_Mono'] font-bold text-center flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          OFFLINE FALLBACK ACTIVE — Using Cached SGP4 Local Propagator
        </div>
      )}

      {/* 2. Top Command Header */}
      <header className="border-b border-[#223147] bg-[#101722]/80 backdrop-blur px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-[#00F0FF] animate-pulse" />
          <span className="font-bold tracking-wider text-lg text-[#F0F6FC]">ORBIT<span className="text-[#00F0FF]">PULSE</span></span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsOffline(!isOffline)}
            className={`text-xs font-['JetBrains_Mono'] px-2 py-1 rounded border flex items-center gap-1 transition ${
              isOffline 
                ? 'border-[#FFB800] text-[#FFB800] bg-[#FFB800]/10' 
                : 'border-[#223147] text-[#8B949E] hover:text-[#F0F6FC]'
            }`}
          >
            <RefreshCw className="w-3 h-3" />
            {isOffline ? 'Simulate Online' : 'Simulate Drop'}
          </button>
          
          <div className="flex items-center gap-1.5 bg-[#080B10] px-2.5 py-1 rounded border border-[#223147] font-['JetBrains_Mono'] text-xs">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="text-[#00F0FF] font-bold">{ping}ms</span>
          </div>
        </div>
      </header>

      {/* 3. Dynamic Screen Router */}
      <main className="flex-1 p-4 max-w-lg mx-auto w-full space-y-4">
        
        {/* VIEW 1: DASHBOARD */}
        {activeTab === 'dash' && (
          <>
            {/* Terminal Card */}
            <div className="bg-[#101722] border border-[#223147] rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-xs text-[#8B949E] uppercase font-['JetBrains_Mono']">Terminal Uplink</div>
                  <div className="font-bold text-base text-[#F0F6FC]">Gaborone Gateway Array #01</div>
                </div>
                <span className="bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 text-[10px] font-['JetBrains_Mono'] px-2 py-0.5 rounded uppercase font-bold">
                  Connected
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-[#223147]">
                <div className="bg-[#080B10] p-2 rounded border border-[#223147]">
                  <div className="text-[10px] text-[#8B949E]">DOWN</div>
                  <div className="text-sm font-bold font-['JetBrains_Mono'] text-[#00F0FF]">184 <span className="text-[10px]">Mbps</span></div>
                </div>
                <div className="bg-[#080B10] p-2 rounded border border-[#223147]">
                  <div className="text-[10px] text-[#8B949E]">UP</div>
                  <div className="text-sm font-bold font-['JetBrains_Mono'] text-[#F0F6FC]">22 <span className="text-[10px]">Mbps</span></div>
                </div>
                <div className="bg-[#080B10] p-2 rounded border border-[#223147]">
                  <div className="text-[10px] text-[#8B949E]">LATENCY</div>
                  <div className="text-sm font-bold font-['JetBrains_Mono'] text-[#00F0FF]">{ping} <span className="text-[10px]">ms</span></div>
                </div>
              </div>
            </div>

            {/* Solar Radiation Index */}
            <div className="bg-[#101722] border border-[#223147] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-[#FFB800]" />
                <span className="font-bold text-sm">Geomagnetic Kp-Index</span>
              </div>
              <div className="w-full bg-[#080B10] h-3 rounded-full overflow-hidden p-0.5 border border-[#223147] mb-1">
                <div className="bg-gradient-to-r from-[#00F0FF] via-[#FFB800] to-[#FF3366] h-full w-[35%] rounded-full" />
              </div>
              <div className="flex justify-between text-[10px] font-['JetBrains_Mono'] text-[#8B949E]">
                <span>Kp 3.2 (Nominal)</span>
                <span>Max Solar Flare Impact: Low</span>
              </div>
            </div>

            {/* Overhead Passes Feed */}
            <div className="bg-[#101722] border border-[#223147] rounded-xl p-4 space-y-3">
              <div className="text-xs font-bold text-[#8B949E] uppercase tracking-wider font-['JetBrains_Mono']">
                Active Overhead Passes
              </div>

              {[
                { name: 'STARLINK-30219', signal: '98%', time: 'PASSING NOW', ok: true },
                { name: 'ONEWEB-0412', signal: '82%', time: 'IN 4M 12S', ok: true },
                { name: 'STARLINK-11021', signal: '--', time: 'IN 11M 05S', ok: false },
              ].map((sat, i) => (
                <div key={i} className="bg-[#080B10] border border-[#223147] p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SignalHigh className={`w-4 h-4 ${sat.ok ? 'text-[#00F0FF]' : 'text-[#8B949E]'}`} />
                    <div>
                      <div className="font-['JetBrains_Mono'] font-bold text-xs text-[#F0F6FC]">{sat.name}</div>
                      <div className="text-[10px] text-[#8B949E]">Signal Strength: {sat.signal}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-['JetBrains_Mono'] font-bold px-2 py-1 rounded ${
                    sat.ok ? 'bg-[#00F0FF]/10 text-[#00F0FF]' : 'bg-[#223147] text-[#8B949E]'
                  }`}>
                    {sat.time}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* VIEW 2: ORBITAL GLOBE */}
        {activeTab === 'globe' && (
          <div className="bg-[#101722] border border-[#223147] rounded-xl p-4 h-[420px] flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#223147_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
            
            <div className="relative z-10 space-y-3">
              <Globe className="w-20 h-20 text-[#00F0FF] animate-spin mx-auto opacity-80" style={{ animationDuration: '20s' }} />
              <div className="font-bold text-base">3D Orbital Mesh Matrix</div>
              <p className="text-xs text-[#8B949E] max-w-xs">
                Real-time WebGL global mesh tracker loaded. Active inter-satellite laser links established across 1,420 nodes.
              </p>
              <div className="inline-block bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 text-xs font-['JetBrains_Mono'] px-3 py-1 rounded-full">
                ISL Routing: Optimal
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: GROUND CAMS */}
        {activeTab === 'cams' && (
          <div className="space-y-3">
            {[
              { name: 'Cape Town Teleport #04', status: 'Clear Weather', ok: true },
              { name: 'Harare Hub #01', status: 'Rain Fade Warning', ok: false },
            ].map((cam, i) => (
              <div key={i} className="bg-[#101722] border border-[#223147] rounded-xl overflow-hidden">
                <div className="p-3 bg-[#182232] border-b border-[#223147] flex justify-between items-center">
                  <span className="font-bold text-xs">{cam.name}</span>
                  <span className={`text-[10px] font-['JetBrains_Mono'] px-2 py-0.5 rounded ${
                    cam.ok ? 'bg-[#00F0FF]/10 text-[#00F0FF]' : 'bg-[#FFB800]/10 text-[#FFB800]'
                  }`}>
                    {cam.status}
                  </span>
                </div>
                <div className="bg-[#080B10] h-40 flex items-center justify-center relative">
                  <Video className="w-8 h-8 text-[#223147]" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-['JetBrains_Mono'] bg-[#080B10]/80 px-2 py-0.5 rounded border border-[#223147] text-[#8B949E]">
                    LIVE TELEPORT STREAM
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 4: AI SENTINEL */}
        {activeTab === 'sentinel' && (
          <div className="bg-[#101722] border border-[#223147] rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 border-b border-[#223147] pb-3">
              <ShieldAlert className="w-5 h-5 text-[#00F0FF]" />
              <div>
                <div className="font-bold text-sm">AI Sentinel Diagnostic Log</div>
                <div className="text-[10px] text-[#8B949E]">Autonomous Predictive Rerouting Active</div>
              </div>
            </div>

            <div className="space-y-2 font-['JetBrains_Mono'] text-xs">
              <div className="bg-[#080B10] p-2.5 rounded border border-[#223147]">
                <div className="text-[#00F0FF]">[17:22:04 UTC] Handshake Verified</div>
                <div className="text-[#8B949E] text-[10px]">Starlink #30219 bound to Ground Dish #8812</div>
              </div>
              <div className="bg-[#080B10] p-2.5 rounded border border-[#223147]">
                <div className="text-[#FFB800]">[17:18:11 UTC] Atmospheric Jitter</div>
                <div className="text-[#8B949E] text-[10px]">Pre-emptively adjusted ISL path due to cloud deck</div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* 4. Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#101722] border-t border-[#223147] px-6 py-2 flex justify-around items-center z-50">
        <button 
          onClick={() => setActiveTab('dash')}
          className={`flex flex-col items-center gap-1 text-[10px] font-['JetBrains_Mono'] ${activeTab === 'dash' ? 'text-[#00F0FF]' : 'text-[#8B949E]'}`}
        >
          <Activity className="w-5 h-5" />
          Dash
        </button>
        <button 
          onClick={() => setActiveTab('globe')}
          className={`flex flex-col items-center gap-1 text-[10px] font-['JetBrains_Mono'] ${activeTab === 'globe' ? 'text-[#00F0FF]' : 'text-[#8B949E]'}`}
        >
          <Globe className="w-5 h-5" />
          Globe
        </button>
        <button 
          onClick={() => setActiveTab('cams')}
          className={`flex flex-col items-center gap-1 text-[10px] font-['JetBrains_Mono'] ${activeTab === 'cams' ? 'text-[#00F0FF]' : 'text-[#8B949E]'}`}
        >
          <Video className="w-5 h-5" />
          Ground
        </button>
        <button 
          onClick={() => setActiveTab('sentinel')}
          className={`flex flex-col items-center gap-1 text-[10px] font-['JetBrains_Mono'] ${activeTab === 'sentinel' ? 'text-[#00F0FF]' : 'text-[#8B949E]'}`}
        >
          <ShieldAlert className="w-5 h-5" />
          Sentinel
        </button>
      </nav>
    </div>
  );
      }
